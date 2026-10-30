import { corsHeaders, isOriginAllowed } from './lib/cors';
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
// 260, up from 220 (2026-10-29): replies may end with up to two [[show:<id>]]
// widget tags (~10 tokens each), and the tags shouldn't eat into the prose.
const MAX_OUTPUT_TOKENS = 260;
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

// What the client-supplied `pageContext` may be, and the sentence each one adds
// to the system prompt. Anything not in this map is silently ignored rather
// than rejecting the request, since this only affects answer quality, not
// security. The client's string is only ever used as a lookup key — never
// interpolated into the prompt.
//
// Chat-first experiment (2026-10-29): the keys are topic ids from
// src/chat/topics.ts. The client sends the id of the pre-built walkthrough it
// just played, because the model never saw that walkthrough — it ran entirely
// in the browser. Topics with no useful subject (menu, contact, resume) are
// left out on purpose.
const TOPIC_CONTEXT: Record<string, string> = {
  sabre: 'the Sabre case study walkthrough',
  usaa: 'the USAA case study walkthrough',
  upfluent: 'the Upfluent case study walkthrough',
  sagent: 'the Sagent case study walkthrough',
  'sabre-full': 'the full Sabre case study',
  'usaa-full': 'the full USAA case study',
  'upfluent-full': 'the full Upfluent case study',
  'sagent-full': 'the full Sagent case study',
  ai: "the walkthrough on how AI fits Ben's design process (the Upfluent AI advisor and the Portfolio Rebuild)",
  'ai-limits': 'where Ben overruled the AI during the Portfolio Rebuild',
  experts: 'the walkthrough on how Ben designs for expert users (Sabre and Upfluent)',
  'best-work': "the summary of Ben's best design work across all four case studies",
  leadership: 'the walkthrough on how Ben leads design teams (Sagent and USAA)',
  research: "the walkthrough on Ben's research methods (Sabre, USAA, Upfluent)",
  overview: 'the 60-second overview of Ben',
  'why-ben': 'the summary of why Ben fits a design leadership role',
  'design-system': "the walkthrough on this site's design system",
  career: "Ben's career timeline",
  'looking-for': 'what Ben is looking for next',
  'side-projects': "Ben's side projects (the joint bills planner, Sailing Sim, Sailing Study)",
};

// Structured, single-line JSON logs — Vercel captures stdout as Function
// Logs, so this needs no new logging vendor. Metadata only by default
// (lengths, outcomes, reason codes), never full visitor message content.
// Never put message text (visitor or assistant) in these logs: the assistant tells
// visitors the site doesn't log chat content (PRIVACY in api/lib/system-prompt.ts),
// and Ben has decided not to keep transcripts (decisions.md 2026-10-27).
function logEvent(event: Record<string, unknown>): void {
  console.log(JSON.stringify({ ts: new Date().toISOString(), ...event }));
}

function jsonResponse(
  status: number,
  body: Record<string, unknown>,
  cors: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

// Used whenever a Redis-backed check (rate limit or either cap reservation)
// throws. Fails closed: chat goes down for the outage's duration rather
// than letting rate limiting or the spend breaker run unenforced.
function unavailableResponse(cors: Record<string, string>): Response {
  return jsonResponse(
    503,
    { error: 'Chat is temporarily unavailable — please try again shortly.' },
    cors,
  );
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
  if (!isOriginAllowed(origin)) {
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
    return jsonResponse(
      429,
      { error: `Rate limit reached. Maximum ${MAX_MESSAGES_PER_HOUR} messages per hour.` },
      cors,
    );
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
  const userMessage: StoredMessage = {
    role: 'user',
    content: rawMessage.slice(0, MAX_MESSAGE_LENGTH),
  };

  // Which walkthrough the visitor just saw, if any — allowlisted rather than
  // trusted as free text, since it's client-supplied and selects text folded
  // into the system prompt below. Invalid/tampered values are silently
  // dropped, not rejected: this only affects answer quality. Object.hasOwn so
  // a key like "constructor" can't match an inherited property.
  const pageContext =
    typeof body.pageContext === 'string' && Object.hasOwn(TOPIC_CONTEXT, body.pageContext)
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
      {
        error: `Session limit reached (${SESSION_MESSAGE_CAP} messages). Refresh the page to start a new session.`,
      },
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
    return jsonResponse(
      503,
      { error: 'Chat is temporarily at capacity — please check back later.' },
      cors,
    );
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
    ? `${SYSTEM_PROMPT}\n\n---\n\nCURRENT CONTEXT\n\nThe visitor was just shown ${TOPIC_CONTEXT[pageContext]}, as a pre-built walkthrough in this chat. You did not write it, but it used only facts from this brief. If their question is ambiguous or refers to "this," "that," or "this project" without naming one, assume they mean that topic unless they clearly indicate otherwise. Don't repeat the walkthrough back to them; add to it.`
    : SYSTEM_PROMPT;

  const requestStart = Date.now();

  // Call Anthropic API directly — the SDK uses node:fs/node:path which the
  // Edge runtime doesn't support. fetch is available everywhere.
  // A network-level failure (DNS, reset, timeout) throws rather than returning
  // a non-ok response. Caught so it takes the same release-and-502 path below
  // instead of an unhandled 500 that leaks both reservations.
  let anthropicRes: Response | null;
  try {
    anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
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
  } catch {
    anthropicRes = null;
  }

  if (!anthropicRes || !anthropicRes.ok || !anthropicRes.body) {
    // The reservations above were for a message that never got a real
    // reply — release both so a failed attempt doesn't count against
    // either cap.
    await releaseSessionMessage(sid);
    await releaseGlobalMessage();
    logEvent({ event: 'error', reason: 'upstream', status: anthropicRes?.status ?? 'network' });
    return jsonResponse(502, { error: 'Upstream error.' }, cors);
  }

  // Parse Anthropic's SSE stream, forward text delta chunks to the client,
  // and accumulate the full reply so it can be persisted as session history
  // once the stream completes.
  const sidForClosure = sid;
  const upstreamBody = anthropicRes.body;
  const readable = new ReadableStream({
    async start(controller) {
      const reader = upstreamBody.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = '';
      let fullText = '';
      let stopReason: string | null = null;
      // Set by an SSE `error` event (e.g. overloaded_error mid-stream) or a
      // dropped connection. Both used to be ignored, which ended the response
      // with a 200 and whatever text had arrived — often none.
      let streamError: string | null = null;

      try {
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
                error?: { type?: string };
              };
              if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
                const text = event.delta.text ?? '';
                fullText += text;
                controller.enqueue(encoder.encode(text));
              } else if (event.type === 'message_delta' && event.delta?.stop_reason) {
                stopReason = event.delta.stop_reason;
              } else if (event.type === 'error') {
                streamError = event.error?.type ?? 'unknown';
              }
            } catch {
              // ignore malformed SSE lines
            }
          }
          if (streamError) break;
        }
      } catch {
        streamError = 'stream-read';
      }

      controller.close();

      // Nothing reached the visitor: treat it like the non-ok path above.
      // Release both reservations, and don't save the turn. An empty assistant
      // message in history makes the Messages API reject every later request
      // in this session, which broke chat for that visitor until the 2-hour
      // session TTL ran out (found in the 2026-10-30 audit). The client shows
      // its fallback error when the body is empty (useChatSession.ts).
      if (fullText.trim() === '') {
        await releaseSessionMessage(sidForClosure);
        await releaseGlobalMessage();
        logEvent({ event: 'error', reason: 'empty-reply', streamError, stopReason });
        return;
      }

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
        streamError,
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
