# CLAUDE.md — Portfolio Rebuild Project Instructions
*This file governs AI behavior across all conversations in this project.
Place it at the root of the repository. Update it as decisions are finalized.*

---

## What This Project Is

A ground-up portfolio rebuild for Ben Maxwell, a senior UX designer targeting
UX Principal and Design Director roles. The portfolio is being built with AI
assistance (Claude) and that process is itself the lead case study — meaning
the quality of AI collaboration, and Ben's direction of it, is on display.

Every decision made in this project is potential case study material. Treat it
that way.

---

## The People Involved

**Ben Maxwell** — designer, decision-maker, director of this process. He has
final say on all strategic, visual, and content decisions. Claude is a
collaborator and force multiplier, not an autonomous agent.

**Claude** — AI collaborator. Responsible for analysis, code generation,
writing drafts, and surfacing blind spots. Not responsible for positioning,
visual identity direction, what work to feature, or judgment calls about
confidentiality.

---

## Positioning and Audience

**Positioning statement (finalized 2026-06-02):**
> I make expert-level tools learnable — for agents, adjusters, attorneys, and
> traders who can't afford to get it wrong.

**Expanded thesis (finalized 2026-06-02):**
> I've worked across travel, insurance, fintech, and mortgage — building tools
> that experts actually adopt. The work is in the details: the decision that
> made onboarding 6 months faster, the user research that redesigned how an
> industry works, the chatbot that let retail traders think like professionals.

**Target roles:** UX Principal, Design Director
**Target companies:** Fintech, regulated industries, companies building or
scaling design systems, companies with meaningful AI product investment

**Tone:** Professional but with personality. Confident without being stiff.
Specific over generic. No corporate filler. "Howdy" energy, sustained
throughout — not just in the opener.

---

## Tech Stack (Finalized)

- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS (custom theme extending default scale)
- **Components:** ShadCN UI as primitive foundation; custom components built
  on top — ShadCN is the floor, not the system
- **Component library:** Storybook 8 (publicly hosted as a portfolio artifact)
- **Hosting:** Vercel, connected to GitHub repo via automatic deploys
- **Domain:** viewbens.work (already owned and live)
- **Repo:** bmax-portfolio (public from day one)
- **API/Backend (AI chat feature):** Vercel Edge Functions (serverless) +
  Upstash Redis (rate limiting) — see "AI Chat Feature" section below

---

## Case Study Order and Rationale

1. **Portfolio Rebuild with Claude** — lead case study; current work; shows AI
   fluency, self-direction, Principal-level meta-thinking
2. **Upfluent** — most recent client work; AI-adjacent (chatbot); fintech
3. **Sagent** — leadership story; complex enterprise; most relevant to Director
   roles
4. **USAA** — scale, regulated industry, systems thinking, research depth
5. **Sabre** — strongest hard outcomes ($1B contract, 23% revenue lift); the
   anchor close

**Market Rebellion** is not featured as a standalone case study. Disposition
(whether to reference it elsewhere) is an open question for Phase 1.

**Do not suggest reordering these without flagging it explicitly and explaining
the strategic reason.**

---

## NDA and Confidentiality Constraints

No NDA constraints apply to any case study. All work can be shown publicly
without password gates, anonymization, or confidentiality notes.

- **Sabre:** No NDA constraints.
- **USAA:** No NDA constraints.
- **Upfluent:** No NDA constraints.
- **Sagent:** No NDA constraints.
- **Market Rebellion:** No NDA constraints.

---

## Repository Structure

```
/
├── CLAUDE.md                        ← this file
├── README.md                        ← public-facing project description
├── .env.example                     ← required env vars (AI chat feature)
├── api/
│   ├── chat.ts                      ← AI chat feature: serverless endpoint
│   └── lib/
│       ├── system-prompt.ts         ← chat assistant system prompt
│       └── rate-limit.ts            ← per-IP rate limiting (Upstash)
├── docs/
│   ├── case-study/
│   │   ├── key-insights.md          ← curated moments from AI analysis
│   │   ├── decisions.md             ← significant choices + reasoning
│   │   ├── process-journal.md       ← running dated build log
│   │   ├── build-plan.md            ← phased build plan with live checkbox tracking
│   │   ├── ai-prompts.md             ← prompts that produced useful output
│   │   └── screenshots/             ← key conversation and process screenshots
│   └── case-studies/                ← draft content, pre-layout
│       ├── usaa.md                  ← USAA case study (rewritten 2026-06-15)
│       ├── upfluent.md              ← Upfluent case study (rewritten 2026-06-15)
│       └── sabre.md                 ← Sabre case study (rewritten 2026-06-15)
├── src/
│   ├── components/                  ← custom components (built on ShadCN)
│   ├── stories/                     ← Storybook stories
│   ├── pages/                       ← page-level components
│   ├── tokens/                      ← design tokens (CSS custom properties)
│   └── styles/                      ← global styles, Tailwind config
└── public/
```

