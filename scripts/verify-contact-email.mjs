// Exercises the /api/contact safeguards directly against the real handler —
// no `vercel dev` needed, just real credentials in .env.local (project root).
// The final step performs ONE real Resend send to CONTACT_TO_ADDRESS
// (ben@viewbens.work) — that send is the actual proof that the Resend key and
// verified sending domain work end to end. Check that inbox after running.
//
// Usage (from the project root):
//   vercel env pull .env.local --environment=production   (to pick up RESEND_API_KEY)
//   npx tsx scripts/verify-contact-email.mjs
//
// Uses real Redis + one real Resend send (well within the daily cap). Each
// test uses a distinct x-real-ip so the per-IP limit (3/hour) doesn't trip
// across the guard checks and starve the real-send step.

import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

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

for (const required of ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'RESEND_API_KEY']) {
  if (!process.env[required]) {
    console.error(`Missing ${required} in .env.local`);
    console.error('If you just added RESEND_API_KEY in Vercel, run:');
    console.error('  vercel env pull .env.local --environment=production');
    process.exit(1);
  }
}

const contactPath = pathToFileURL(path.join(root, 'api', 'contact.ts')).href;
const { default: handler } = await import(contactPath);

// x-real-ip stands in for what Vercel's edge injects in production — calling
// the handler directly bypasses that, so we set it (per test, so the 3/hour
// per-IP limit doesn't leak across cases).
function req(body, { ip = '127.0.0.1', origin = 'http://localhost:5173', headers = {} } = {}) {
  return new Request('https://x/api/contact', {
    method: 'POST',
    headers: {
      origin,
      'content-type': 'application/json',
      'x-real-ip': ip,
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

// A body that passes every content check — individual tests override one field
// to exercise a single rejection path.
function validBody(overrides = {}) {
  return {
    name: 'Verify Script',
    email: 'visitor@example.com',
    message: 'This is a valid-length test message from the verification script.',
    website: '', // honeypot empty
    elapsedMs: 5000, // above MIN_FILL_MS
    ...overrides,
  };
}

function check(label, cond) {
  console.log(`${cond ? '✓' : '✗'} ${label}`);
  return cond;
}

let failures = 0;
const record = (ok) => { if (!ok) failures++; };

console.log('=== 1. CORS: disallowed origin -> 403 ===');
{
  const res = await handler(req(validBody(), { ip: '10.0.0.1', origin: 'https://evil.example' }));
  record(check('rejected with 403', res.status === 403));
}

console.log('\n=== 2. Missing client IP -> 400 ===');
{
  const res = await handler(
    new Request('https://x/api/contact', {
      method: 'POST',
      headers: { origin: 'http://localhost:5173', 'content-type': 'application/json' },
      body: JSON.stringify(validBody()),
    }),
  );
  record(check('rejected with 400', res.status === 400));
}

console.log('\n=== 3. Oversized payload (content-length) -> 413 ===');
{
  const res = await handler(
    req(validBody(), { ip: '10.0.0.2', headers: { 'content-length': String(5 * 1024) } }),
  );
  record(check('rejected with 413', res.status === 413));
}

console.log('\n=== 4. Honeypot filled -> 200 fake-success (no email sent) ===');
{
  const res = await handler(req(validBody({ website: 'http://spam.example' }), { ip: '10.0.0.3' }));
  const json = await res.json();
  record(check('returns 200', res.status === 200));
  record(check('returns { ok: true } (indistinguishable from a real send)', json.ok === true));
  console.log('  (verify NO email arrives for this one — it must be silently dropped)');
}

console.log('\n=== 5. Submitted too fast (elapsedMs < MIN_FILL_MS) -> 200 fake-success ===');
{
  const res = await handler(req(validBody({ elapsedMs: 200 }), { ip: '10.0.0.4' }));
  const json = await res.json();
  record(check('returns 200', res.status === 200));
  record(check('returns { ok: true }', json.ok === true));
  console.log('  (verify NO email arrives for this one either)');
}

console.log('\n=== 6. Invalid email -> 400 ===');
{
  const res = await handler(req(validBody({ email: 'not-an-email' }), { ip: '10.0.0.5' }));
  record(check('rejected with 400', res.status === 400));
}

console.log('\n=== 7. Message too short -> 400 ===');
{
  const res = await handler(req(validBody({ message: 'hi' }), { ip: '10.0.0.6' }));
  record(check('rejected with 400', res.status === 400));
}

console.log('\n=== 8. Missing/invalid elapsedMs -> 400 ===');
{
  const res = await handler(req(validBody({ elapsedMs: 'soon' }), { ip: '10.0.0.7' }));
  record(check('rejected with 400', res.status === 400));
}

console.log('\n=== 9. REAL send -> 200 (this actually emails CONTACT_TO_ADDRESS) ===');
{
  const res = await handler(
    req(
      validBody({
        name: 'Contact Verify Script',
        email: 'visitor@example.com',
        message:
          'END-TO-END TEST from verify-contact-email.mjs. If this landed in your inbox, ' +
          'the Resend key + verified domain are working. Reply-To should be visitor@example.com.',
      }),
      { ip: '10.0.0.99' },
    ),
  );
  const json = await res.json().catch(() => ({}));
  const ok = record(check('returns 200', res.status === 200));
  record(check('returns { ok: true }', json.ok === true));
  if (res.status !== 200) {
    console.log('  response body:', JSON.stringify(json));
    console.log('  502 = Resend rejected the send (domain not verified yet, or bad key).');
    console.log('  503 = no RESEND_API_KEY seen, or the daily cap/Redis check failed closed.');
  } else if (ok) {
    console.log('  → Check the CONTACT_TO_ADDRESS inbox now. Confirm:');
    console.log('    • the email arrived (not in spam)');
    console.log('    • From shows the contact@viewbens.work sender');
    console.log('    • Reply goes to visitor@example.com, not to yourself');
  }
}

console.log(`\n${failures === 0 ? 'All objective checks passed.' : `${failures} objective check(s) FAILED — see ✗ above.`}`);
console.log(`
Manual checks this script can't make objectively:
  - Steps 4 & 5 must produce NO email. They return the same 200 a real send
    does by design — the only way to confirm the drop is an empty inbox.
  - Step 9's email must actually arrive and its Reply-To must be the visitor's
    address. Open it and check.
Per-IP limit (3/hour) and the global daily cap (25) aren't boundary-tested here
to avoid burning real sends; each test above used a distinct IP on purpose.
`);
