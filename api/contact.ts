import { corsHeaders, isOriginAllowed } from './lib/cors';
import {
  checkContactRateLimit,
  releaseGlobalContactMessage,
  reserveGlobalContactMessage,
} from './lib/contact-limit';

export const config = { runtime: 'edge' };

// Tune these values to adjust cost and abuse resistance.
// MAX_CONTACT_PER_HOUR must match the value in api/lib/contact-limit.ts.
const MAX_CONTACT_PER_HOUR = 3;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 2000;
// Anti-bot: the form is never submittable faster than a human could
// plausibly read and fill it. Scripted/replayed submissions routinely land
// well under this. Paired with the honeypot field below rather than relied
// on alone.
const MIN_FILL_MS = 1500;
// Circuit breaker independent of the per-IP limits — sized to what Ben's
// inbox and Resend's sending volume can reasonably absorb in a day.
const GLOBAL_DAILY_CONTACT_CAP = 25;
// A real request body here is name + email + a short message — well under 4KB.
const MAX_REQUEST_BYTES = 4 * 1024;

const CONTACT_TO_ADDRESS = 'ben@viewbens.work';
// Requires the viewbens.work domain to be verified in the Resend account —
// see .env.example. Until then Resend will reject sends from this address.
const CONTACT_FROM_ADDRESS = 'Portfolio Contact <contact@viewbens.work>';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function logEvent(event: Record<string, unknown>): void {
  console.log(JSON.stringify({ ts: new Date().toISOString(), ...event }));
}

function jsonResponse(status: number, body: Record<string, unknown>, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
}

// Used whenever a Redis-backed check (rate limit or the global reservation)
// throws. Fails closed: the endpoint goes down for the outage's duration
// rather than letting rate limiting or the daily cap run unenforced.
function unavailableResponse(cors: Record<string, string>): Response {
  return jsonResponse(503, { error: 'Contact form is temporarily unavailable — please try again shortly, or email ben@viewbens.work directly.' }, cors);
}