---

## Documentation Files — What Goes Where

### `decisions.md`
Significant choices made during the project and the reasoning behind them.
One entry per decision. Format:

```markdown
## YYYY-MM-DD — Decision title
- Decision: What was decided.
- Reasoning: Why.
- Alternatives considered: What else was on the table. (optional)
- Open question: Anything still unresolved. (optional)
```

**When to update decisions.md:**
- A tech stack choice is made or changed
- A case study ordering or content decision is made
- A visual identity direction is chosen
- A component architecture decision is made
- A NDA/confidentiality call is made
- Any time Ben says "I've decided to..." or "let's go with..."

### `build-plan.md`
The phased build plan with checkbox tracking. This is a live document —
checkboxes are checked off as work is completed.

**When to update build-plan.md:**
- A phase step or sub-step is completed — check the box immediately
- A phase is fully completed — update the Phase Status table at the top
- A step is added, removed, or significantly changed mid-project
- A phase is blocked or unblocked — update the Blocked By column

**How to update:**
- Change `- [ ]` to `- [x]` for completed items
- Update the Phase Status table when a full phase changes status
- Add a completion date in parentheses next to checked items where useful:
  `- [x] Connect bmax-portfolio to Vercel (2026-06-01)`
- Never delete steps — check them off so the history is preserved

### `process-journal.md`
Running log of build activity. Dated entries, written in the moment, not
edited for polish. Raw material for the case study.

Format:
```markdown
## YYYY-MM-DD
**What I did:**
**What I decided:**
**Why:**
**What I'm uncertain about:**
**What Claude contributed:**
**Where I overrode or redirected Claude:**
```

**When to update process-journal.md:**
- At the end of any working session
- When something unexpected happens (good or bad)
- When Claude produces output that surprises Ben (in either direction)
- When a decision gets reversed

### `key-insights.md`
Curated moments of genuine insight, strategic pivots, or documentable
decisions worth keeping for the case study narrative. Not a log — a
selection. Updated sparingly, only when something genuinely important emerges.

### `ai-prompts.md`
Prompts that produced meaningfully useful output, with a note on what was
done with the result. Also note prompts that failed or produced output that
was redirected. Format:

```markdown
## [Short description of what this prompt was for]
**Prompt:**
[the prompt]
**What it produced:**
**What was useful:**
**What was wrong or redirected:**
```

---

## How Claude Should Behave in This Project

### Always do

- **Propose documentation updates explicitly.** When a conversation produces
  a decision, a key insight, or a significant build moment, say so. Example:
  *"This feels like a decisions.md entry — want me to write it up?"*

- **Update build-plan.md when work is completed.** When a step or sub-step
  is finished, check it off in build-plan.md immediately. When a full phase
  completes, update the Phase Status table. Do not wait to be asked — checking
  off completed work is part of completing the work.

- **Flag when recommendations conflict with prior decisions.** If a suggestion
  in the current conversation contradicts something established earlier (in
  this file or in the docs), name the conflict before proceeding.

- **Separate Ben's decisions from Claude's suggestions.** Be explicit about
  which is which. Never present a Claude recommendation as if it were already
  decided.

- **Ask which workstream a conversation belongs to** when it's not clear.
  Different conversations handle different phases — don't bleed code help into
  a content writing session without checking.

- **Cite the relevant doc when referencing prior decisions.** If a positioning
  statement or case study order is relevant, reference where it's documented
  rather than restating it from memory.

- **Write Storybook stories and component code with documentation in mind.**
  Comments should explain *why* a decision was made, not just what the code
  does. A design director reading the repo shouldn't need to be a developer to
  understand the intent.

