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

### Session 2 — Pre-launch QA pass

**What I did:**
Ran an automated pre-launch QA pass: Playwright headless Chromium against all 10 routes at
1440/768/390px, checking for console errors, broken internal links, and horizontal overflow.

**What I decided:**
Fix everything the pass found before moving toward DNS cutover, rather than deferring — these
were correctness bugs, not polish.

**Why:**
The pass caught two real bugs. First, every page's NavBar links to `/contact`, but that route
was never added to App.tsx during the Phase 4A routing rewrite — clicking Contact 404'd
site-wide. Fixed by wiring the existing (fully built) Contact component into the router.
Second, a React console warning on every page traced back to `inert={condition ? '' : undefined}`
across HomeV4Blend.tsx and HomePage.tsx — React now treats an empty-string `inert` value as
`false`, meaning the boot overlay, docked chat panel, and mobile chat overlay were not actually
becoming inert when they should have (an accessibility regression: background content stayed
tabbable/focusable when it should have been excluded). Fixed by passing `true`/`undefined`
directly, which is also correctly typed now that `@types/react` has `inert?: boolean`. Also
found and fixed a horizontal-overflow bug on `/contact` at 390px — the email and LinkedIn
addresses are one unbroken string in a bold 28px monospace font with no wrap rule, forcing the
card past the viewport. Added `word-break: break-word`.

**What I'm uncertain about:**
Only did automated/emulated viewport testing, not real physical devices — that item in
Phase 4D/5 is still genuinely open. Also haven't done a cross-browser pass (Safari/Firefox/Edge)
or a Lighthouse audit yet.

