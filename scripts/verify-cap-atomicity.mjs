// verify-cap-atomicity.mjs — exercises the atomic cap-reservation fix and the
// fail-closed Redis-error handling added in the 2026-07-18 hardening pass,
// directly against real Redis (Upstash). No Anthropic calls happen here, so
// this is free/near-free to run as often as you want — unlike walking a cap
// up to its real limit with live model calls (see verify-chat-safeguards.mjs
// for that, and note it deliberately skips the boundary tests for the same
// cost reason).
//
// Usage (from the project root, same .env.local as verify-chat-safeguards.mjs):
//   npx tsx scripts/verify-cap-atomicity.mjs
//
// What each section proves:
//   1. Session-cap reservations (reserveSessionMessage) serialize correctly
//      under concurrent access — this is the TOCTOU race the hardening pass
//      closed (api/chat.ts used to GET the count, then write it back later,
//      which let concurrent requests near the cap all pass the check).
//   2. The same atomicity property for the global daily budget counter —
//      tested against a throwaway scratch key, NOT the real
//      `bmax:chat:global:<date>` key that the live site's
//      GLOBAL_DAILY_MESSAGE_CAP reads from, so this never touches
//      production's real usage count.
//   3. The added per-IP daily rate-limit window doesn't break the existing
//      hourly one — burst past 20/hour against a fake, RFC 5737 test IP.
//   4. Redis-unavailable calls throw (not swallow) so api/chat.ts can fail
//      closed with a 503 instead of running rate limiting or the cost cap
//      unenforced during an outage.