- **When writing case study content, apply the established structure:**
  1. Problem (not project description)
  2. Role clarity (explicit ownership statement)
  3. User context (who they are and why they're hard to design for)
  4. Process (methods + labeled artifacts)
  5. The key decision and why
  6. What was hard or failed
  7. Outcomes
  8. What would be done differently

- **Case study tone and length standard (established 2026-06-09):**
  The USAA Version B draft is the reference. Match it. Specifically:
  - **Length:** Each section should be a short paragraph — 2 to 4 sentences
    max. The whole case study should be readable in 1–2 minutes. If a section
    is running long, cut it, don't tighten it.
  - **Tone:** Confident and direct. First person, active voice. Write like a
    senior designer telling a story to a peer — not like a case study template
    being filled in. No corporate filler. Short sentences land harder than long
    ones.
  - **Story over summary:** The goal is for the reader to feel the project, not
    audit it. The "What Was Hard" section in particular should read like
    something that happened to a person, not a risk log entry.
  - **Specificity over comprehensiveness:** One sharp detail beats three vague
    ones. Don't list every method used — name the ones that actually mattered
    and say why.
  - **Never write a first draft at full length and then trim.** Write short
    from the start. If Ben asks for a revision to tighten length, that means
    the first draft was too long — adjust calibration going forward.

### Never do

- **Never reorder the case studies without flagging it explicitly** and
  explaining the strategic reason.

- **Never describe the portfolio project as "Claude built this."** The framing
  is always that Ben directed the process using Claude as a collaborator. The
  distinction is the point.

- **Never skip the "what Claude couldn't do" framing** when writing or
  reviewing meta case study content. That section is the trust signal.

- **Never present generic portfolio advice** as a recommendation without
  flagging that it's a common pattern. The portfolio needs to be
  differentiated, not templated.

- **Never add confidentiality flags or password gate recommendations.** NDA
  status has been confirmed clear across all case studies.

- **Never let a significant decision pass undocumented.** If a conversation
  ends with a clear direction chosen, prompt Ben to log it before closing.

- **Never delete steps from build-plan.md.** Check them off — the history
  of what was done matters for the case study.

---

## Visual Identity Principles

- Dark mode default — light mode is an accessibility fallback, not a primary experience
- Tokens use CSS custom properties in `src/tokens/tokens.css`, mapped to Tailwind config
- ShadCN is a primitive foundation — custom components are the system

**Aesthetic direction (finalized 2026-06-17):**
- Background: warm dark charcoal with olive undertone — `#0e100f` page, `#141612` surface
- Primary text: warm off-white `#ccd4b0` — never pure white
- Accent green: phosphor terminal green `#00e054` primary / `#00ff5e` max-contrast moments
  (cursor blink, status dot, focused input caret)
- Accent amber: warm gold `#c08820` — secondary only, for tags and data callouts
- Surface texture: dot grid via `radial-gradient` — page bg and hero section only
- Border radius: 3px system default — sharp, not rounded; 0 for terminal-chrome elements
- Wordmark: `BM_` — trailing underscore is a terminal cursor convention, intentional

**Typography (finalized 2026-06-17):**
- `--font-mono-display`: Space Mono (Google Fonts, free) — wordmark, nav, buttons,
  case study numbers, tags, chat prompt indicator (`›`), ALL CAPS labels. Use where
  the terminal aesthetic is the point. Runs wide — use negative tracking at display sizes.
- `--font-mono-ui`: IBM Plex Mono (Google Fonts, free) — chat input text, metadata,
  smaller labels, anything Space Mono makes too loud below ~13px.
- `--font-sans`: System sans stack — prose and case study body copy only. Never for UI chrome.
- Google Fonts import snippet lives in `src/tokens/tokens.css` header comment.

**Token file:** `src/tokens/tokens.css` — CSS custom properties, Tailwind-ready,
last updated 2026-06-20. Contains: color primitives, semantic tokens, type scale,
letter spacing, line height, spacing, border radius, border shorthands, dot grid
surface, motion, shadow, layout widths, and per-component font/color/tracking tokens.

---

## Storybook Conventions

- Every component has a Default story and stories for all meaningful states
- Story descriptions explain the *why* of design decisions, not just props
- Foundations section documents tokens (color, type, spacing, motion) as
  readable tables — legible to non-developers
- Page-level stories exist for: Home, Case Study, About/Resume, 404
- Storybook is hosted publicly as a portfolio artifact, not just a dev tool
- Storybook deployed to a separate Vercel project on a subdomain
  (e.g. system.viewbens.work)

---

## Component Usage

Before building any new UI component or page section, read `docs/ai-component-guide.md`.
It is the authoritative reference for all components, page templates, composition patterns,
and things that were intentionally left out of scope.

1. **Prefer existing components over building new ones.** If the component you need doesn't
   appear in the component inventory, check whether it was intentionally removed from scope
   before building something new. Many obvious components (Select, Avatar, Icon wrapper,
   MobileMenu) were explicitly cut.

2. **Every component and story has `parameters.ai` guidance.** When working in a story file,
   read the `ai` parameter block before writing new stories or new component variants. The
   guidance, contentRules, and avoid fields reflect real decisions — not defaults.

3. **Never hardcode hex values or arbitrary spacing.** Always use CSS custom properties
   (`--color-*`, `--space-*`, `--radius-*`) or Tailwind token classes. All hex values are
   documented in Foundations/Colors. All spacing values are documented in Foundations/Spacing.

4. **The five canonical industry labels are: Travel, Fintech, Mortgage, Insurance, AI Collaboration.**
   Do not invent new industry labels. These are the only tags used across all case study cards
   and Tag components.

5. **The case study order is finalized:** 01 Portfolio Rebuild, 02 Upfluent, 03 Sagent,
   04 USAA, 05 Sabre. Index chips and meta must reflect this order. Do not reorder without
   flagging it explicitly and explaining the strategic reason.

6. **Components removed from scope are intentionally absent.** The following were cut and
   should not be built: Select, Icon wrapper, Link component, Avatar, Container/Section/Grid/
   Divider layout primitives, QuoteBlock, TimelineEntry, MobileMenu. See the guide for details.

---

## AI Chat Feature

A live AI assistant embedded on the portfolio site, letting visitors ask
about Ben's work directly. Architecture: a Vercel Edge Function (`api/chat.ts`)
proxies to Claude Haiku 4.5, with a system prompt scoped to Ben's positioning
and case study summaries. The API key is never exposed to the client. See
decisions.md (2026-06-15) for the full reasoning and build-plan.md Phase 4F
for the build checklist.

**Files:**
- `api/chat.ts` — endpoint: origin/IP checks, rate limiting, validation,
  global budget breaker, streamed response, request logging
- `api/lib/system-prompt.ts` — the assistant's brief (positioning, case study
  summaries, tone, scope, safety/anti-jailbreak instructions)
