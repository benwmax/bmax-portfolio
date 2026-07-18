# Hardening Pass Verification Runbook

**Purpose:** verify the 2026-07-18 security/QA hardening pass on the AI chat backend
against real Anthropic + Upstash traffic. It was implemented and reasoned through in a
sandbox with no credentials, so nothing in it has been exercised against a live model or a
live Redis instance yet — that's what this runbook is for. See `decisions.md` (2026-07-18)
for the full write-up of what changed and why.

**Audience:** a fresh Claude Code session with no memory of the work that produced this
file. Everything you need is below — you don't need to read the commit or ask for context
first. Run the steps in order; each one states what it proves, the exact command, the
expected result, and its cost/risk. Report back a pass/fail for each numbered step.

**Prerequisite:** `.env.local` in the project root with real values for `ANTHROPIC_API_KEY`,
`UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN` (see `.env.example`). If it's
missing, run `vercel env pull .env.local --environment=production` first, or ask the user
where to get these. Then `npm install` if `node_modules` isn't already present.

---

## What changed, in one paragraph

The chat backend's abuse/cost controls (`api/chat.ts`, `api/lib/rate-limit.ts`,
`api/lib/session.ts`) were rewritten to close a race condition where concurrent requests
near either spend cap (per-session, or the site-wide daily budget) could all pass a
stale check before any of them recorded usage — fixed via atomic Redis `INCR`/`DECR`
reservations. A second per-IP daily rate-limit window was added so one visitor can't alone
consume most of the shared daily budget. Redis outages on any cost-relevant check
(rate limit, either cap reservation) now fail closed (503) instead of crashing or silently
running unmetered. A spoofable `x-forwarded-for` IP fallback was dropped, a request-size
guard was added, CSP went from Report-Only to enforced, TypeScript `strict` mode was
enabled everywhere (including a new `tsconfig.api.json` — `api/` wasn't being type-checked
by the build at all before this), and the chat widget got a client-side stream timeout and
a double-submit guard.

---

## Step 1 — Build & lint sanity

**Proves:** strict mode (including the new `tsconfig.api.json`) compiles clean; no
regressions from the pass.
**Cost:** free.

```bash
npm run build
npm run lint
```

**Expected:** `npm run build` succeeds (runs `tsc -b && vite build`). `npm run lint` reports
15 pre-existing problems (1 error in `.storybook/preview.tsx`, 14 `storybook/no-redundant-story-name`
warnings across story files) — all predate this pass. If you see *different or additional*
errors, that's a regression; stop and investigate before continuing.

---

## Step 2 — CSP hash still matches the built output

**Proves:** the enforced CSP's `script-src` hash actually matches what Vite outputs for the
inline theme-flash-prevention script in `index.html`. If someone edited that script without
recomputing the hash, this step catches it — a mismatch means the theme script gets silently
blocked in production (flash of the wrong theme, CSP violation in console).
**Cost:** free.

```bash
npm run build
node -e "
const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
const content = match[1];
const hash = require('crypto').createHash('sha256').update(content, 'utf8').digest('base64');
console.log('sha256-' + hash);
"
grep -o "sha256-[A-Za-z0-9+/=]*" vercel.json
```

**Expected:** both commands print the identical value:
`sha256-8pwqoPF+Q1T4INtSXCLpmLGnCigBqWNE6RQ0nVV5qzE=`. If they differ, the `index.html`
inline script was edited since the hash was last computed — recompute and update
`vercel.json`'s `script-src` value, and update the maintenance comment above the script in
`index.html` if needed.

---

## Step 3 — Redis-only atomicity & fail-closed checks

**Proves:** the core fix — atomic cap reservations under concurrent access — actually holds
against real Upstash Redis, plus that Redis-unavailable calls throw (fail closed) rather
than swallow. No Anthropic calls happen in this step.
**Cost:** free/near-free (a handful of Redis operations; no model calls).
**Safety note:** this script is designed to never touch production's real daily-budget
counter or affect real visitors — it uses scratch keys and RFC 5737 test IPs. Read the
comments at the top of the script if you want the details.

