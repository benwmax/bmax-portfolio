// contact-limit.ts — abuse controls for /api/contact, mirroring the
// reserve/release + fail-closed patterns used for chat (see rate-limit.ts
// and session.ts) but on its own Redis key prefix and its own, tighter
// budget. A contact submission costs a real email send and a slot in Ben's
// inbox — a different (and scarcer) resource than an LLM token — so it gets
// its own limits rather than sharing the chat endpoint's.

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// Tune MAX_CONTACT_PER_HOUR in api/contact.ts — this value must match (it's
// only duplicated there for the visitor-facing error message text).
const hourlyLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: true,
  prefix: 'bmax:contact:hourly',
});

// Secondary per-IP daily cap, same reasoning as rate-limit.ts's dailyLimit:
// stops one visitor's hourly allowance from repeating all day and eating
// most of the shared daily budget below.
const dailyLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 d'),
  analytics: true,
  prefix: 'bmax:contact:daily',
});

// Deliberately does not catch Redis errors — api/contact.ts wraps this call
// in a try/catch and fails closed (503) rather than letting an outage
// disable rate limiting entirely.
export async function checkContactRateLimit(ip: string): Promise<{ success: boolean }> {
  const [hourly, daily] = await Promise.all([hourlyLimit.limit(ip), dailyLimit.limit(ip)]);
  return { success: hourly.success && daily.success };
}

const GLOBAL_BUDGET_TTL_SECONDS = 60 * 60 * 26; // outlives a day so today's key always expires

function globalBudgetKey(): string {
  return `bmax:contact:global:${new Date().toISOString().slice(0, 10)}`;
}

// Same atomic reserve-before-send / release-on-failure pattern as
// reserveGlobalMessage in api/lib/session.ts, sized to what Ben's inbox (and
// Resend's sending volume) can reasonably absorb in a day — a circuit
// breaker independent of the per-IP limits above. Deliberately does not
// catch — see checkContactRateLimit.
export async function reserveGlobalContactMessage(): Promise<number> {
  const key = globalBudgetKey();
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, GLOBAL_BUDGET_TTL_SECONDS);
  }
  return count;
}

export async function releaseGlobalContactMessage(): Promise<void> {
  try {
    await redis.decr(globalBudgetKey());
  } catch {
    // Best-effort rollback — if it fails, the reservation just stays
    // counted, so the breaker trips slightly earlier than strictly
    // necessary. Never the reverse, so sends can't run over the cap.
  }
}