// Bot trap responses (honeypot filled, or submitted faster than
// MIN_FILL_MS) return the same success shape a real send would — never
// signal to an automated caller which check it tripped.
function fakeSuccessResponse(cors: Record<string, string>): Response {
  return jsonResponse(200, { ok: true }, cors);
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

  if (!isOriginAllowed(origin)) {
    logEvent({ event: 'blocked', endpoint: 'contact', reason: 'origin', origin });
    return jsonResponse(403, { error: 'Origin not allowed.' }, cors);
  }

  const contentLength = req.headers.get('content-length');
  if (contentLength && Number(contentLength) > MAX_REQUEST_BYTES) {
    logEvent({ event: 'blocked', endpoint: 'contact', reason: 'payload-too-large' });
    return jsonResponse(413, { error: 'Request too large.' }, cors);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    logEvent({ event: 'error', endpoint: 'contact', reason: 'no-api-key' });
    return jsonResponse(503, { error: 'Contact form is temporarily unavailable — please email ben@viewbens.work directly.' }, cors);
  }

  // Same rationale as api/chat.ts: x-real-ip is Vercel's single-value client
  // IP, set at the edge and not client-controllable. No fallback to
  // x-forwarded-for, which a caller could freely prefix to pick its own
  // rate-limit bucket.
  const ip = req.headers.get('x-real-ip');
  if (!ip) {
    logEvent({ event: 'blocked', endpoint: 'contact', reason: 'no-ip' });
    return jsonResponse(400, { error: 'Unable to identify request.' }, cors);
  }

  let rateLimitOk: boolean;
  try {
    ({ success: rateLimitOk } = await checkContactRateLimit(ip));
  } catch {
    logEvent({ event: 'error', endpoint: 'contact', reason: 'redis-unavailable', stage: 'rate-limit' });
    return unavailableResponse(cors);
  }
  if (!rateLimitOk) {
    logEvent({ event: 'blocked', endpoint: 'contact', reason: 'rate-limit', ip });
    return jsonResponse(
      429,
      { error: `Too many messages sent. Maximum ${MAX_CONTACT_PER_HOUR} per hour — try emailing ben@viewbens.work directly.` },
      cors,
    );
  }

  let body: { name?: unknown; email?: unknown; message?: unknown; website?: unknown; elapsedMs?: unknown };
  try {
    body = await req.json();
  } catch {
    logEvent({ event: 'blocked', endpoint: 'contact', reason: 'invalid-json', ip });
    return jsonResponse(400, { error: 'Invalid JSON.' }, cors);
  }

  // Honeypot: a hidden field real visitors never see or fill. Any non-empty
  // value means a bot filled every field on the form, including ones no
  // human would encounter.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    logEvent({ event: 'blocked', endpoint: 'contact', reason: 'honeypot', ip });
    return fakeSuccessResponse(cors);
  }

  if (typeof body.elapsedMs !== 'number' || !Number.isFinite(body.elapsedMs)) {
    logEvent({ event: 'blocked', endpoint: 'contact', reason: 'invalid-elapsed', ip });
    return jsonResponse(400, { error: 'Invalid request.' }, cors);
  }
  if (body.elapsedMs < MIN_FILL_MS) {
    logEvent({ event: 'blocked', endpoint: 'contact', reason: 'too-fast', ip, elapsedMs: body.elapsedMs });
    return fakeSuccessResponse(cors);
  }

  const rawEmail = typeof body.email === 'string' ? body.email.trim() : '';
  if (!rawEmail || rawEmail.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(rawEmail)) {
    logEvent({ event: 'blocked', endpoint: 'contact', reason: 'invalid-email', ip });
    return jsonResponse(400, { error: 'Enter a valid email address.' }, cors);
  }

  const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';
  if (rawMessage.length < MIN_MESSAGE_LENGTH || rawMessage.length > MAX_MESSAGE_LENGTH) {
    logEvent({ event: 'blocked', endpoint: 'contact', reason: 'invalid-message', ip });
    return jsonResponse(
      400,
      { error: `Message should be between ${MIN_MESSAGE_LENGTH} and ${MAX_MESSAGE_LENGTH} characters.` },
      cors,
    );
  }

  const rawName = typeof body.name === 'string' ? body.name.trim().slice(0, MAX_NAME_LENGTH) : '';

  // Reserved atomically, after all the checks above that can reject without
  // sending — a fake-success (honeypot/too-fast) response never consumes
  // real send budget. A Redis error here propagates and fails closed
  // (unavailableResponse) rather than silently letting the cap go
  // unenforced. See api/lib/contact-limit.ts.
  let globalCount: number;
  try {
    globalCount = await reserveGlobalContactMessage();
  } catch {
    logEvent({ event: 'error', endpoint: 'contact', reason: 'redis-unavailable', stage: 'global-reserve' });
    return unavailableResponse(cors);
  }
  if (globalCount > GLOBAL_DAILY_CONTACT_CAP) {
    await releaseGlobalContactMessage();
    logEvent({ event: 'blocked', endpoint: 'contact', reason: 'global-budget', globalUsage: globalCount });
    return jsonResponse(
      503,
      { error: 'The contact form is at capacity for today — please email ben@viewbens.work directly.' },
      cors,
    );
  }

  const senderLabel = rawName ? `${rawName} <${rawEmail}>` : rawEmail;

  let resendRes: Response;
  try {
    resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: CONTACT_FROM_ADDRESS,
        to: CONTACT_TO_ADDRESS,
        reply_to: rawEmail,
        subject: `Portfolio message from ${rawName || 'a visitor'}`,
        text: `From: ${senderLabel}\n\n${rawMessage}`,
      }),
    });
  } catch {
    await releaseGlobalContactMessage();
    logEvent({ event: 'error', endpoint: 'contact', reason: 'upstream-network' });
    return jsonResponse(502, { error: 'Could not send your message — please try again or email ben@viewbens.work directly.' }, cors);
  }

  if (!resendRes.ok) {
    await releaseGlobalContactMessage();
    logEvent({ event: 'error', endpoint: 'contact', reason: 'upstream', status: resendRes.status });
    return jsonResponse(502, { error: 'Could not send your message — please try again or email ben@viewbens.work directly.' }, cors);
  }

  logEvent({ event: 'sent', endpoint: 'contact', ip });
  return jsonResponse(200, { ok: true }, cors);
}
