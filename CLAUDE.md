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
last updated 2026-06-17. Contains: color primitives, semantic tokens, type scale,
letter spacing, line height, spacing, border radius, border shorthands, dot grid
surface, motion, and per-component font/color/tracking tokens.

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

**Phase:** 1 (content) + 2 (visual identity) + 3 (component foundations)
all active in parallel. Phase 2 substantially complete — visual identity
finalized, tokens written, one item remaining (wordmark asset). Phase 3
foundations complete — Storybook scaffolded, tokens wired, primitive shells
built. Claude Design sessions are the current critical path for layout direction
before component styling begins.

**Last updated:** 2026-06-17

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
- AI chat feature: architecture and safeguards plan drafted, core files
  written (api/chat.ts, system-prompt.ts, rate-limit.ts) (2026-06-15) — see
  decisions.md and build-plan.md Phase 4F
- Visual identity direction finalized — style references provided,
  palette locked, tokens written (2026-06-17) — Phase 2 substantially complete
- Storybook 8 installed and scaffolded (2026-06-17)
- Token foundations documented in Storybook (2026-06-17)
- src/tokens/tokens.css wired into Tailwind config (2026-06-17)
- Primitive component shells created (Button, NavBar, ChatInput,
  CaseStudyCard, Tag, StatusIndicator) with Storybook stories (2026-06-17)
- Commit tokens.css and doc updates to repo before first Claude Design session

**Immediate next steps:**
- Add usaa.md, upfluent.md, and sabre.md to repo at docs/case-studies/
- Log decisions.md entry: USAA draft method decision (2026-06-09)
- Log process-journal.md entry: USAA case study session (2026-06-09)
- Sagent brain dump in progress (parallel track, build-plan 1C)
- AI chat feature: see build-plan.md Phase 4F for setup steps (Anthropic
  Workspace + Upstash setup, commit files, build widget, deploy, tune)
- Claude Design Session 1: wordmark exploration (BM_, 3 directions)
- Claude Design Session 2: homepage layout (after wordmark locked)
- Claude Design Session 3: case study page layout
- Claude Design Session 4: component detail explorations

- Style primitive component shells once design explorations are locked (Phase 3)

**Decisions still open:**
- Market Rebellion: not a standalone case study (decided); whether/where to
  reference it elsewhere (e.g. About page) — still open
- Sagent case study content (to be built from scratch)

---

*This file should be treated as a living document. Update it when decisions
are made, not after the fact. If something in here is wrong or outdated, fix
it immediately — drift starts with stale instructions.*