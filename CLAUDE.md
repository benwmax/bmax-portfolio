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
- `api/chat.ts` — endpoint: validation, rate limiting, history truncation,
  session cap, streamed response
- `api/lib/system-prompt.ts` — the assistant's brief (positioning, case study
  summaries, tone, scope)
- `api/lib/rate-limit.ts` — per-IP rate limiting via Upstash Redis
- `.env.example` — required environment variables

**Key constraints:**
- The Anthropic API key lives in a dedicated Workspace with its own monthly
  spend limit and email alert — never reuse a key from another workspace for
  this feature. This is the hard ceiling on cost.
- `api/lib/system-prompt.ts` is the assistant's brief and needs upkeep —
  update it whenever a case study moves from "in progress" to "published" so
  the assistant doesn't undersell or misstate finished work. As of
  2026-06-15, Upfluent, USAA, and Sabre have all been rewritten and the
  system prompt's "still being finalized" language for those is now stale.
- Safeguard values (rate limits, session message cap, output token cap,
  history length, message length cap) live as named constants at the top of
  `api/chat.ts` — tune there, not inline.
- The widget's visual styling depends on Phase 2/3 tokens; the backend does
  not and can proceed independently.

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

**Phase:** 1C (Sagent content), 3G (Storybook deploy), and 4 (site assembly) active
in parallel. Phase 2 complete. Phase 4A/4B/4C complete — routing wired, all case
study content files created, supporting pages live. 4D (responsive QA), 4E (SEO),
and 4F (AI chat deploy) remaining. Accessibility audit done early as Phase 5 pre-work.
Design Sessions 1–3 complete; Session 4 next.

**Last updated:** 2026-06-22 (WCAG AA accessibility audit + routing + case study content files)

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
  src/hooks/useChatSession.ts — deduplicates streamChat from both pages, sends
  sessionMessageCount with every request (activates server-side session cap), surfaces
  API error messages (rate limit, session cap) as assistant messages (2026-06-20)
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
  src/stories/explorations/ — awaiting Ben's direction decision (2026-06-20)
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

**Immediate next steps:**
- **Ben's actions to go live:** Create Anthropic Workspace + API key and Upstash Redis
  database, add all three env vars to Vercel — chat is fully wired, blocked only on these
- **Ben to choose homepage direction:** Signal / Boot / Phosphor — all three are in
  Storybook Explorations section for side-by-side comparison
- **Phase 1C:** Sagent brain dump — strongest Director-level case study, starts from zero
- **Phase 3G:** Deploy Storybook to separate Vercel project on system.viewbens.work
- **Phase 4D:** Responsive QA at 1440/1280/768/390px
- **Phase 4E:** SEO foundations (meta descriptions, OG images, sitemap.xml, robots.txt,
  canonical tags)
- **Phase 4F:** Deploy AI chat to Vercel and test — blocked on Ben's env var setup

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