- `api/lib/rate-limit.ts` — per-IP rate limiting via Upstash Redis
- `api/lib/session.ts` — server-side session authority: conversation history
  and the session message cap live here (Redis, keyed by an HttpOnly
  cookie), never trusted from the client. See decisions.md (2026-07-17).
- `api/lib/cors.ts` — the shared origin allowlist (`ALLOWED_ORIGINS`) and CORS
  headers for *every* `/api/*` endpoint. Extracted from `api/chat.ts`
  2026-07-20 so chat and contact can't drift and the temporary pre-launch
  entry only needs removing once.
- `api/contact.ts` — the in-chat "get in touch" endpoint: emails a visitor's
  Name/Email/Message to Ben via Resend. Mirrors `api/chat.ts`'s abuse-prevention
  shape but on its own budget. See decisions.md (2026-07-20).
- `api/lib/contact-limit.ts` — per-IP hourly/daily rate limits and the global
  daily cap for `api/contact.ts`, deliberately separate from chat's budget.
- `src/components/ContactCard/` — the inline contact form rendered in the chat
  log, including the honeypot field and minimum-fill-time anti-bot signals.
- `src/components/MobileChatSurface.tsx` — the mobile-only "Ask Ben" entry
  point (floating action button + full-screen overlay), shared by the homepage
  and case study pages so the mobile chat behaves identically on both. See
  decisions.md (2026-07-19).
- `.env.example` — required environment variables

**Key constraints:**
- The Anthropic API key lives in a dedicated Workspace with its own monthly
  spend limit and email alert — never reuse a key from another workspace for
  this feature. This is the hard ceiling on cost; `GLOBAL_DAILY_MESSAGE_CAP`
  in `api/chat.ts` is the software-side circuit breaker meant to degrade
  gracefully well before that hard cap would ever bite — re-tune it if the
  Workspace spend cap changes.
- `api/lib/system-prompt.ts` is the assistant's brief and needs upkeep —
  update it whenever a case study moves from "in progress" to "published" so
  the assistant doesn't undersell or misstate finished work. As of
  2026-06-15, Upfluent, USAA, and Sabre have all been rewritten and the
  system prompt's "still being finalized" language for those is now stale.
  It also carries safety/anti-jailbreak instructions (persona-lock,
  anti-defamation, ignore-embedded-instructions, groundedness, no code
  execution) added 2026-07-17 — keep these when editing the case study
  content around them.
- Conversation history and the session message cap are server-side
  authoritative (`api/lib/session.ts`), not client-supplied — the client only
  ever sends the newest message. Do not revert to trusting a client-supplied
  message array or session count; that was a real fabricated-history
  jailbreak vector, fixed 2026-07-17 (see decisions.md).
- Safeguard values (rate limits, session message cap, output token cap,
  history length, message length cap, global daily message cap) live as
  named constants at the top of `api/chat.ts` — tune there, not inline.
- If assistant-output rendering is ever changed to support markdown/HTML
  (currently it's plain JSX text interpolation, which React auto-escapes —
  no sanitization needed today), that change must ship together with output
  sanitization (e.g. DOMPurify) in the same commit, not as a follow-up.
- The widget's visual styling depends on Phase 2/3 tokens; the backend does
  not and can proceed independently.
- `ALLOWED_ORIGINS` lives in `api/lib/cors.ts` (moved out of `api/chat.ts` 2026-07-20) and
  is shared by every `/api/*` endpoint. It temporarily includes
  `https://bmax-portfolio.vercel.app` (added 2026-07-19, marked `TEMPORARY` in a code
  comment) so the widget is testable pre-launch. Remove it once `viewbens.work` is cut
  over — one edit, one file. See "Current Project Status" → Immediate next steps.