```bash
npx tsx scripts/verify-cap-atomicity.mjs
```

**Expected:** four sections, each printing `✓` lines, ending in `All checks passed.` (exit
code 0). Specifically:
1. 10 concurrent session-cap reservations return exactly `[1..10]` — no duplicates, no gaps.
2. Same property on a scratch global-budget-style key.
3. A burst of 25 concurrent rate-limit checks against a fresh test IP admits **no more than**
   20 (the hourly limit) — exactly 20 is the typical result.
4. `reserveSessionMessage`, `reserveGlobalMessage`, and `checkRateLimit` all throw when
   pointed at unreachable Redis (run in a subprocess with deliberately bad credentials).

If any section fails, the atomicity fix or the fail-closed behavior has a real bug — this is
the most important step in this runbook. Don't skip it even if you're tempted to jump
straight to the full-stack smoke test below.

---

## Step 4 — Full-stack smoke test (existing script, confirms no regression)

**Proves:** the chat endpoint still works end-to-end for a real visitor — CORS, a real
model call, session-cookie issuance, server-side history continuity, the fabricated-history
jailbreak defense, a few jailbreak/persona-override probes, and basic input validation. This
script predates the hardening pass and isn't testing anything new from it, but it's the
fastest way to confirm the pass didn't break normal usage.
**Cost:** a handful of real Haiku calls — cheap, but non-zero. Don't loop this.

```bash
npx tsx scripts/verify-chat-safeguards.mjs
```

**Expected:** `All objective checks passed.` at the end. Read the probe replies it prints —
they should decline/redirect on the jailbreak attempts and never reference the fabricated
prior "admission" in step 4 of that script's output.

The script's own trailer output describes (but skips, for cost reasons) how to manually loop
requests to hit the real 20/hour and 30/session boundaries with live calls — that's
deliberately out of scope for this runbook too. Step 3 above is what stands in for testing
that boundary logic, without spending on real model calls to walk a counter up to 500.

---

## Step 5 — IP-spoofing fix