**What Claude contributed:**
Wrote and ran the Playwright QA script, found both bugs from the automated pass, traced the
`inert` warning to its root cause (React's boolean-attribute coercion) rather than just
suppressing the console warning, and fixed all three issues with verification reruns after
each fix.

**Where I overrode or redirected Claude:**
N/A.

### Session 3 — Phase 5: Lighthouse, cross-browser, and root-cause performance/a11y fixes

**What I did:**
Ran a full Phase 5 pass: Lighthouse against the production build on all 9 routes, then a
cross-browser sweep (Chromium, Firefox, WebKit) via Playwright.

**What I decided:**
Chase every score below target to its root cause rather than treating Lighthouse as a checkbox.

**Why:**
First Lighthouse run on Home: performance 84, accessibility 96, best-practices 100, SEO 100.
The CLS component (0.201, "poor") traced back to the h1 typewriter effect — "I make expert tools
learnable." types in char-by-char, and partway through it wraps from 1 line to 2, but
`.heroH1`'s `min-height` only reserved space for 1 line. Every character typed after the wrap
point pushed the lede paragraph and the entire chat panel down the page — a real reflow, not
just an animation artifact. Fixed by reserving 2 lines of height up front, since the final
headline always wraps to 2 lines at this max-width by design. That took CLS from 0.201 to ~0.01
and performance to 96. (A parallel fix — moving Google Fonts from a blocking `@import` in
index.css to a `<link>` in index.html, matching what tokens.css's own header comment already
specified but was never actually wired up — helped FCP/LCP somewhat but wasn't the main CLS
cause; worth doing regardless since it's the documented intent.) The accessibility gap (96) was
a single character counter in ChatInput at 4.43:1 contrast against the input's raised background
— one shade of the tertiary text color, not a design flaw, just a token picked without checking
it against that specific background. Swapped it and a sibling "thinking" label to the secondary
text color (5.23:1). Running Lighthouse on a case study page surfaced a bug Home didn't have:
SEO dropped to 92 because index.html had a static canonical tag AND react-helmet-async was
independently injecting a per-page canonical, so every routed page shipped two conflicting
canonical URLs. Removed the static one — every page already sets its own via Helmet. Rerunning
on About surfaced two more real WCAG issues Lighthouse only catches on prose-heavy pages: inline
links in body text relied on color alone to stand out (added a permanent underline instead of
hover-only), and the NavBar wordmark's `aria-label="Ben Maxwell – Home"` didn't contain its own
visible text ("BM_"), which breaks voice-control activation (WCAG 2.5.3) — this aria-label had
been added during the 2026-06-22 accessibility audit for a different reason and nobody had
checked it against this rule. Final state, verified across all 9 routes: performance 96–98,
accessibility 100, best-practices 100, SEO 100. Cross-browser sweep (27 checks: 9 routes × 3
engines) came back completely clean — no console errors, no overflow, identical dark background
everywhere.

**What I'm uncertain about:**
WebKit-the-engine isn't the same as Safari-the-browser (no extensions, no iOS quirks, no real
device) — this doesn't replace real Safari testing. Real mobile device testing is still open.
Image optimization and "case study images load correctly" are still blocked — there are no real
images in any of the five case study content files yet, so those checklist items aren't really
testable until Phase 1E (image audit) happens.

**What Claude contributed:**
Ran and iterated on the Lighthouse/cross-browser passes, and for each score gap, pulled the
underlying data (layout-shift source rects via the Performance Observer API, not just the
summary number) to find the actual root cause rather than the first plausible guess — the CLS
value initially looked like it should be a font-loading/FOUT issue (and partially was), but the
ground-truth shift-source data showed the real culprit was the typewriter reflow.

**Where I overrode or redirected Claude:**
N/A.

### Session 4 — Hero headline clipping at mid-width viewports

**What I did:**
Fixed a bug I reported from a screenshot: at narrower desktop widths (roughly 1000-1200px,
before the layout collapses to single-column at 960px), the amber word "learnable" in the hero
headline was clipping behind the "Ask Ben" chat panel instead of wrapping.

**What I decided:**
Have Claude fix it properly rather than patch around the symptom, even though that meant undoing
part of yesterday's CLS fix and finding two more bugs along the way.

**Why:**
Root cause: the "tools learnable" phrase was forced `white-space: nowrap` (a deliberate choice
to keep those two words on the same line), which doesn't shrink with its container — at the
width where the hero column got too narrow for the full phrase, it just overflowed instead of
wrapping. Removing the nowrap fixed the clipping, but broke something else: it reintroduced the
layout-shift bug from 2026-07-16's QA pass, because the headline now wraps to a different number
of lines depending on viewport width (2 lines at some widths, 4 at others), and the fixed
2-line `min-height` reservation from yesterday only covered part of that range — CLS spiked to
0.58 at 1000px width, worse than before either fix. The real fix was to stop guessing a height
and instead reserve the box's actual final size: render the full final headline text as an
invisible "ghost" element in normal flow (so the browser measures real wrapping at the real
width), with the animated typewriter text absolutely positioned on top of it. That's correct at
every width automatically, no breakpoint-by-breakpoint tuning required. Along the way, fixing
the headline surfaced a second, unrelated pre-existing bug: the chat input's character counter
was rendering (and colliding with the placeholder text) even on a completely empty field,
because of a stale-measurement issue in the auto-resize logic. Fixed by only showing the counter
once there's real content to count.

**What I'm uncertain about:**
The exact final wrap point of the headline now varies by viewport width more than it did with
the nowrap constraint (e.g. "tools" and "learnable" land on separate lines at 1440px now, where
before they were forced together) — a minor typographic trade-off for guaranteed no-overflow
behavior. Worth a glance next time Ben reviews the homepage at a few widths, but not treating it
as a bug since nothing clips or looks broken.

**What Claude contributed:**
Found the actual root cause (forced nowrap not shrinking with its grid column) rather than just
patching the visual symptom, caught its own regression by rerunning the CLS check after the
first fix instead of assuming it was still fine, and replaced the fragile min-height guess with
a technique (ghost element + overlay) that's correct at every viewport width rather than tuned
to the ones tested. Also caught and asked before fixing an unrelated bug (counter/placeholder
collision) noticed incidentally while verifying the headline fix.

**Where I overrode or redirected Claude:**
N/A.

### Session 5 — Homepage hero: tablet layout and chat/stats reorder

**What I did:**
Two layout requests from a screenshot: on small screens, move the "Ask Ben" chat panel above
the stat callouts (15+ yrs, $1B, etc.) instead of below them; and at tablet widths, use the full
single-column stacked layout instead of squeezing two narrow columns side by side.

**What I decided:**
Raised the two-column breakpoint from 960px to 1100px, and pulled the stat row out to its own
CSS grid item (`grid-template-areas`) so it can be repositioned independently of the header
block at the mobile breakpoint, without touching desktop.

**Why:**
The stat row was nested inside the same div as the headline and lede, so it couldn't be
reordered on its own — moving it to a sibling grid item, addressed via named grid areas, let the
mobile breakpoint place it after chat (`header / chat / stats`) while desktop keeps its original
two-column arrangement (`header+stats` in column 1, chat spanning column 2) via the same areas,
independent of DOM order. Two things had to be caught before this was actually correct: dropping
the stat row's `margin-top: 36px` in favor of the grid's own `row-gap` (having both would have
doubled the header-to-stats spacing), and the "scroll" cue at the hero's bottom, which is
absolutely positioned assuming `.hero` is always much taller than its content (true on desktop
via `min-height: 100vh`, not true in the collapsed mobile/tablet layout) — with stats now the
last, compact element in the stack, the cue's own height poked up into it. Hid the cue below the
breakpoint instead of chasing exact padding math, since a "scroll" hint is redundant once content
already visibly spans several screens.

**What I'm uncertain about:**
1100px as the new breakpoint was my judgment call, not a value Ben specified — worth a second
look at actual tablet widths if it doesn't feel right in practice.

**What Claude contributed:**
Diagnosed why a simple CSS-order approach wouldn't work (stats was nested, not a sibling) and
used grid-template-areas instead so DOM order (and desktop reading order) didn't have to change.
Caught its own regression by rebuilding and re-screenshotting rather than assuming the reorder
was purely additive — found and fixed the scroll-cue collision before it reached Ben.

**Where I overrode or redirected Claude:**
N/A.

## 2026-07-17
**What I did:**
Added a second, user-selectable theme — "Futuristic" — as an alternative to the existing
terminal/phosphor look (now called "Retro"). Retro stays the default; a Retro/Futuristic
segmented toggle sits in the NavBar top right on every page and persists the choice to
localStorage. Same layout, same components, same content in both themes — only the token
layer and a few scoped CSS effects (cursor blink, caret shape) change. Also added one
"Futuristic" story per component and per page-level story in Storybook, and verified both
themes with a production build, a Storybook build, and full-page screenshots across every
page at desktop and 390px mobile.

**What I decided:**
Implemented the theme as a `[data-theme='futuristic']` override block layered on top of the
existing `:root` tokens in tokens.css, toggled via an attribute on `<html>` (inline script in
index.html applies a saved preference before first paint, so it never flashes the wrong
theme). Palette: cool pale surfaces, near-black slate text, azure primary accent, deep gold
secondary accent, Space Grotesk for display/chrome type with IBM Plex Mono unchanged for
data/metadata. Kept the green-*/amber-* token names even though the hues are now azure/gold —
documented the remap inline rather than renaming, since renaming would have meant touching
every component that reads them.

**Why:**
Ben wants a second full aesthetic as an additional demonstration of range for the meta case
study — the token architecture from Phase 2 turned out flexible enough to support it without
touching component logic, which is itself worth documenting.

**What I'm uncertain about:**
Whether Futuristic needs its own OG image / meta description before launch, given Retro is
the default first-impression theme visitors actually see. Logged as an open question in
decisions.md rather than deciding it myself.

**What Claude contributed:**
Caught a real accessibility bug mid-build rather than after: the first pass at the futuristic
primary button reused retro's structure literally (accent-colored text on a pale
accent-tinted fill), which measured under 4.5:1 once actually checked — a light background
makes that pattern fail even when every individual color looks fine in isolation. Also caught
that "brightest" flips meaning on a light background (darker/more saturated reads as more
emphasized, not paler) and applied that consistently to the cursor/dot colors and the Tag
"green" variant, which would otherwise have been nearly invisible. Found both by rendering
real screenshots of both themes rather than eyeballing token values in isolation.