- The contact flow's intent detection (`detectContactIntent()` in
  `src/hooks/useChatSession.ts`) is a client-side regex, not model tool-use — it runs
  against both the visitor's message and the assistant's finished reply. If the system
  prompt's wording about how visitors reach Ben changes, check that the phrase list still
  matches; the two are coupled by convention, not by code. See decisions.md (2026-07-20).
- `api/contact.ts` has its own rate limits and daily cap, separate from chat's, because an
  email send is a different resource than an LLM token. Don't merge the two budgets.
- The assistant's replies are rendered by `splitParagraphs()` (`src/hooks/useChatSession.ts`)
  into separate `<p>` blocks, and the system prompt's formatting section enforces short,
  frequent paragraph breaks as a hard rule (not a suggestion — Haiku doesn't reliably follow
  soft formatting guidance). Any page that renders assistant messages must call
  `splitParagraphs()` on the text, not render it as one block — `HomeV4Blend.tsx` shipped
  without this for weeks before being caught 2026-07-19; see decisions.md 2026-07-19.
- On mobile (<=760px) the chat is a floating "Ask Ben" button that opens a full-screen
  overlay, both in `src/components/MobileChatSurface.tsx` and shared by the homepage and
  case study pages. Two behaviors are load-bearing and easy to regress: (1) starting a chat
  from the homepage's inline container must OPEN the overlay (via `handleHeroSubmit` in
  `HomeV4Blend.tsx`) — the inline panel collapses to a dead, non-interactive surface once a
  conversation starts, so the reply has to hand off somewhere interactive; (2) the FAB's
  visibility is `fabRevealed || messages.length > 0`, where `fabRevealed` is a session-only
  flag in the shared session (`src/hooks/useChatSession.ts`) that case study pages set on
  mount and that persists across navigation. Chat stays scoped to Home + case study pages
  only (per decisions.md 2026-07-18); do not render `MobileChatSurface` on About/Resume/
  Contact/404. See decisions.md 2026-07-19.

---

## Anti-Drift Checks

At the start of any conversation that continues work from a prior session,
Claude should:

1. Confirm which phase of the project is being worked on
2. Note any decisions from this file that are directly relevant
3. Ask if anything in this file needs to be updated before proceeding
4. Check if the current task should produce a documentation update
5. Check if any build-plan.md steps were completed since the last session
   and offer to check them off

If a conversation has been running long and scope has expanded, pause and ask:
*"Should any of what we've decided today be logged in decisions.md or
process-journal.md before we continue? And are there build-plan.md steps
to check off?"*

---

## Current Project Status

**Phase:** Per build-plan.md's Phase Status table (the authoritative live tracker —
this prose summary had drifted out of sync with it as of 2026-07-17 and was
resynced below): Phase 0 and 2 complete; Phase 3 (Storybook Foundation) complete
as of 2026-07-16, including deployment to system.viewbens.work; Phase 4 (Site
Assembly) in progress — 4A/4B/4C/4D/4F complete, 4E blocked on OG images (Ben);
Phase 5 (QA and Pre-Launch) in progress; Phase 1 (Sagent content, 1C) still not
started; Phases 6–7 not started. Per decisions.md 2026-07-16, launch is being
prioritized ahead of the Sagent case study — Sagent ships with placeholder copy
and gets a full pass post-launch.

**Last updated:** 2026-07-20 (in-chat "get in touch" contact flow shipped via Resend —
`api/contact.ts`, `api/lib/contact-limit.ts`, `api/lib/cors.ts`, `src/components/ContactCard/`;
`ALLOWED_ORIGINS` moved to the shared `api/lib/cors.ts`. New Ben-blocked item: Resend account
+ `viewbens.work` sending-domain verification. See decisions.md 2026-07-20.)

**Previously updated:** 2026-07-19 (hardening pass verified against real infra; temporary
`.vercel.app` origin allowlist added for pre-launch chat testing; chat widget readability
fix — see decisions.md 2026-07-19 entries and process-journal.md. Also resynced this
section against build-plan.md: removed a stale "choose homepage direction" next-step that
was actually decided 2026-06-22, and documented that `HomeV4Blend.tsx` — despite living
under `src/pages/explorations/` — is the real production homepage, not a draft)

