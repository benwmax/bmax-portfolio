import { checkRateLimit } from './lib/rate-limit';
import { SYSTEM_PROMPT } from './lib/system-prompt';

export const config = { runtime: 'edge' };

// Tune these values to adjust cost and abuse resistance.
// MAX_MESSAGES_PER_HOUR must match the value in api/lib/rate-limit.ts.
const MAX_MESSAGES_PER_HOUR = 20;
const SESSION_MESSAGE_CAP = 30;
const MAX_OUTPUT_TOKENS = 400;
const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 500;

const ALLOWED_ORIGINS = ['https://viewbens.work', 'http://localhost:5173', 'http://localhost:4173'];

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

type MessageParam = { role: 'user' | 'assistant'; content: string };

export default async function handler(req: Request): Promise<Response> {
  const origin = req.headers.get('origin');
  const cors = corsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: cors });
  }

  // Rate limiting — IP from Vercel's forwarded header
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const { success } = await checkRateLimit(ip);
  if (!success) {
    return new Response(
      JSON.stringify({
        error: `Rate limit reached. Maximum ${MAX_MESSAGES_PER_HOUR} messages per hour.`,
      }),
      { status: 429, headers: { ...cors, 'Content-Type': 'application/json' } },
    );
  }

  let body: { messages?: unknown; sessionMessageCount?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON.' }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const { messages, sessionMessageCount } = body;

  // Session cap — the client tracks how many messages have been sent
  if (typeof sessionMessageCount === 'number' && sessionMessageCount >= SESSION_MESSAGE_CAP) {
    return new Response(
      JSON.stringify({
        error: `Session limit reached (${SESSION_MESSAGE_CAP} messages). Refresh the page to start a new session.`,
      }),
      { status: 429, headers: { ...cors, 'Content-Type': 'application/json' } },
    );
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages must be a non-empty array.' }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  // Validate shape and enforce per-message length cap
  const validRoles = new Set(['user', 'assistant']);
  const sanitized: MessageParam[] = [];

  for (const msg of messages) {
    if (
      typeof msg !== 'object' ||
      msg === null ||
      !validRoles.has((msg as Record<string, unknown>).role as string) ||
      typeof (msg as Record<string, unknown>).content !== 'string'
    ) {
      return new Response(JSON.stringify({ error: 'Invalid message format.' }), {
        status: 400,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }
    const content = ((msg as Record<string, unknown>).content as string).slice(0, MAX_MESSAGE_LENGTH);
    sanitized.push({
      role: (msg as Record<string, unknown>).role as 'user' | 'assistant',
      content,
    });
  }

  // Trim history to keep context window costs predictable
  const trimmed = sanitized.slice(-MAX_HISTORY_MESSAGES);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Service unavailable.' }), {
      status: 503,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

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
      system: SYSTEM_PROMPT,
      messages: trimmed,
      stream: true,
    }),
  });

  if (!anthropicRes.ok || !anthropicRes.body) {
    return new Response(JSON.stringify({ error: 'Upstream error.' }), {
      status: 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  // Parse Anthropic's SSE stream and forward only the text delta chunks
  const readable = new ReadableStream({
    async start(controller) {
      const reader = anthropicRes.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = '';

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
              delta?: { type: string; text: string };
            };
            if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          } catch {
            // ignore malformed SSE lines
          }
        }
      }

      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      ...cors,
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  });
}