import { readFileSync, existsSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';

const root = process.cwd();
const envPath = path.join(root, '.env.local');

if (!existsSync(envPath)) {
  console.error(`No .env.local found at ${envPath}`);
  console.error('Run: vercel env pull .env.local --environment=production');
  process.exit(1);
}

for (const rawLine of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  const line = rawLine.trim();
  if (!line || line.startsWith('#')) continue;
  const eq = line.indexOf('=');
  if (eq === -1) continue;
  const key = line.slice(0, eq).trim();
  let val = line.slice(eq + 1).trim();
  if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
  if (!process.env[key]) process.env[key] = val;
}

for (const required of ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN']) {
  if (!process.env[required]) {
    console.error(`Missing ${required} in .env.local`);
    process.exit(1);
  }
}

const sessionPath = pathToFileURL(path.join(root, 'api', 'lib', 'session.ts')).href;
const rateLimitPath = pathToFileURL(path.join(root, 'api', 'lib', 'rate-limit.ts')).href;
const { reserveSessionMessage } = await import(sessionPath);
const { checkRateLimit } = await import(rateLimitPath);
const { Redis } = await import('@upstash/redis');

const redis = Redis.fromEnv();

function check(label, cond) {
  console.log(`${cond ? '✓' : '✗'} ${label}`);
  return cond;
}

let failures = 0;
const record = (ok) => {
  if (!ok) failures++;
};

console.log('=== 1. Session-cap reservation: concurrent burst is serialized ===');
{
  const sid = `test-atomicity-${crypto.randomUUID()}`;
  const BURST = 10;
  const results = await Promise.all(Array.from({ length: BURST }, () => reserveSessionMessage(sid)));
  const sorted = [...results].sort((a, b) => a - b);
  const expected = Array.from({ length: BURST }, (_, i) => i + 1);
  const noRace = check(
    `${BURST} concurrent reservations returned exactly [1..${BURST}] with no duplicates/gaps`,
    JSON.stringify(sorted) === JSON.stringify(expected),
  );
  record(noRace);
  if (!noRace) console.log('  got:', sorted);
  console.log('  (test session key expires on its own via the existing 2h session TTL — no cleanup needed)');
}

console.log("\n=== 2. Global-budget counter: same atomicity, on a scratch key (not production's) ===");
{
  // Deliberately does NOT call reserveGlobalMessage()/releaseGlobalMessage()
  // — those always target today's real `bmax:chat:global:<date>` key, the
  // same one the live site's GLOBAL_DAILY_MESSAGE_CAP reads. Replicating the
  // exact same INCR-then-compare pattern against a throwaway key proves the
  // same Redis-level atomicity guarantee without touching real production
  // usage.
  const testKey = `bmax:chat:test:atomicity:${crypto.randomUUID()}`;
  const BURST = 10;
  const results = await Promise.all(Array.from({ length: BURST }, () => redis.incr(testKey)));
  const sorted = [...results].sort((a, b) => a - b);
  const expected = Array.from({ length: BURST }, (_, i) => i + 1);
  record(
    check(
      `${BURST} concurrent INCRs on a scratch key returned exactly [1..${BURST}]`,
      JSON.stringify(sorted) === JSON.stringify(expected),
    ),
  );
  await redis.del(testKey);
  console.log("  (scratch key deleted — production's real daily counter was never touched)");
}

console.log("\n=== 3. Rate limit: added daily window doesn't break the existing hourly one ===");
{
  // 203.0.113.0/24 is reserved for documentation/testing (RFC 5737) — never a
  // real visitor, so this can't collide with or affect real traffic.
  const testIp = `203.0.113.${Math.floor(Math.random() * 254) + 1}`;
  const BURST = 25;
  const results = await Promise.all(Array.from({ length: BURST }, () => checkRateLimit(testIp)));
  const successCount = results.filter((r) => r.success).length;
  // Sliding-window rate limiters are an approximation, not a hard fixed
  // window, so the safety-critical assertion is "never over-admits" rather
  // than an exact count. 20 is the expected typical result for a fresh IP's
  // very first burst.
  record(check(`no more than 20 of ${BURST} concurrent requests succeeded`, successCount <= 20));
  console.log(`  got: ${successCount} succeeded (exactly 20 is the expected typical result)`);
  console.log("  (test IP's rate-limit keys expire naturally per the 1h/1d windows — no cleanup needed)");
}

console.log('\n=== 4. Fail-closed: Redis-unavailable calls throw instead of swallowing ===');
{
  // Run in a genuinely separate child process rather than re-importing these
  // modules in this one — reserveSessionMessage/reserveGlobalMessage/
  // checkRateLimit all construct their Redis client from `Redis.fromEnv()`
  // at module-load time, so a fresh process is the only way to guarantee a
  // clean read of the bad env vars below with no chance of reusing the
  // already-initialized real-credentialed client from earlier in this file.
  const probeDir = mkdtempSync(path.join(tmpdir(), 'bmax-failclosed-'));
  const probePath = path.join(probeDir, 'probe.mjs');
  writeFileSync(
    probePath,
    `
import { reserveSessionMessage, reserveGlobalMessage } from ${JSON.stringify(sessionPath)};
import { checkRateLimit } from ${JSON.stringify(rateLimitPath)};

let failures = 0;
async function expectThrow(label, fn) {
  try {
    await fn();
    console.log('✗ ' + label + ' (did NOT throw — a Redis outage would silently pass through unmetered)');
    failures++;
  } catch {
    console.log('✓ ' + label);
  }
}

await expectThrow('reserveSessionMessage throws on unreachable Redis', () =>
  reserveSessionMessage('test-failclosed-probe'),
);
await expectThrow('reserveGlobalMessage throws on unreachable Redis', () => reserveGlobalMessage());
await expectThrow('checkRateLimit throws on unreachable Redis', () => checkRateLimit('203.0.113.99'));
process.exit(failures === 0 ? 0 : 1);
`,
  );

  const result = spawnSync('npx', ['tsx', probePath], {
    encoding: 'utf8',
    cwd: root,
    env: {
      ...process.env,
      // Port 1 on localhost: nothing listens there, so this fails fast
      // (connection refused) instead of hanging on a slow DNS timeout.
      UPSTASH_REDIS_REST_URL: 'http://127.0.0.1:1',
      UPSTASH_REDIS_REST_TOKEN: 'invalid-token-for-fail-closed-test',
    },
  });
  if (result.stdout) console.log(result.stdout.trim());
  if (result.status !== 0 && result.stderr) console.error(result.stderr);
  record(check('all fail-closed probes passed (see ✓/✗ above)', result.status === 0));
  rmSync(probeDir, { recursive: true, force: true });
}

console.log(`\n${failures === 0 ? 'All checks passed.' : `${failures} check(s) FAILED — see ✗ above.`}`);
process.exit(failures === 0 ? 0 : 1);