**Completed:**
- Domain confirmed: viewbens.work (existing site stays live until launch)
- Repo name confirmed: bmax-portfolio
- Hosting confirmed: Vercel via GitHub
- Tech stack finalized
- NDA status confirmed: clear across all case studies
- Case study order finalized
- Market Rebellion dropped as standalone case study
- CLAUDE.md, key-insights.md, decisions.md, build-plan.md created
- Claude Project files updated with CLAUDE.md and key-insights.md
- GitHub repo created (bmax-portfolio, public)
- Vite + React + TypeScript scaffolded and confirmed building locally
- Vercel connected to repo and deploying successfully
- Project-level custom instructions (Claude Project settings) synced to
  match this file's case study order — Sagent at #3, Market Rebellion not
  listed as standalone (2026-06-14)
- Version A vs. Version B drafting methods stress-tested and compared
- Upfluent, USAA, and Sabre case studies all rewritten (2026-06-15) —
  Phase 1B complete
- Visual identity direction finalized — style references provided,
  palette locked, tokens written, wordmark locked (2026-06-17) — Phase 2 complete
- Storybook 8 installed and scaffolded (2026-06-17)
- Token foundations documented in Storybook (2026-06-17)
- src/tokens/tokens.css wired into Tailwind config (2026-06-17)
- Primitive components built with full Storybook stories: Button, NavBar,
  ChatInput, Input (Textarea via multiline prop), CaseStudyCard, Tag,
  StatusIndicator, Contact page component (2026-06-17–2026-06-19)
- Homepage.stories.tsx full-page layout template (split hero, work grid,
  docked rail, mobile viewport) (2026-06-19)
- FAB button for mobile chat continuity (2026-06-19)
- Claude Design Sessions 1 (wordmark), 2 (homepage layout), 3 (case study
  page layout) complete
- Page audit completed: all hardcoded colors tokenized, inline styles replaced
  with CSS class toggles, WCAG AA contrast fixed on tertiary text, iOS input
  zoom fixed, Button focus ring corrected, NavBar mobile padding added,
  Contact page buttons refactored to use shared Button component (2026-06-20)
  — see decisions.md 2026-06-20 for full reasoning
- AI chat backend created: api/chat.ts (Vercel Edge Function), api/lib/system-prompt.ts,
  api/lib/rate-limit.ts, .env.example, packages installed (2026-06-20) —
  Phase 4F partially complete; pending Anthropic Workspace + Upstash setup (Ben)
- Phase 3 scope reduced: Select, Icon wrapper, Link, Avatar, Container/Section/Grid/
  Divider, QuoteBlock, TimelineEntry, MobileMenu removed — not needed for current page
  set; three nav links fit at 390px without collapsing (2026-06-20)
- Phase 3A complete: Prettier (`.prettierrc` + prettier-plugin-tailwindcss installed,
  full formatting pass run), path alias `@/` → `src/` in tsconfig and vite.config (2026-06-20)
- Chat feature code complete (Phase 4F): useChatSession hook extracted to
  src/hooks/useChatSession.ts — deduplicates streamChat from both pages, surfaces
  API error messages (rate limit, session cap) as assistant messages (2026-06-20).
  Note: this entry originally said the client sends `sessionMessageCount` to
  "activate" the cap — superseded by the 2026-07-17 session-authority rewrite
  (client sends only `{message, pageContext}`; the cap is derived server-side
  from the `bmax_chat_sid` cookie, see api/lib/session.ts). Corrected 2026-07-18
  so this doesn't read as the current contract.
- About, Resume, and 404 page templates built with full Storybook stories (2026-06-20) —
  Phase 3F complete. Market Rebellion included as a brief mention in About career arc
  (decided 2026-06-20). Location confirmed as Dallas, Texas.
- Early career history added to About and Resume pages (2026-06-20): Aperia Solutions
  (May–Oct 2014), PeopleAnswers (Oct 2014–Mar 2015), AT&T (Mar–Oct 2015) — career arc
  now runs from 2014 to present. Resume updated to 9 roles; date-column width fixed
  (80px → 140px) to prevent overflow on longer date strings.
- README replaced: Vite boilerplate removed, replaced with intentional project README
  covering purpose, tech stack, structure, local setup, design system, and build docs
  (2026-06-20) — Phase 3A complete
- 3 homepage exploration variants built (Signal, Boot, Phosphor) as full React pages
  with shared animation hooks/data modules and Storybook stories in
  src/stories/explorations/ (2026-06-20). Direction decided 2026-06-20→22: HomeV4Blend
  (`src/pages/explorations/HomeV4Blend.tsx`) wired into `App.tsx` as the live production
  homepage (`/` and `/work`) — see build-plan.md Phase 4A. Despite the "explorations"
  path, this file is not a draft — it's the actual production homepage; edit it directly
  for any live-homepage change. `src/pages/HomePage.tsx` is retired (Storybook-only,
  the "Original" exploration story) and does not reflect production.
