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

**Positioning statement (working):**
> I make expert-level tools learnable — for agents, adjusters, attorneys, and
> traders who can't afford to get it wrong.

**Expanded thesis:**
Ben makes expert-user tools learnable without making them less powerful, across
regulated, high-stakes industries — travel, insurance, fintech, mortgage.

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
├── docs/
│   └── case-study/
│       ├── key-insights.md          ← curated moments from AI analysis
│       ├── decisions.md             ← significant choices + reasoning
│       ├── process-journal.md       ← running dated build log
│       ├── ai-prompts.md            ← prompts that produced useful output
│       └── screenshots/             ← key conversation and process screenshots
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

---

## Visual Identity Principles
*(Update this section when style references are reviewed and tokens are decided)*

- Dark mode support is required from day one — build into token layer, not
  retrofitted
- Tokens use CSS custom properties mapped to Tailwind config
- ShadCN is a primitive foundation — custom components are the system
- Visual identity should signal: financial/enterprise credibility +
  technical fluency + individual craft (not generic AI aesthetic)
- Type scale: TBD pending style references
- Color palette: TBD pending style references

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

## Anti-Drift Checks

At the start of any conversation that continues work from a prior session,
Claude should:

1. Confirm which phase of the project is being worked on
2. Note any decisions from this file that are directly relevant
3. Ask if anything in this file needs to be updated before proceeding
4. Check if the current task should produce a documentation update

If a conversation has been running long and scope has expanded, pause and ask:
*"Should any of what we've decided today be logged in decisions.md or
process-journal.md before we continue?"*

---

## Current Project Status

**Phase:** 0 — Setup and documentation
**Last updated:** 2026-06-01

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

**Immediate next steps:**
- Screenshot key moments from initial analysis conversation
- Write first process-journal.md entry
- Provide visual style references (unblocks Phase 2)
- Finalize positioning statement wording
- Make Market Rebellion final disposition decision
- Fix Upfluent 401 on existing site
- Fix resume date conflicts on existing site

**Decisions still open:**
- Visual identity direction (pending style references)
- Final positioning statement wording
- Market Rebellion disposition (drop entirely or reference somewhere)
- Sagent case study content (to be built from scratch in Phase 1)

---

*This file should be treated as a living document. Update it when decisions
are made, not after the fact. If something in here is wrong or outdated, fix
it immediately — drift starts with stale instructions.*