**Where I overrode or redirected Claude:**
N/A — Claude asked clarifying questions up front (typography approach, accent palette,
Storybook coverage, whether brand motifs like the BM_ wordmark and terminal cursor should
survive the theme switch) before writing any code, so there wasn't drift to correct after
the fact.

## 2026-07-17 (later)
**What I did:**
Pushed the Futuristic theme further after the first pass — Ben wanted it cleaner and more
overtly sci-fi, and OK'd changing components/elements rather than just recoloring tokens.
Dropped the grid background to ~5% opacity (his explicit ask), sharpened the geometry
theme-wide (near-square corners, pill radius kept only for the toggle so it contrasts against
the squared panels), and introduced a consistent HUD accent language: crisp azure hairlines
(NavBar underline, 2px top rails on cards/panels/the 404 shell/contact channels, an accent
edge on the docked chat rail, an inset azure edge on the active chat field), leading azure
ticks on section kickers, solid azure index chips with a chamfered corner, and a squared
status badge with a solid marker square. Relabeled all 18 Futuristic Storybook stories to
"Futuristic V2".

**What I decided:**
Kept every change scoped under `[data-theme='futuristic']` plus one new `data-variant` hook on
the Button (inert in retro), so retro is byte-for-byte unchanged. Chose not to spin up a
separate `futuristic-v2` theme keeping V1 live — the product only needs one futuristic theme,
git preserves V1, and a permanent second theme is maintenance cost with no user payoff. "V2"
is just the Storybook iteration label.

