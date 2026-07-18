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

const SESSION_COOKIE = 'bmax_chat_sid';
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
  return match ? match[1] : null;
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
export async function reserveGlobalMessage(): Promise<number> {
  const key = globalBudgetKey();
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, GLOBAL_BUDGET_TTL_SECONDS);
  }
  return count;
}

export async function releaseGlobalMessage(): Promise<void> {
  try {
    await redis.decr(globalBudgetKey());
  } catch {
    // Best-effort rollback — if it fails, the reservation just stays
    // counted, so the breaker trips slightly earlier than strictly
    // necessary. Never the reverse, so spend can't run over the cap.
  }
}
