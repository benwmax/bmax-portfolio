// session.ts — server-side authority for chat conversation state.
//
// The client only ever sends the newest user message. History and both
// message-count caps (per-session and global-daily) live here, in Redis —
// never trusted from client-supplied request bodies. This is what stops a
// modified client from injecting fabricated prior "assistant" turns (a
// classic fake-prior-compliance jailbreak) or spoofing either cap.
//
// The two caps are enforced via atomic Redis INCR "reservations" taken
// before the Anthropic call and released (DECR'd) if the request doesn't
// go on to consume a real reply. This closes a check-then-act race where
// concurrent requests near a cap could otherwise all pass a plain GET
// check before any of them recorded usage. See api/chat.ts for the
// reserve/release call sites and the fail-closed handling of reservation
// errors (a Redis outage must not silently disable cost control).

import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// __Host- prefix: the browser only accepts this cookie if it's Secure, Path=/, and has
// no Domain, so a page on another *.viewbens.work subdomain (Storybook) can't plant a
// session id here. Renamed from `bmax_chat_sid` 2026-10-30; an old cookie is ignored
// and the visitor simply starts a fresh session.
const SESSION_COOKIE = '__Host-bmax_chat_sid';
// Ids are crypto.randomUUID() (newSessionId below). Anything else is ignored rather
// than used as a Redis key: a crafted id like `count:<sid>` read the counter key as
// a session record and crashed the request (2026-10-30 audit).
const SESSION_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
// The assistant tells visitors their conversation is deleted within two hours of their
// last message (PRIVACY in api/lib/system-prompt.ts). Change both together.
const SESSION_TTL_SECONDS = 60 * 60 * 2; // 2 hours — generous for a single visit
const GLOBAL_BUDGET_TTL_SECONDS = 60 * 60 * 26; // outlives a day so today's key always expires

export interface StoredMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface SessionRecord {
  history: StoredMessage[];
}

const EMPTY_SESSION: SessionRecord = { history: [] };

export function getSessionId(req: Request): string | null {
  const cookie = req.headers.get('cookie');
  if (!cookie) return null;
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  return match && SESSION_ID_PATTERN.test(match[1]) ? match[1] : null;
}

export function newSessionId(): string {
  return crypto.randomUUID();
}

export function sessionCookieHeader(sid: string): string {
  return `${SESSION_COOKIE}=${sid}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}`;
}

// Fails safe: a Redis error degrades to a fresh, empty history (stateless
// single-turn mode) rather than breaking the widget. No history means no
// injection surface, so this degrade is safe on the security property too.
// Unlike the two reserve* functions below, history loss isn't cost-relevant
// (it only shortens context), so this one stays fail-open by design.
export async function loadSession(sid: string): Promise<SessionRecord> {
  try {
    const record = await redis.get<SessionRecord>(`bmax:chat:session:${sid}`);
    return record ?? EMPTY_SESSION;
  } catch {
    return EMPTY_SESSION;
  }
}

export async function saveSession(sid: string, record: SessionRecord): Promise<void> {
  try {
    await redis.set(`bmax:chat:session:${sid}`, record, { ex: SESSION_TTL_SECONDS });
  } catch {
    // Best-effort — the reply was already streamed to the client. Losing a
    // history write just means the next turn starts from a shorter context.
  }
}

function sessionCountKey(sid: string): string {
  return `bmax:chat:session:count:${sid}`;
}

function globalBudgetKey(): string {
  return `bmax:chat:global:${new Date().toISOString().slice(0, 10)}`;
}

// Atomically increments the session's message count and returns the new
// total. Deliberately does NOT catch — a Redis error must propagate so the
// caller (api/chat.ts) can fail closed (503) rather than silently letting
// the session cap go unenforced. Call before the Anthropic request; undo
// via releaseSessionMessage if the request doesn't end in a real reply.
export async function reserveSessionMessage(sid: string): Promise<number> {
  const key = sessionCountKey(sid);
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, SESSION_TTL_SECONDS);
  }
  return count;
}

export async function releaseSessionMessage(sid: string): Promise<void> {
  try {
    await redis.decr(sessionCountKey(sid));
  } catch {
    // Best-effort rollback — if it fails, the reservation just stays
    // counted, so the cap trips slightly earlier than strictly necessary.
    // Never the reverse, so it can't let usage run over the cap.
  }
}

// Same reserve/release pattern as reserveSessionMessage, for the site-wide
// daily circuit breaker sized to the Anthropic Workspace spend cap. Also
// deliberately does not catch — see reserveSessionMessage.
//
// Returns the day's key along with the count, and releaseGlobalMessage takes it
// back: recomputing the key at release time would decrement the next day's counter
// for a request that started just before midnight UTC.
export async function reserveGlobalMessage(): Promise<{ count: number; key: string }> {
  const key = globalBudgetKey();
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, GLOBAL_BUDGET_TTL_SECONDS);
  }
  return { count, key };
}

export async function releaseGlobalMessage(key: string): Promise<void> {
  try {
    await redis.decr(key);
  } catch {
    // Best-effort rollback — if it fails, the reservation just stays
    // counted, so the breaker trips slightly earlier than strictly
    // necessary. Never the reverse, so spend can't run over the cap.
  }
}