**Why:**
The first pass proved the token system could carry a second theme; this pass is the payoff Ben
asked for. Doing it as scoped overrides rather than a fork keeps the blast radius at zero for
the default experience.

**What I'm uncertain about:**
Nothing blocking. The V1→V2 progression isn't preserved as a live comparison — if Ben wants a
side-by-side later it'd need the separate-theme route I decided against here.

**What Claude contributed:**
Caught an accessibility trap before shipping it: chamfered (clip-path) buttons would have looked
more HUD-like but clip-path also clips the focus-ring box-shadow — so the chamfer is used only on
decorative index chips, never on focusable elements, and button focus rings stayed on the utility
layer where no theme CSS can touch them. Also verified the push by re-screenshotting every page in
both themes rather than assuming scoped overrides were safe.

**Where I overrode or redirected Claude:**
N/A.

## 2026-07-17 (sign-off)
**What I did:**
Got sign-off from Ben on the Futuristic V2 push: "v2 looks perfect." No revisions requested.

**What I decided:**
Logged the approval in decisions.md rather than letting it pass silently — the scoping approach
(theme overrides instead of a component fork, chamfer kept off focusable elements) is now a
validated pattern for this project, not just a shipped one, and that's worth being able to point
back to next time a similar variant/theme request comes up.

**Why:**
Confirmations are easy to lose track of once a task feels "done" — but knowing an approach was
explicitly validated (not just unchallenged) is useful signal for how to make similar calls later.

**What I'm uncertain about:**
Nothing. The remaining open item (whether Futuristic needs its own OG image / meta description)
predates this sign-off and is unrelated to it.

**What Claude contributed:**
N/A — documentation only, no implementation work in this entry.

**Where I overrode or redirected Claude:**
N/A.

## 2026-07-18
**What I did:**
Tested the chat abuse-prevention hardening from 2026-07-17 against real Anthropic/Upstash
credentials — asked Claude to set up local testing, then actually ran the verification myself.

