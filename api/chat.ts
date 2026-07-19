import { checkRateLimit } from './lib/rate-limit';
import { SYSTEM_PROMPT } from './lib/system-prompt';
import {
  getSessionId,
  loadSession,
  newSessionId,
  releaseGlobalMessage,
  releaseSessionMessage,
  reserveGlobalMessage,
  reserveSessionMessage,
  saveSession,
  sessionCookieHeader,
  type StoredMessage,
} from './lib/session';

export const config = { runtime: 'edge' };

// Tune these values to adjust cost and abuse resistance.
// MAX_MESSAGES_PER_HOUR must match the value in api/lib/rate-limit.ts.
const MAX_MESSAGES_PER_HOUR = 20;
const SESSION_MESSAGE_CAP = 30;
const MAX_OUTPUT_TOKENS = 400;
const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 500;
// Global circuit breaker across all visitors, sized well under the
// Anthropic Workspace's monthly spend cap (see .env.example) so the widget
// degrades gracefully instead of the workspace hard-cutting the key.
// Re-tune if the Workspace spend cap changes — see decisions.md.
const GLOBAL_DAILY_MESSAGE_CAP = 500;
// Defense-in-depth beyond the platform's own body-size limit — a real
// request body here is a few hundred bytes at most.
const MAX_REQUEST_BYTES = 8 * 1024;

// TEMPORARY (added 2026-07-19, see decisions.md): the .vercel.app entry is
// pre-launch-only, for testing the deployed site before viewbens.work is cut
// over to this project. Remove it once the domain cutover happens.
const ALLOWED_ORIGINS = [
  'https://viewbens.work',
  'https://bmax-portfolio.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
];

// The only values the client-supplied `pageContext` field may take — must
// match the `company` field in each src/content/*.ts file. Anything else is
// silently ignored rather than rejecting the request, since this only
// affects answer quality, not security. Deliberately not string-interpolated
// from arbitrary client input into the system prompt — see the allowlist
// check below.
const ALLOWED_PAGE_CONTEXTS = new Set(['Portfolio Rebuild', 'Upfluent', 'Sagent', 'USAA', 'Sabre']);

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// Structured, single-line JSON logs — Vercel captures stdout as Function
// Logs, so this needs no new logging vendor. Metadata only by default
// (lengths, outcomes, reason codes), never full visitor message content.
function logEvent(event: Record<string, unknown>): void {
  console.log(JSON.stringify({ ts: new Date().toISOString(), ...event }));
}

function jsonResponse(status: number, body: Record<string, unknown>, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
}

// Used whenever a Redis-backed check (rate limit or either cap reservation)
// throws. Fails closed: chat goes down for the outage's duration rather
// than letting rate limiting or the spend breaker run unenforced.
function unavailableResponse(cors: Record<string, string>): Response {
  return jsonResponse(503, { error: 'Chat is temporarily unavailable — please try again shortly.' }, cors);
}

