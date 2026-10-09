import { Redis } from '@upstash/redis';

export const config = { runtime: 'edge' };

// Keeps the Upstash Redis database alive. It's on the free tier, and Upstash
// deleted the previous one for inactivity on 2026-10-08, which took chat and
// the contact form down (both fail closed without Redis). A pre-launch
// portfolio can easily go weeks without a visitor, so a daily cron touches the
// database to keep it active. See decisions.md 2026-10-08.
//
// Runs as a Vercel cron (vercel.json → "crons") rather than a GitHub Action so
// it reads the same UPSTASH_* env vars as the site: if the database is ever
// recreated, updating Vercel's env vars is still the only step.
//
// Vercel crons only run on the production deployment.

const redis = Redis.fromEnv();

const KEEPALIVE_KEY = 'bmax:keepalive';
// The key only needs to outlive the gap between runs; it expiring on its own
// means the cron leaves nothing behind if it's ever removed.
const KEEPALIVE_TTL_SECONDS = 7 * 24 * 60 * 60;

function logEvent(event: Record<string, unknown>): void {
  console.log(JSON.stringify({ ts: new Date().toISOString(), ...event }));
}

export default async function handler(req: Request): Promise<Response> {
  // Vercel sends `Authorization: Bearer <CRON_SECRET>` on cron invocations.
  // Without the secret configured, refuse everything rather than leave a
  // public endpoint that writes to Redis on demand.
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // A write, not just a read, so it unambiguously counts as activity.
    await redis.set(KEEPALIVE_KEY, new Date().toISOString(), { ex: KEEPALIVE_TTL_SECONDS });
  } catch (err) {
    // Log the real error. If this fires, the database is unreachable or gone
    // and chat and contact are already returning 503.
    logEvent({
      event: 'error',
      reason: 'keepalive-failed',
      message: err instanceof Error ? err.message : String(err),
    });
    return new Response('Redis unavailable', { status: 503 });
  }

  logEvent({ event: 'keepalive' });
  return new Response('ok', { status: 200 });
}
