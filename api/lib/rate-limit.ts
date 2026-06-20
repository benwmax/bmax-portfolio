import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Sliding window: 20 requests per IP per hour.
// Tune MAX_MESSAGES_PER_HOUR in api/chat.ts — this value must match.
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '1 h'),
  analytics: true,
  prefix: 'bmax:chat',
});

export async function checkRateLimit(ip: string): Promise<{ success: boolean }> {
  return ratelimit.limit(ip);
}