**Proves:** a forged `x-forwarded-for` header can no longer be used to pick an arbitrary
rate-limit bucket — `x-real-ip` is now the only source, and its absence is rejected outright.
**Cost:** free (rejected before any Redis/Anthropic network call — the API key check ahead
of it in `api/chat.ts` only checks the env var is *present*, it doesn't call out to Anthropic).

Run this from the project root. Unlike the two `.mjs` scripts above, this one-liner doesn't
parse `.env.local` itself, so load it into the shell first (needed because `api/chat.ts`
checks `ANTHROPIC_API_KEY` before it ever reaches the IP check this step is testing — without
it set, you'd get a 503 "Service unavailable" instead of the 400 this step expects):

```bash
set -a; source .env.local; set +a
npx tsx -e "
import handler from './api/chat.ts';
(async () => {
  const res = await handler(new Request('https://x/api/chat', {
    method: 'POST',
    headers: {
      origin: 'http://localhost:5173',
      'content-type': 'application/json',
      'x-forwarded-for': '1.2.3.4',
    },
    body: JSON.stringify({ message: 'hi' }),
  }));
  console.log(res.status, await res.text());
})();
"
```

(the async IIFE wrapper is required — `tsx -e` transforms eval strings as CJS, which
rejects bare top-level `await`; this exact snippet was run in a sandbox with no
`.env.local` and confirmed it returns `400 {"error":"Unable to identify request."}`)

**Expected:** `400 {"error":"Unable to identify request."}` — proves the missing
`x-real-ip` isn't silently falling back to the client-controlled `x-forwarded-for` value.

---

## Step 6 — Request size guard

**Proves:** an oversized request body is rejected before it's parsed. This one actually
short-circuits before the API key check (`content-length` is checked first in
`api/chat.ts`), so sourcing `.env.local` isn't strictly required — included anyway for
consistency with step 5.
**Cost:** free.

```bash
set -a; source .env.local; set +a
npx tsx -e "
import handler from './api/chat.ts';
(async () => {
  const bigMessage = 'a'.repeat(9000);
  const res = await handler(new Request('https://x/api/chat', {
    method: 'POST',
    headers: {
      origin: 'http://localhost:5173',
      'content-type': 'application/json',
      'x-real-ip': '127.0.0.1',
      'content-length': String(9000 + 20),
    },
    body: JSON.stringify({ message: bigMessage }),
  }));
  console.log(res.status, await res.text());
})();
"
```

**Expected:** `413 {"error":"Request too large."}` (this exact snippet was run in a sandbox
with no `.env.local` and confirmed this result — it short-circuits before the API key check).

---

## Step 7 — Browser checks (manual)

**Proves:** CSP enforcement, the theme toggle, and the chat widget's new timeout/double-submit
guards all work in a real browser, not just in code.
**Cost:** free.

```bash
npm run dev
```

Open the site in a browser with devtools open, then check:
- [ ] No CSP violation errors in the console on initial page load.
- [ ] Toggle the theme (NavBar Retro/Futuristic control), reload the page — no flash of the
      wrong theme before the correct one applies.
- [ ] Open the chat widget, send a real message — it streams a response normally, no console
      errors.
- [ ] Rapidly press Enter twice (or click "Ask" twice fast) on one message — confirm only
      **one** request appears in the Network tab (the double-submit guard).
- [ ] (Optional, hard to force) The 30s stream timeout can't easily be triggered locally
      without a hung server — this is fine to skip and verify by code review instead
      (`src/hooks/useChatSession.ts`, `armTimeout`/`STREAM_TIMEOUT_MS`).

---

## Step 8 — Production header check (only after a real deploy)

**Proves:** `vercel.json`'s headers (enforced CSP, HSTS, cache-control) actually apply in
production. **This cannot be verified under local `npm run dev` or `npm run preview`** —
`vercel.json` headers are a Vercel platform feature, not something Vite serves locally. Skip
this step until there's a real deployment (preview or production) to check.

```bash
curl -sI https://<your-deployed-url> | grep -iE "content-security-policy|strict-transport-security|cache-control"
```

**Expected:**
- `content-security-policy:` present (NOT `content-security-policy-report-only`)
- `strict-transport-security: max-age=63072000; includeSubDomains; preload`
- Requesting an asset under `/assets/...` should show
  `cache-control: public, max-age=31536000, immutable`; any other path should show
  `cache-control: public, max-age=0, must-revalidate`.

---

## Explicitly out of scope

- **Exhausting the real 500/day `GLOBAL_DAILY_MESSAGE_CAP` with live Anthropic calls** —
  deliberately not part of this runbook (cost and time). Step 3's Redis-only atomicity test
  is what stands in for proving the cap logic itself is race-free; the cap threshold value
  is just a constant in `api/chat.ts` and doesn't need 500 real calls to confirm it's wired
  up correctly.
- **Reservation rollback on a real Anthropic upstream failure** — hard to trigger
  deliberately without an invalid API key (which would also fail earlier checks). If you
  want to test this, temporarily set `ANTHROPIC_API_KEY` to an invalid value for one request
  via `verify-chat-safeguards.mjs`'s pattern, confirm a 502, then confirm (via a subsequent
  request with the same session cookie) that the session count wasn't incremented for the
  failed attempt.

---

## Reporting back

For each step above, report pass/fail and paste any unexpected output. If everything passes,
the hardening pass is confirmed working end-to-end against real infrastructure and is safe
to consider done. If anything fails, stop and report which step and what you saw — don't try
to silently patch around it without flagging it first, since these are cost/security
controls.