**What I decided:**
Ran the verification from a standalone terminal opened outside VSCode, not the integrated one,
after the integrated terminal produced a broken `.env.local` (every secret value silently
replaced with the literal string "[SENSITIVE]"). Used `npx.cmd` instead of `npx` to get past a
separate PowerShell execution-policy block, rather than changing the system's execution policy.

**Why:**
Claude's own sandboxed tool couldn't hold real secrets on disk either — anything secret-shaped
that touched a file it wrote came back redacted, so it couldn't finish the verification itself.
When I tried running `vercel env pull` myself, but still inside VSCode's built-in terminal, I
got the exact same "[SENSITIVE]" placeholder — which showed the redaction isn't specific to
Claude's tool calls, it's Claude Code's extension reaching into any terminal it has visibility
into, including ones I type into directly. A terminal window opened completely outside VSCode
fixed it immediately.

**What I'm uncertain about:**
Nothing about the results — all 6 objective checks passed, and reading the actual model replies
myself, the fabricated-history injection attempt was ignored and all four jailbreak/persona-
override probes declined cleanly. Left the rate-limit (20/hr) and session-cap (30/session)
boundary tests unrun since confirming them would cost ~50 real model calls against my capped
Workspace to exercise a mechanism already proven working by the other checks.

**What Claude contributed:**
Built `scripts/verify-chat-safeguards.mjs` — drives `api/chat.ts`'s handler directly with
constructed Request objects instead of fighting `vercel dev`'s local Edge Function emulation, so
it's runnable with two commands and no port/CORS setup. Diagnosed the terminal-redaction issue
by testing its own hypothesis rather than guessing — tried the same command in its own sandbox
first, saw the identical failure, then asked which terminal I'd used to isolate whether it was
sandbox-specific or something broader. Also caught the PowerShell execution-policy error and
gave the lower-friction fix (`npx.cmd`) instead of defaulting to a system-wide policy change.

**Where I overrode or redirected Claude:**
N/A.

## 2026-07-18 (later)
**What I did:**
Reported a real bug from testing on the live site: starting a chat on the homepage and then
clicking into a case study lost the conversation entirely. Asked Claude to fix it so the chat
follows me around the site, while keeping the per-case-study "Reading about X" context and
letting me scroll back to see the full history.

**What I decided:**
Answered Claude's clarifying questions before it touched any code: chat surface stays limited
to Home + Case Study pages (not About/Resume/Contact), the context note should only appear
once per case study per session rather than every time I revisit, the model itself should be
told what page I'm on (not just a visual note for me), and persistence only needs to survive
in-app navigation — not a hard refresh or new tab.

**Why:**
The scoped answers kept this from turning into a much bigger rebuild (a chat rail on every
page, or a server-rehydration mechanism) when what I actually needed was narrower. "Also tell
the model" was worth the small backend change since half the point of remembering context is
so I don't have to keep re-explaining which case study I'm asking about.

**What I'm uncertain about:**
Nothing about the fix itself — verified with a real Playwright run clicking through the actual
site. Worth knowing for later: Claude found and fixed two unrelated pre-existing bugs along the
way (see below) rather than just working around them, which is the right call, but it's a
reminder that "add persistence" touched more of the app than the ask implied.

**What Claude contributed:**
Built the shared chat context, the once-per-session context note, and the model-awareness
field (validated server-side against an allowlist of real case study names, not trusted as free
text — deliberately, since this codebase just went through a prompt-injection hardening pass
and an unvalidated field would have reopened that). While testing with Playwright, found that
NavBar/CaseStudyCard/the "Next case" link were plain `<a href>` tags doing full page reloads —
which would have silently broken the persistence feature regardless of where the chat state
lived, since a hard reload wipes all in-memory state. Fixed by converting them to React
Router's `Link`, safe now because Storybook's preview already wraps every story in a
`MemoryRouter` (added after the original decision to keep NavBar router-agnostic — that
decision had gone stale without anyone revisiting it). Separately found that Sabre — case
study 5 — was missing from the homepage work grid entirely in two places, meaning it was
unreachable from primary navigation despite being fully built; added the missing card. Also
caught and fixed a React Strict Mode–only bug (double-invoked effect was wiping out suggestion
chips on first visit) rather than leaving a subtly broken interaction.