export default async function handler(req: Request): Promise<Response> {
  const origin = req.headers.get('origin');
  const cors = corsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: cors });
  }

  // Reject cross-origin browser requests outright. This doesn't stop
  // non-browser callers (curl, scripts) — they don't send a trustworthy
  // Origin header — but it does stop other sites' pages from riding a
  // visitor's browser to call this endpoint.
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    logEvent({ event: 'blocked', reason: 'origin', origin });
    return jsonResponse(403, { error: 'Origin not allowed.' }, cors);
  }

  const contentLength = req.headers.get('content-length');
  if (contentLength && Number(contentLength) > MAX_REQUEST_BYTES) {
    logEvent({ event: 'blocked', reason: 'payload-too-large' });
    return jsonResponse(413, { error: 'Request too large.' }, cors);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    logEvent({ event: 'error', reason: 'no-api-key' });
    return jsonResponse(503, { error: 'Service unavailable.' }, cors);
  }

  // IP identity for rate limiting — x-real-ip is Vercel's single-value
  // client IP, set at the edge and not client-controllable. Deliberately no
  // fallback to x-forwarded-for: that header can be freely prefixed by the
  // caller, which would let a client pick its own rate-limit bucket.
  const ip = req.headers.get('x-real-ip');
  if (!ip) {
    logEvent({ event: 'blocked', reason: 'no-ip' });
    return jsonResponse(400, { error: 'Unable to identify request.' }, cors);
  }

  let rateLimitOk: boolean;
  try {
    ({ success: rateLimitOk } = await checkRateLimit(ip));
  } catch {
    logEvent({ event: 'error', reason: 'redis-unavailable', stage: 'rate-limit' });
    return unavailableResponse(cors);
  }
  if (!rateLimitOk) {
    logEvent({ event: 'blocked', reason: 'rate-limit', ip });
    return jsonResponse(429, { error: `Rate limit reached. Maximum ${MAX_MESSAGES_PER_HOUR} messages per hour.` }, cors);
  }

  let body: { message?: unknown; pageContext?: unknown };
  try {
    body = await req.json();
  } catch {
    logEvent({ event: 'blocked', reason: 'invalid-json', ip });
    return jsonResponse(400, { error: 'Invalid JSON.' }, cors);
  }

  const rawMessage = body.message;
  if (typeof rawMessage !== 'string' || rawMessage.trim() === '') {
    logEvent({ event: 'blocked', reason: 'invalid-message', ip });
    return jsonResponse(400, { error: 'message must be a non-empty string.' }, cors);
  }
  const userMessage: StoredMessage = { role: 'user', content: rawMessage.slice(0, MAX_MESSAGE_LENGTH) };

  // Which case study page the visitor is currently on, if any — allowlisted
  // rather than trusted as free text, since it's client-supplied and gets
  // folded into the system prompt below. Invalid/tampered values are
  // silently dropped, not rejected: this only affects answer quality.
  const pageContext =
    typeof body.pageContext === 'string' && ALLOWED_PAGE_CONTEXTS.has(body.pageContext)
      ? body.pageContext
      : null;

  // Session identity — server-side authority for history and the message
  // cap. The client never supplies conversation history or a message count;
  // both are read from Redis, keyed by this cookie. See api/lib/session.ts.
  let sid = getSessionId(req);
  const isNewSession = !sid;
  if (!sid) sid = newSessionId();

  // Both caps are reserved atomically (Redis INCR) before the model is ever
  // called, and released (DECR'd) on any path that doesn't end in a real
  // reply. This closes a check-then-act race: a plain GET-then-later-write
  // would let concurrent requests near a cap all pass the check before any
  // of them recorded usage. A Redis error here propagates and fails closed
  // (unavailableResponse) rather than silently letting a cap go unenforced.
  let sessionCount: number;
  try {
    sessionCount = await reserveSessionMessage(sid);
  } catch {
    logEvent({ event: 'error', reason: 'redis-unavailable', stage: 'session-reserve' });
    return unavailableResponse(cors);
  }
  if (sessionCount > SESSION_MESSAGE_CAP) {
    await releaseSessionMessage(sid);
    logEvent({ event: 'blocked', reason: 'session-cap', ip });
    return jsonResponse(
      429,
      { error: `Session limit reached (${SESSION_MESSAGE_CAP} messages). Refresh the page to start a new session.` },
      cors,
    );
  }

  let globalCount: number;
  try {
    globalCount = await reserveGlobalMessage();
  } catch {
    await releaseSessionMessage(sid);
    logEvent({ event: 'error', reason: 'redis-unavailable', stage: 'global-reserve' });
    return unavailableResponse(cors);
  }
  if (globalCount > GLOBAL_DAILY_MESSAGE_CAP) {
    await releaseSessionMessage(sid);
    await releaseGlobalMessage();
    logEvent({ event: 'blocked', reason: 'global-budget', globalUsage: globalCount });
    return jsonResponse(503, { error: 'Chat is temporarily at capacity — please check back later.' }, cors);
  }

  // History load is best-effort/fail-open (see session.ts) — it only
  // affects answer context, not either cap, both of which are already
  // reserved above.
  const session = await loadSession(sid);

  // Trim history to keep context window costs predictable
  const trimmed = [...session.history, userMessage].slice(-MAX_HISTORY_MESSAGES);

  // Ephemeral, per-call addendum — never written to session history, so it
  // can't accumulate or drift from whatever page the visitor is on right now.
  const systemPrompt = pageContext
    ? `${SYSTEM_PROMPT}\n\n---\n\nCURRENT PAGE CONTEXT\n\nThe visitor is currently viewing the ${pageContext} case study page. If their question is ambiguous or refers to "this," "this project," or similar without naming a case study, assume they mean ${pageContext} unless they clearly indicate otherwise.`
    : SYSTEM_PROMPT;

  const requestStart = Date.now();

  // Call Anthropic API directly — the SDK uses node:fs/node:path which the
  // Edge runtime doesn't support. fetch is available everywhere.
  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: MAX_OUTPUT_TOKENS,
      system: systemPrompt,
      messages: trimmed,
      stream: true,
    }),
  });

  if (!anthropicRes.ok || !anthropicRes.body) {
    // The reservations above were for a message that never got a real
    // reply — release both so a failed attempt doesn't count against
    // either cap.
    await releaseSessionMessage(sid);
    await releaseGlobalMessage();
    logEvent({ event: 'error', reason: 'upstream', status: anthropicRes.status });
    return jsonResponse(502, { error: 'Upstream error.' }, cors);
  }

  // Parse Anthropic's SSE stream, forward text delta chunks to the client,
  // and accumulate the full reply so it can be persisted as session history
  // once the stream completes.
  const sidForClosure = sid;
  const readable = new ReadableStream({
    async start(controller) {
      const reader = anthropicRes.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = '';
      let fullText = '';
      let stopReason: string | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;

          try {
            const event = JSON.parse(data) as {
              type: string;
              delta?: { type: string; text?: string; stop_reason?: string };
            };
            if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
              const text = event.delta.text ?? '';
              fullText += text;
              controller.enqueue(encoder.encode(text));
            } else if (event.type === 'message_delta' && event.delta?.stop_reason) {
              stopReason = event.delta.stop_reason;
            }
          } catch {
            // ignore malformed SSE lines
          }
        }
      }

      controller.close();

      const assistantMessage: StoredMessage = { role: 'assistant', content: fullText };
      const newHistory: StoredMessage[] = [...session.history, userMessage, assistantMessage].slice(
        -MAX_HISTORY_MESSAGES,
      );
      await saveSession(sidForClosure, { history: newHistory });

      logEvent({
        event: 'reply',
        ip,
        latencyMs: Date.now() - requestStart,
        outputLength: fullText.length,
        stopReason,
        pageContext,
      });
    },
  });

  const responseHeaders: Record<string, string> = {
    ...cors,
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-cache',
    'X-Accel-Buffering': 'no',
  };
  if (isNewSession) {
    responseHeaders['Set-Cookie'] = sessionCookieHeader(sid);
  }

  return new Response(readable, { headers: responseHeaders });
}