- docs/ai-component-guide.md created — 783-line authoritative component reference
  with decision tree, prop cheat sheets, composition patterns, and explicit
  out-of-scope list (2026-06-20)
- parameters.ai guidance blocks added to every Storybook story — each story now has
  guidance, contentRules, and avoid fields reflecting real design decisions (2026-06-20)
- 12 MDX documentation pages created for all 12 components — embedded canvas previews,
  do's/don'ts, ArgTable prop tables; Storybook now reads as public documentation
  (2026-06-20)
- WCAG AA accessibility audit — 7 fixes across 6 files (2026-06-22): Button focus ring
  corrected (#0e4a1e → #00e054, ~1.9:1 → ~10:1); CaseStudyPage skip link + labeled
  sidebar nav + 3 focus rings (sidebarLink, endTickNext, chatSuggestBtn); AboutPage
  footer moved outside main (contentinfo landmark); NavBar wordmark aria-label added;
  Contact new-tab sr-only announcements on LinkedIn link and OPEN PROFILE button.
  See decisions.md 2026-06-22.
- docs/ai-component-guide.md updated with Accessibility Patterns section (2026-06-22)
- React Router v6 installed; App.tsx rewritten with BrowserRouter and all 10 routes;
  vercel.json SPA rewrite rule added — Phase 4A complete (2026-06-22)
- src/content/ created with 5 typed CaseStudyContent objects: usaa.ts and upfluent.ts
  and sabre.ts (full content), sagent.ts and portfolio-rebuild.ts (placeholders) —
  Phase 4B complete (2026-06-22)
- Phase 4C complete: About and Resume pages already built as templates, now wired via
  routing (2026-06-22)
- Futuristic theme added — a second, user-selectable light sci-fi theme alongside the
  existing Retro (terminal) default, toggled via a Retro/Futuristic control in the NavBar
  and persisted to localStorage (2026-07-17). Token-driven — `[data-theme='futuristic']`
  override block in tokens.css (azure/gold palette, Space Grotesk display type, fine
  line-grid texture), no component logic changes beyond a few scoped CSS effect swaps
  (cursor blink → soft pulse, block caret → insertion bar). Every component and
  page-level Storybook story got a "Futuristic" story. See decisions.md 2026-07-17,
  including a mid-build contrast fix on the primary button and cursor/dot colors.
- Futuristic theme V2 push (2026-07-17) — cleaner, more overtly sci-fi second pass:
  grid background dropped to ~5% opacity, sharper near-square geometry, a consistent
  azure hairline HUD accent language (top rails, tick marks, docked-rail edges, solid
  chamfered index chips), and a `data-variant` hook on Button. All scoped to
  `[data-theme='futuristic']` — retro is unchanged. Enhanced Storybook stories relabeled
  "Futuristic V2". See decisions.md 2026-07-17 (second entry).
- Security/QA hardening pass on the AI chat backend (2026-07-18): closed a check-then-act
  race on both spend-relevant caps (session cap, global daily budget) by switching to
  atomic Redis INCR/DECR reservations in api/lib/session.ts; added a per-IP daily rate
  limit alongside the existing hourly one (api/lib/rate-limit.ts) so one visitor can't
  alone consume most of the shared daily budget; Redis failures on rate-limit/cap checks
  now fail closed (503) instead of an uncaught exception or silent fail-open; dropped the
  spoofable `x-forwarded-for` IP fallback; added a request-size guard. Enforced CSP
  (Content-Security-Policy, hash-based script-src) replacing the prior Report-Only header;
  added HSTS and asset cache-control headers to vercel.json. Enabled TypeScript `strict`
  mode across the whole project (tsconfig.app.json, tsconfig.node.json) and added a new
  tsconfig.api.json so api/ is actually type-checked by `npm run build` — it previously
  wasn't covered by either project reference. Added a client-side stream timeout and a
  double-submit guard to the chat widget (src/hooks/useChatSession.ts). See decisions.md
  2026-07-18 for the fail-closed and CSP-enforcement calls.
- Hardening pass verified against real Anthropic + Upstash traffic (2026-07-19) per
  `docs/testing/hardening-verification.md` — all runnable steps passed. Found and fixed two
  bugs in the verification tooling itself (not the product code): `scripts/verify-cap-
  atomicity.mjs` used `spawnSync('npx', ...)` without `shell: true`, which fails silently on
  Windows; `eslint.config.js` didn't ignore the gitignored `storybook-static/` build output,
  inflating local lint results. See decisions.md 2026-07-18 (second entry, dated the day
  after the hardening pass itself) and process-journal.md 2026-07-18.
- **TEMPORARY:** `https://bmax-portfolio.vercel.app` added to `ALLOWED_ORIGINS` in
  `api/chat.ts` (2026-07-19) so the chat widget works pre-launch on the `.vercel.app`
  deployment, since `viewbens.work` still serves the old site. **Remove this entry once
  viewbens.work is cut over to this Vercel project** — flagged in both a code comment above
  the array and decisions.md 2026-07-19.
- Chat widget readability fix (2026-07-19): assistant replies were rendering as one dense,
  small-font block on the live homepage. Root cause was `HomeV4Blend.tsx` never having
  adopted the `splitParagraphs()` paragraph-rendering helper that `HomePage.tsx` (retired)
  and `CaseStudyPage.tsx` already used — fixed by wiring it in there too. Also bumped
  `.msgAssistant` font-size to 18px (from 14px/15px) on both `HomeV4Blend.module.css` and
  `CaseStudyPage.module.css`, and rewrote `api/lib/system-prompt.ts`'s formatting guidance
  from a soft suggestion to a hard rule (default 2–4 sentences; never more than 3 sentences
  without a paragraph break), plus lowered `MAX_OUTPUT_TOKENS` (400 → 220) in `api/chat.ts`
  as a backstop. Verified against the real model by replaying the exact reported question.
  See decisions.md 2026-07-19.
- In-chat "get in touch" contact flow (2026-07-20): the assistant now surfaces an inline
  "SEND BEN A MESSAGE" form (Name optional, Email + Message required) in the chat log when
  `detectContactIntent()` — a client-side regex over both the visitor's message and the
  assistant's reply — matches. Submits to a new `api/contact.ts` Edge Function that emails
  ben@viewbens.work via Resend. Mirrors chat's abuse-prevention shape (origin allowlist,
  Redis rate limits, fail-closed 503) but on its own budget (`api/lib/contact-limit.ts`),
  plus a honeypot field removed from the accessibility tree and a minimum-fill-time check;
  both bot rejections return the same response a real send does, so a caller can't learn
  which check tripped. Origin allowlist extracted to the shared `api/lib/cors.ts`. Chose a
  structured form over conversational field collection, and a client-side regex over model
  tool-use — see decisions.md 2026-07-20 for both trade-offs. Verified in a real browser via
  Playwright; **live email delivery is still untested** pending Ben's Resend setup below.