**Where I overrode or redirected Claude:**
N/A.

## 2026-07-18 (verification run)
**What I did:**
Had Claude run `docs/testing/hardening-verification.md` step by step against real Anthropic
and Upstash credentials and report pass/fail on each step.

**What I decided:**
Approved both fixes Claude flagged from the run: add `shell: true` to the `spawnSync('npx', ...)`
call in `scripts/verify-cap-atomicity.mjs`, and add `storybook-static` to the ESLint
`globalIgnores` list. Also asked for this entry.

**Why:**
Both were bugs in the verification tooling itself, not the hardening pass it was checking —
worth fixing so the runbook gives a trustworthy signal on this (Windows) machine instead of
false alarms that'd need re-diagnosing every time it's run.

**What I'm uncertain about:**
Nothing about the hardening pass itself — steps 1–6 (build/lint, CSP hash, Redis atomicity,
fail-closed behavior, full-stack smoke test, IP-spoofing fix, request-size guard) all passed
against real infrastructure once the tooling bugs were fixed. Steps 7 (browser checks) and 8
(production headers) are still unverified — 7 needs a real browser session, 8 needs an actual
deploy, neither of which happened in this run.

**What Claude contributed:**
Ran the full runbook and found two real bugs in the verification scripts, not the product code:
(1) Step 2's raw-byte CSP hash comparison spuriously fails on this machine because
`core.autocrlf=true` converts the repo's LF line endings to CRLF in the local working tree,
which changes the SHA-256 of the built inline script — confirmed harmless by re-hashing with
line endings normalized back to LF, which matched `vercel.json` exactly (git stores the file as
LF, and Vercel's Linux build servers won't reintroduce CRLF, so production was never at risk).
(2) `scripts/verify-cap-atomicity.mjs`'s fail-closed subprocess check called
`spawnSync('npx', ...)` without `shell: true`, which throws `ENOENT` on Windows before the
subprocess even starts (npx resolves to `npx.cmd`) — the script swallowed `result.error` and
just reported a bare failure. Manually reproduced the same three probes to confirm the
fail-closed behavior itself was correct before touching the script, then fixed the spawn call
and re-ran to confirm: lint now reports the expected 15 pre-existing problems, and the
atomicity script now prints `All checks passed.` end to end.

**Where I overrode or redirected Claude:**
N/A.

## 2026-07-19 (later)
**What I did:**
Reported the chat widget's answers were hard to read on the live site — small text, one
dense wall of text with no paragraph breaks — and asked for larger text, real paragraph
breaks, and more succinct answers in general. Included a screenshot.

**What I decided:**
Approved Claude's fix as scoped: font-size bump, a real rendering bug fix on the live
homepage, and a hard rewrite of the system prompt's formatting rule.

**Why:**
N/A — straightforward bug report and fix.

**What I'm uncertain about:**
Nothing about the diagnosis — Claude reproduced the exact screenshot question against the
live model and showed the before/after. Still want to eyeball it in an actual browser once
deployed, since no browser tool was available in this session to confirm the visual result
directly.

