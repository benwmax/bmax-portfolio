// session.ts — server-side authority for chat conversation state.
//
// The client only ever sends the newest user message. History and the
// session message count live here, in Redis, keyed by an HttpOnly cookie —
// never trusted from client-supplied request bodies. This is what stops a
// modified client from injecting fabricated prior "assistant" turns (a
// classic fake-prior-compliance jailbreak) or spoofing the session cap.

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
  count: number;
}

const EMPTY_SESSION: SessionRecord = { history: [], count: 0 };

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

// Fails safe: a Redis error degrades to a fresh, empty session (stateless
// single-turn mode) rather than breaking the widget. No history means no
// injection surface, so this degrade is safe on the security property too.
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

function globalBudgetKey(): string {
  return `bmax:chat:global:${new Date().toISOString().slice(0, 10)}`;
}

// Read-only check, used before calling the model.
export async function getGlobalUsageToday(): Promise<number> {
  try {
    return (await redis.get<number>(globalBudgetKey())) ?? 0;
  } catch {
    return 0;
  }
}

// Call only after a successful model response, so the circuit breaker
// tracks actual spend rather than rejected/failed attempts.
export async function recordGlobalUsage(): Promise<void> {
  try {
    const count = await redis.incr(globalBudgetKey());
    if (count === 1) {
      await redis.expire(globalBudgetKey(), GLOBAL_BUDGET_TTL_SECONDS);
    }
  } catch {
    // Best-effort — losing a usage tick just makes the breaker slightly
    // undercount, never overcount, so it can't cause false positives.
  }
}