**Immediate next steps:**
(Resynced 2026-07-19 — removed a stale "Ben to choose homepage direction" item: that was
decided 2026-06-22, HomeV4Blend wired as production per build-plan.md Phase 4A, but this
list was never updated when the decision was made. Also removed a stale "Ben's actions to
go live" item: build-plan.md Phase 4F shows the Anthropic Workspace and Upstash Redis were
both created 2026-07-16, and this session ran multiple verification scripts against real
`.env.local` credentials — that blocker was resolved days ago and never cleared here. Added
a new item below for removing the temporary `.vercel.app` origin allowlist entry at
cutover, added 2026-07-19. build-plan.md's checkboxes are the source of truth if this
drifts again.)
- **Ben — Resend setup (blocks the contact flow):** create a Resend account, verify the
  `viewbens.work` sending domain (add the DNS records Resend provides), and add
  `RESEND_API_KEY` to Vercel env vars. The contact form ships but **cannot send email until
  this is done**, and live delivery has never been tested. See `.env.example` and
  build-plan.md Phase 4F.
- **Phase 1C:** Sagent brain dump — strongest Director-level case study, starts from zero
- **Phase 4E:** OG images only — create 1200×630 PNGs in public/og/ before launch
  (meta descriptions, sitemap.xml, robots.txt, and canonical tags are already done;
  see build-plan.md 4E)
- **Real-device mobile testing:** the mobile chat overlay handoff, FAB behavior at 390px, and
  the ContactCard inside the mobile overlay have all only been verified via browser resize
  and Playwright — never on an actual device. Flagged in three consecutive journal entries
  (2026-07-19, 2026-07-19 later, 2026-07-20); still open in build-plan.md Phase 5.
- **At the viewbens.work domain cutover:** remove the temporary `https://bmax-portfolio.vercel.app`
  entry from `ALLOWED_ORIGINS` in `api/lib/cors.ts` (added 2026-07-19 for pre-launch testing,
  moved out of `api/chat.ts` 2026-07-20 — see the `TEMPORARY` code comment and decisions.md
  2026-07-19)

**Decisions still open:**
- Market Rebellion: referenced on About page as brief career arc item (decided 2026-06-20)
- Sagent case study content (to be built from scratch)
- "Fifteen years" / "15+ years" copy on About and Resume: career arc now starts May 2014,
  which is ~12 years to 2026 — decide whether to update copy to "twelve years", "over a
  decade", or leave it as a loose approximation

---

*This file should be treated as a living document. Update it when decisions
are made, not after the fact. If something in here is wrong or outdated, fix
it immediately — drift starts with stale instructions.*