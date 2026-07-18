import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// Primary throttle: 20 requests per IP per hour.
// Tune MAX_MESSAGES_PER_HOUR in api/chat.ts — this value must match.
const hourlyLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 h'),
  analytics: true,
  prefix: 'bmax:chat:hourly',
});

// Secondary per-IP daily cap. The hourly window alone lets one sustained
// visitor consume ~480 messages/day — nearly the entire site-wide
// GLOBAL_DAILY_MESSAGE_CAP (500, api/chat.ts) — and starve everyone else.
// This keeps any single IP under ~12% of the shared daily budget. Both
// windows must pass. Tune alongside GLOBAL_DAILY_MESSAGE_CAP.
const dailyLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, '1 d'),
  analytics: true,
  prefix: 'bmax:chat:daily',
});

// Deliberately does not catch Redis errors — api/chat.ts wraps this call in
// a try/catch and fails closed (503) rather than letting an outage disable
// rate limiting entirely.
export async function checkRateLimit(ip: string): Promise<{ success: boolean }> {
  const [hourly, daily] = await Promise.all([hourlyLimit.limit(ip), dailyLimit.limit(ip)]);
  return { success: hourly.success && daily.success };
}