**What Claude contributed:**
Found that the actual production homepage is `HomeV4Blend.tsx` (wired into `App.tsx`
2026-06-22), not `HomePage.tsx` — and that `HomeV4Blend.tsx` never got the `splitParagraphs()`
paragraph-rendering helper that `HomePage.tsx` and `CaseStudyPage.tsx` already had, so it was
rendering every reply as one undivided block regardless of how the model formatted it. Fixed
the rendering gap, bumped `.msgAssistant` font-size to 18px on both live surfaces (homepage
and case study pages), and rewrote the system prompt's formatting guidance from a soft
suggestion to a hard rule (default 2–4 sentences, never more than 3 sentences without a
paragraph break), plus lowered the output token cap (400 → 220) as a backstop. Verified by
replaying the exact question from the screenshot against the real handler before and after —
confirmed it now returns two short paragraphs instead of one seven-sentence block. Also
flagged that CLAUDE.md's "Immediate next steps" list still describes the homepage direction
as an open decision (Signal/Boot/Phosphor), even though build-plan.md has documented
`HomeV4Blend` as the live production homepage since 2026-06-22 — a resync candidate next time
CLAUDE.md is touched.

**Where I overrode or redirected Claude:**
N/A.

## 2026-07-19 (later still — mobile chat)
**What I did:**
Reported (with a screenshot) that on mobile, sending a message from the homepage's chat
container left the reply coming back into a field I couldn't interact with, while the "Ask
Ben" floating button sat on top of it. Specified the flow I wanted: no FAB before a chat
starts; starting a chat on the homepage should open the Ask Ben interface and load the reply
there; visiting a case study page should add the FAB; and returning to the homepage without
having chatted should keep the FAB. Asked Claude for questions first.

**What I decided:**
Answered Claude's two questions — the FAB stays scoped to Home + case study pages only (not
About/Resume/Contact), and its revealed state is session-only (in memory, resets on reload),
not persisted to localStorage. Approved the shared-component approach.

**Why:**
Both answers keep this consistent with the 2026-07-18 decision to scope chat to just Home and
case study pages, and with the conversation itself being session-only. Didn't want chat
bleeding onto pages it was deliberately kept off of.

**What I'm uncertain about:**
Only the visual result on a real device — no browser tool was available this session, and
plain `vite dev` doesn't serve the `/api/chat` Edge Function, so the end-to-end streaming
flow wasn't reproducible locally. Want to eyeball the overlay handoff and FAB behavior at a
390px viewport on the deployed site.

**What Claude contributed:**
Diagnosed the root cause: the homepage's inline hero panel is built to collapse into the
desktop docked rail once a conversation starts (`opacity:0` + `pointer-events:none`), but on
mobile there's no docked rail and nothing opened the full-screen overlay — so the reply
streamed into a hidden, dead panel and the FAB was the only live control. Also flagged that
case study pages had no mobile chat entry at all (docked panel is `display:none` below
1100px). Extracted the FAB + overlay into a shared `MobileChatSurface` component used by both
pages; added a session-only `fabRevealed` flag to the shared chat session so the FAB persists
across navigation; wired the homepage's inline submit to open the overlay on send; and hid
the FAB while the overlay is open (fixing the overlap in the screenshot). Build, lint, and
Prettier all clean.

**Where I overrode or redirected Claude:**
N/A — Claude asked before building and I picked the two options it recommended.

## 2026-07-20 — in-chat "get in touch" contact flow
*Reconstructed after the fact (2026-07-20) from decisions.md, build-plan.md, and commit
`2fb5983` / PR #13 — this session's work was done in a separate Claude Code session and no
journal entry was written at the time. Treat the "what I decided / uncertain about" notes
here as less reliable than the in-the-moment entries above; the code and decision record are
the trustworthy parts.*

**What I did:**
Asked for a seamless way for chat visitors to reach me without leaving the widget, with spam
prevention built in.

**What I decided:**
A structured Name/Email/Message form rendered inline in the chat log, emailing me directly,
rather than having the assistant collect the fields conversationally. Approved a client-side
keyword check to decide when to show it instead of wiring up model tool-use. Approved giving
the contact endpoint its own rate limits and daily cap rather than sharing chat's budget.

**Why:**
A form is reliable to validate and guarantees a usable reply-to address — free-text
collection means parsing an email out of prose and is easy for a visitor to fumble
turn-by-turn. On intent detection: `/api/chat` doesn't use tool-use at all today, and adding
a second model round-trip just to decide "should I offer a form" is disproportionate for what
is fundamentally a keyword match — and a false positive only costs a dismissible card. On the
separate budget: an email send is a different kind of resource than an LLM token. It costs
real money and it lands in my inbox, so it deserves its own ceiling.

