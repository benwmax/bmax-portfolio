# Process Journal

Running log for the build process and follow-on case study work.

## 2026-06-01

### Initialized documentation structure
- Created the case study documentation scaffold under `docs/case-study/`.
- Added starter files for process notes, insights, decisions, and AI prompt tracking.
- Added a placeholder file so the `screenshots/` directory is tracked in git.

### Next entries to add
- Major implementation milestones
- Problems encountered and how they were resolved
- Screenshots captured at meaningful turning points

## 2026-06-09
**What I did:**
Rewrote the USAA case study using two parallel methods to stress-test
which produces better output.

**What I decided:**
Version B (interview-first) is the stronger approach for case study
drafting. Selected it as the base. No items from Version A folded in.

**Why:**
Version A was a direct rewrite from source material — complete and
structured, but reading like a project summary. Version B was built
from targeted interview questions and had more voice, more story, and
a clearer point of view. The stakeholder pivot section was the clearest
differentiator — it read like something that happened to a person, not
a line in a debrief.

**What I'm uncertain about:**
Question 7 (what outlasted the project that doesn't show up in metrics)
was skipped. That section is currently the weakest part of the draft.

**What Claude contributed:**
Wrote both versions. Flagged the length problem in Version A before
being asked. Identified the structural differences between drafts and
made a direction recommendation with reasoning.

**Where I overrode or redirected Claude:**
Rejected the recommendation to fold Version A items into Version B.
Kept B clean.
## 2026-06-20
**What I did:**
Created three homepage explorations on a `homepage-explorations` branch,
each progressively more futuristic and dynamic, all built on the locked
phosphor-terminal design system (no new tokens — only CSS extensions).
Added a new "Explorations" section to Storybook to review them side by side.

**What I decided:**
Build three distinct directions rather than iterate one, so the contrast is
legible: 01 · Signal (current homepage with the dynamism turned up —
cursor spotlight, self-typing headline, count-up stats, hover shine);
02 · Boot (machine boot sequence, CRT scanlines, live telemetry, glyph-decode
case records); 03 · Phosphor (animated synthwave-grid canvas, kinetic hero,
3D-tilt holographic cards, magnetic CTA). All three reuse the production
NavBar, ChatInput, and useChatSession so the assistant behaves identically.

**Why:**
The brief was to wow on entry while staying recognizably "us." Three points
on a spectrum make the risk/reward of each easy to feel before committing.

**What I'm uncertain about:**
Which direction to actually ship — Signal is safest, Phosphor is the boldest
and may be heavier than the rest of the site warrants. Open for Ben's call.

**What Claude contributed:**
Built all three variants end to end: shared data/hooks modules, the canvas
animation, the components and CSS, and the Storybook stories. Gated every
effect on prefers-reduced-motion so motion resolves to a static, legible state.

**Where I overrode or redirected Claude:**
(Pending Ben's review of the three directions.)

## 2026-06-20
**What I did:**
Built the AI component guidance system: added `parameters.ai` blocks to every
Storybook story (guidance, contentRules, avoid fields), created
`docs/ai-component-guide.md` as an authoritative 783-line component reference
with a decision tree, prop cheat sheets, composition patterns, and out-of-scope
list. Also added Contact.stories.tsx and Storybook exploration stories for all
three homepage variants (Signal, Boot, Phosphor) so they can be compared in
the Explorations section.

**What I decided:**
The parameters.ai blocks embedded in stories are the right place for AI
guidance — they travel with the component so future sessions can't miss them.
The ai-component-guide.md is the macro view: decision tree first, then
inventory, then what's out of scope.

**Why:**
Each new Claude session was starting cold on which components exist, which were
cut, and what the token rules are. Two places to look (CLAUDE.md at the macro
level, parameters.ai at the component level) cover both the before-you-build
question and the while-you're-building question.

**What I'm uncertain about:**
Whether the parameters.ai system and the MDX docs (coming next) are
complementary or redundant — the answer will depend on how future sessions
actually navigate Storybook vs. reading source files.

**What Claude contributed:**
Authored the full ai-component-guide.md, extracted rules and do's/don'ts from
existing decisions and CLAUDE.md, wrote all parameters.ai blocks, and created
the Contact and exploration stories.

**Where I overrode or redirected Claude:**
N/A — structural documentation pass, no design decisions required.

## 2026-06-20
**What I did:**
Created 12 MDX documentation pages for all components in Storybook: Button,
CaseStudyCard, CaseStudyHero, ChatInput, ImageCaption, Input, NavBar,
ProcessStep, RoleCallout, StatBlock, StatusIndicator, Tag. Each page includes
a prose description, embedded Canvas preview, do's/don'ts pulled from
parameters.ai, and an ArgTypes prop table.

**What I decided:**
Storybook as a public portfolio artifact needs to read as documentation, not
just a sandbox. MDX pages are the right format — they surface prose and
structure at the Docs tab level, which is the first thing a non-developer sees.

**Why:**
The Storybook component inventory is part of the portfolio pitch. A hiring
manager or design director landing on it should immediately understand what
each component is for, how it's used, and what the design constraints are —
without reading source code.

**What I'm uncertain about:**
None — straightforward documentation pass.

**What Claude contributed:**
Wrote all 12 MDX pages, extracted do's/don'ts from existing parameters.ai
guidance, structured the prop tables from existing story args.

**Where I overrode or redirected Claude:**
N/A.

## 2026-06-22

### Session 1 — WCAG AA accessibility audit

**What I did:**
Full WCAG AA audit of Contact, About, and CaseStudy pages and components. Fixed 7 issues
across 6 files. Updated ai-component-guide.md with an Accessibility Patterns section.

**What I decided:**
Fix every issue found, no deferral. Keyboard navigation and screen reader support are
part of the portfolio's brand signal — a senior UX designer's portfolio with inaccessible
focus indicators or missing landmarks is self-undermining.

**Why:**
The audit caught issues that ranged from near-invisible (Button focus ring at 1.9:1 contrast
against the dark background — visible only if you know to look for it) to structural (footer
inside main loses its ARIA landmark role entirely). All seven were worth fixing before Phase 4
content went in.

**What I'm uncertain about:**
None — these were clear failures with clear fixes.

**What Claude contributed:**
Identified all 7 issues, wrote the fixes across 6 files, updated ai-component-guide.md with
the Accessibility Patterns section, and wrote the decisions.md entry. Caught the footer
landmark issue (nested footer doesn't carry contentinfo role) without being prompted.

**Where I overrode or redirected Claude:**
N/A.

---

### Session 2 — Routing and case study content wiring

**What I did:**
Wired up a functioning multi-page site: installed React Router v6, rewrote App.tsx with
BrowserRouter and 10 routes, added vercel.json SPA rewrite, and created src/content/ with
5 typed CaseStudyContent objects.

**What I decided:**
- Keep NavBar router-agnostic (each page passes activePath explicitly) so Storybook stories
  continue working without a Router decorator.
- USAA content copied directly from the stories file — it was already complete and typed.
- Upfluent and Sabre converted from their markdown docs in docs/case-studies/.
- Sagent and Portfolio Rebuild as placeholders with known data and holding copy — full
  content comes from Phase 1C and Phase 7 respectively.

**Why:**
The site was rendering only the homepage. Every URL other than / would 404 on Vercel.
This was the last structural gate before the site could be navigated, shared, or tested
as a real multi-page experience.

**What I'm uncertain about:**
Sagent placeholder needs a full content pass once the brain dump happens — it's visible
to anyone who navigates to /work/sagent right now with holding copy showing.

**What Claude contributed:**
Installed React Router, wrote App.tsx, vercel.json, and all 5 content files. Caught the
apostrophe-in-single-quoted-string TypeScript error on first build and fixed the quoting
strategy (double quotes for strings with contractions, matching Prettier's own behavior).

**Where I overrode or redirected Claude:**
N/A.

## 2026-07-16

**What I did:**
Finished the last blocked pieces of Phase 4F: created the dedicated Anthropic Workspace
(API key, spend limit, email alert) and the Upstash Redis database, wired all three env
vars into Vercel, redeployed, and tested the live `/api/chat` endpoint with curl.

**What I decided:**
Temporarily disabled Vercel Deployment Protection to get an unauthenticated curl request
through to the function, since the preview deployment was returning 401s from Vercel's own
SSO gate before ever reaching the code.

**Why:**
The first curl test hit deployment protection (401, not a code issue). The second attempt,
after disabling protection, hit a real bug: `FUNCTION_INVOCATION_FAILED`. Pulled the actual
error via `vercel logs` and found `UPSTASH_REDIS_REST_URL` had been pasted into Vercel's env
var field with literal surrounding quote characters (`""https://...""`), which the Upstash
client rejected as an invalid URL. Fixed the env var, redeployed, and the endpoint returned
200 with a correctly streamed response — one that cited Upfluent specifically and correctly
flagged Sagent as still being finalized, confirming the system prompt is accurate.

**What I'm uncertain about:**
Deployment protection is currently off — needs to be re-enabled now that testing is done,
since the site isn't launched yet. CORS in `api/chat.ts` still only allows `viewbens.work`
and `localhost`, so the chat widget UI itself can't be tested against this preview domain
from a browser (curl bypasses CORS, so this didn't block the endpoint test).

**What Claude contributed:**
Walked through Anthropic Workspace and Upstash setup steps, built the curl test command,
diagnosed the 401 as deployment protection rather than a code problem, authenticated the
Vercel CLI (with my approval via browser device-auth prompt) to pull function logs, and
identified the quoted-string bug from the log output.

**Where I overrode or redirected Claude:**
N/A.