**What I'm uncertain about:**
Whether the email actually arrives — the whole flow is untestable end to end until I create
the Resend account and verify `viewbens.work` as a sending domain. Everything else was
verified in a real browser; delivery is a complete unknown. Also unsure whether the
`detectContactIntent()` phrase list is too broad or too narrow — that's a tune-against-real-
traffic problem, not something I can reason my way to. And I still haven't seen the
ContactCard on an actual phone, only at a resized viewport — same open item as the last two
entries.

**What Claude contributed:**
Built the endpoint (`api/contact.ts`), its own budget module (`api/lib/contact-limit.ts`),
the `ContactCard` component with Storybook story and MDX, and the `detectContactIntent()`
wiring in `useChatSession`. Noticed on its own that the origin allowlist was about to exist
in two endpoints and extracted it to `api/lib/cors.ts` first — which also means the temporary
`.vercel.app` pre-launch entry now only has to be removed in one place at cutover, instead of
being a thing to remember twice. Layered the spam prevention: honeypot field (removed from
the accessibility tree, not just visually hidden, so it can't trap a screen-reader user),
minimum-fill-time check, per-IP and global caps, fail-closed on Redis errors — and made both
bot rejections return the same response a successful send does, so an automated caller can't
learn which check tripped it.

Found one real bug during its own browser verification: the email field had native HTML
`type="email"` + `required` validation *and* custom JS validation with a styled error state.
The browser's unstyled constraint tooltip fired first and pre-empted the custom error UI
entirely — so the designed error state was dead code that would never have been seen. Fixed
by adding `noValidate` and letting component state own validation end to end. Worth noting
this was caught by actually driving the form in a browser, not by reading the code.

**Where I overrode or redirected Claude:**
N/A.

## 2026-07-22
**What I did:**
Finished and verified the chat-triggered "get in touch" email flow. Ben had
already created the Resend account, verified the `viewbens.work` sending domain,
added `RESEND_API_KEY` to Vercel, and redeployed. Confirmed delivery end to end
by POSTing a real message to the deployed `/api/contact` on the `.vercel.app`
deployment — returned 200, and the email landed in ben@viewbens.work with the
visitor address as Reply-To. Added `scripts/verify-contact-email.mjs` (mirrors
`verify-chat-safeguards.mjs`) to exercise the guard paths plus a real send.
Checked off build-plan.md's Resend task and cleared the "untested"/blocked
language in CLAUDE.md.

**What I decided:**
Test against the deployed endpoint rather than locally. It's the more faithful
test anyway (real Vercel env, real edge IP injection, real Resend), and it
sidesteps needing secrets in `.env.local`.

**Why:**
The whole point was to confirm live delivery works. A 200 from the deployed
endpoint distinguishes success from the failure modes on its own: 503 = missing
key, 502 = Resend rejected the send. Domain-verified sending is not the same as
receiving, so the real proof was the message actually arriving — which it did.

**What I'm uncertain about:**
Nothing on the contact flow itself now. Still open: the mobile ContactCard
inside the overlay has only been tested via browser resize/Playwright, never a
real device (tracked in Phase 5).

**What Claude contributed:**
Wrote the verification script, ran the live end-to-end test, and updated the
docs.

**Where I overrode or redirected Claude:**
Claude ran `vercel env pull` to refresh `.env.local` before realizing the four
API secrets are marked Sensitive in Vercel — the pull overwrote their real
local values with `[SENSITIVE]` placeholders. No production impact (Vercel
runtime still holds the real values), but the local file needs restoring from
OneDrive version history to run the local scripts. Lesson: don't `vercel env
pull` over a working `.env.local` when the vars are Sensitive; they can't be
pulled back.
