# Portfolio Rebuild — Build Plan
*Living document. Update phase status and open items as the project progresses.*
*See decisions.md for the reasoning behind choices made here.*

---

## Project Overview

A ground-up portfolio rebuild for Ben Maxwell, targeting UX Principal and
Design Director roles. Built with React + Vite, Tailwind, ShadCN, and
Storybook 8. Hosted on Vercel via GitHub. The rebuild process itself is the
lead case study — documenting it as it happens is as important as building it.

**Live domain:** viewbens.work (existing site stays live until Phase 6)
**Repo:** bmax-portfolio (public from day one)
**Vercel:** Preview on vercel.app subdomain until launch cutover

---

## Case Study Order

1. Portfolio Rebuild with Claude ← lead case study
2. Upfluent
3. Sagent
4. USAA
5. Sabre

*Do not reorder without a documented reason in decisions.md.*

---

## Phase Status

| Phase | Name | Status | Blocked By |
|-------|------|--------|------------|
| 0 | Setup | Complete (2026-06-20) | — |
| 1 | Strategy and Content | In progress | — |
| 2 | Visual Identity | Complete (2026-06-17) | — |
| 3 | Storybook Foundation | In progress — all Layers complete; Storybook deploy (3G) remaining | — |
| 4 | Site Assembly | Not started | Phases 1 + 3 |
| 5 | QA and Pre-Launch | Not started | Phase 4 |
| 6 | Launch | Not started | Phase 5 |
| 7 | Meta Case Study | Not started | Phase 6 |

---

## Phase 0 — Setup
*In progress — one item remaining: visual style references (confirmed
still pending, 2026-06-15 — now the critical-path blocker)*

- [x] Add CLAUDE.md to Claude Project files
- [x] Add key-insights.md to Claude Project files
- [x] Screenshot key moments from initial analysis conversation
- [x] Create GitHub repo: bmax-portfolio (public)
- [x] Add CLAUDE.md to repo root
- [x] Create /docs/case-study/ directory with:
  - [x] key-insights.md
  - [x] decisions.md
  - [x] process-journal.md (write first entry)
  - [x] ai-prompts.md
- [x] Connect bmax-portfolio to Vercel (use vercel.app subdomain — do NOT
      re-point viewbens.work yet)
- [x] Fix Upfluent 401 on existing site
- [x] Fix resume date conflicts on existing site
- [x] Make Market Rebellion final disposition decision
- [x] Provide visual style references — provided (2026-06-17); unblocked Phase 2,
      which is now complete.
- [x] Finalize positioning statement wording

---

## Phase 1 — Strategy and Content
*Sagent runs as a parallel workstream — do not wait until others are done*

### 1A. Positioning
- [x] Write final positioning statement
- [x] Write expanded thesis (2-3 sentences for homepage)
- [x] Log in decisions.md when finalized

### 1B. Rewrite existing case studies
*Long form first. No layout decisions until content is written.*

Each case study follows this structure:
1. Problem (not project description)
2. Role clarity — explicit ownership statement
3. User context — who they are and why they're hard to design for
4. Process — methods used, with labeled artifacts
5. The key decision and why
6. What was hard or failed
7. Outcomes
8. What you'd do differently

- [x] Upfluent — rewritten (2026-06-15, per Ben)
- [x] USAA — rewritten (2026-06-15, per Ben; docs/case-studies/usaa.md).
      Note: Question 7 (what outlasted the project beyond metrics) was
      logged as open in CLAUDE.md as of 2026-06-09 — worth a quick check
      that this rewrite addressed it before treating it as fully final.
- [x] Sabre — drafted, rewritten, and approved (docs/case-studies/sabre.md)
      (2026-06-09)

### 1C. Sagent — build from scratch (parallel)
- [ ] Brain dump: problem, what you owned, what changed, what was hard
- [ ] Identify what artifacts exist (screens, photos, diagrams, data)
- [ ] Write problem statement
- [ ] Write role clarity statement (co-lead story, unexpected leadership
      departure, junior designer mentorship, strategic planning)
- [ ] Write full case study draft
- [ ] Log artifact gaps — what needs to be created or recreated

### 1D. Meta case study outline
*Outline only — full draft comes in Phase 7 after the site exists*
- [ ] Write section outline
- [ ] Identify screenshots and artifacts needed from the build process
- [ ] Set up screenshot habit during Phases 3-5

### 1E. Image audit — all case studies
Per case study, document:
- What exists and is usable as-is
- What needs annotation or recreation
- What is missing entirely and needs to be made

---

## Phase 2 — Visual Identity
*Complete (2026-06-17)*

- [x] Review style references (2026-06-17)
- [x] Define color palette (2026-06-17)
- [x] Define type scale (2026-06-17)
- [x] Define spacing scale (2026-06-17)
- [x] Define border radius, shadow, motion tokens (2026-06-17)
- [x] Document all tokens in reference sheet before writing any code (2026-06-17)
- [x] Log key identity decisions in decisions.md (2026-06-17)

---

## Phase 3 — Storybook Foundation
*Most of this phase depends on Phase 2 tokens. Basic tooling setup (3A,
first item) has started independently — see note.*

### 3A. Repo and tooling setup
- [x] Vite + React + TypeScript — scaffolded and confirmed building
      locally; Vercel deploy confirmed working (per CLAUDE.md, 2026-06-14).
      Note: this happened ahead of Phase 2/tokens, which is fine for bare
      scaffolding — the remaining 3A items below genuinely need tokens or
      a defined visual direction first.
- [x] Tailwind CSS with custom theme (tokens from Phase 2)
- [x] ShadCN initialization
- [x] Storybook 8 initialization
- [x] ESLint, Prettier, path aliases — all complete (2026-06-20): ESLint (`eslint.config.js`), Prettier (`.prettierrc` + prettier-plugin-tailwindcss), path alias `@/` → `src/` in tsconfig and vite.config
- [x] README written (public repo — make it intentional) (2026-06-20): replaced Vite boilerplate with project-specific README covering purpose, tech stack, project structure, local setup, design system, and build documentation

### 3B. Layer 1 — Token system
- [x] CSS custom properties in /src/tokens/
- [x] Tailwind config extending default scale with custom tokens
- [x] Storybook Foundations section:
  - [x] Color table (legible to non-developers)
  - [x] Typography table
  - [x] Spacing table
  - [x] Motion table

### 3C. Layer 2 — Primitive components
Each component requires: Default story + all meaningful state stories.
Story descriptions explain design decisions, not just props.
- [x] Button (primary, secondary, ghost, destructive + all states) (2026-06-17)
- [x] Input / Textarea (Input component with multiline prop covers Textarea; full stories) (2026-06-19)
- ~~Select~~ — removed from scope 2026-06-20 (not needed for current page set)
- [x] Badge, Tag (2026-06-17)
- ~~Icon wrapper, Link, Avatar~~ — removed from scope 2026-06-20 (not needed for current page set)

### 3D. Layer 3 — Layout components
- ~~Container, Section, Grid, Divider~~ — removed from scope 2026-06-20 (not needed for current page set; layout handled by page-level CSS)

### 3E. Layer 4 — Portfolio-specific components
- [x] CaseStudyCard (homepage thumbnail) (2026-06-17)
- [x] CaseStudyHero (hero header: number, date range, title, subtitle, meta grid) (2026-06-19)
- [x] StatBlock (outcome stat cell with value, label, optional body; StatGrid wrapper) (2026-06-19)
- [x] ProcessStep (numbered process card with phase, title, body, artifact tag; ProcessSteps wrapper) (2026-06-19)
- [x] ImageCaption (terminal-chrome image frame with tab label, dot-grid placeholder, caption) (2026-06-19)
- [x] RoleCallout (role ownership row with fixed label column; RoleCallouts wrapper) (2026-06-19)
- ~~QuoteBlock, TimelineEntry~~ — removed from scope 2026-06-20 (not needed for current page set)
- [x] NavBar shell — desktop only (2026-06-17)
- ~~MobileMenu~~ — removed from scope 2026-06-20; three nav links fit at 390px without collapsing
- [x] ChatInput (2026-06-17)
- [x] StatusIndicator (2026-06-17)
- [x] Contact page component (email + LinkedIn channels, receipt strip, copy actions) (2026-06-19)

### 3F. Layer 5 — Page templates
- [x] Home (Homepage.stories.tsx — split hero, work grid, docked rail, mobile viewport) (2026-06-19)
- [x] Case Study (CaseStudyPage.tsx — sidebar TOC, scroll progress, 8 sections, artifact inset, outcome grid, docked chat) (2026-06-19)
- [x] About (AboutPage.tsx — intro, approach, leadership, career arc incl. Market Rebellion, what I'm looking for; footer) (2026-06-20)
- [x] Resume (ResumePage.tsx — designed header, 6-role experience list with outcome bullets, 4-column skills grid) (2026-06-20)
- [x] 404 (NotFoundPage.tsx — terminal-themed shell error, link back home) (2026-06-20)
Each documented as a full-page Storybook story.

### 3G. Storybook deployment
- [ ] Deploy to separate Vercel project
- [ ] Configure subdomain (e.g. system.viewbens.work)
- [ ] Verify public accessibility

---

## Phase 4 — Site Assembly
*Depends on Phase 3 components and Phase 1 content*

### 4A. Page shells
- [ ] Home
- [ ] Case Study template
- [ ] About
- [ ] Resume
- [ ] 404

### 4B. Case study content integration
- [ ] Portfolio Rebuild (placeholder — full content in Phase 7)
- [ ] Upfluent
- [ ] Sagent
- [ ] USAA
- [ ] Sabre

### 4C. Supporting pages
- [ ] About page (leadership narrative, career arc, what you're looking for)
- [ ] Resume page (designed — not a wall of text)

### 4D. Responsive QA (ongoing throughout Phase 4)
*Test on real devices as you build. Mobile is not an afterthought.*
- Full-width desktop (1440px+)
- Standard desktop (1280px)
- Tablet (768px)
- Mobile (390px)

### 4E. SEO foundations
- [ ] Unique meta description per page
- [ ] OG image per case study
- [ ] sitemap.xml
- [ ] Canonical tags pointing to viewbens.work
- [ ] robots.txt

### 4F. AI Chat Feature
*Live AI assistant on the portfolio — see decisions.md, 2026-06-15.
Backend setup does not depend on Phase 2/3 visual tokens and can start
independently; only the widget's visual styling depends on those.*

- [x] Architecture and safeguards plan drafted: Edge Function proxy,
      Haiku 4.5, system prompt, Upstash rate limiting, dedicated Anthropic
      Workspace with spend limit (2026-06-15)
- [x] FAB button — mobile floating chat button for continuity between
      homepage hero and docked rail (2026-06-19)
- [ ] Create dedicated Anthropic Workspace + API key, set spend limit and
      email alert
- [ ] Create Upstash Redis database, add REST credentials to Vercel env
- [x] Install @upstash/ratelimit and @upstash/redis (2026-06-20)
- [x] Commit api/chat.ts, api/lib/system-prompt.ts, api/lib/rate-limit.ts
      to repo (2026-06-20)
- ~~Replace [CONTACT_LINK] placeholders~~ — not applicable; system-prompt.ts used real email (ben@viewbens.work) from the start
- [x] Build frontend chat widget — UI was already built in both pages; extracted shared useChatSession hook, wired sessionMessageCount so server-side session cap actually fires, surfaced API error messages to the user (2026-06-20)
- [ ] Deploy to Vercel, test endpoint with curl
- [ ] Tune rate limits / caps against real traffic
- [ ] Update system-prompt.ts as Upfluent, USAA, and Sagent case studies
      are finalized (ongoing — revisit each time a case study moves to
      "published")

---

## Phase 5 — QA and Pre-Launch
*Before re-pointing the domain*

- [ ] Lighthouse audit — targets: 90+ performance, 100 accessibility
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile device testing (real devices, not just browser resize)
- [ ] Image optimization: WebP format, lazy loading, proper srcset
- [ ] Accessibility audit: keyboard navigation, screen reader, color contrast
- [ ] All internal links resolve correctly
- [ ] All case study images load at correct sizes
- [ ] No console errors
- [ ] Typography renders correctly across browsers
- [ ] Dark mode works across all pages and components

---

## Phase 6 — Launch

- [ ] Re-point viewbens.work DNS to new Vercel project
- [ ] Verify SSL certificate is active
- [ ] Verify all routes resolve (no 404s on direct URL access)
- [ ] Smoke test every page and case study
- [ ] Verify Storybook subdomain is live
- [ ] Submit sitemap to Google Search Console
- [ ] Write process-journal.md launch entry

---

## Phase 7 — Meta Case Study
*Written after launch — the site is the proof*

- [ ] Write full case study draft using process-journal and key-insights
      as source material
- [ ] Integrate build process screenshots captured during Phases 3-5
- [ ] Write "What Claude couldn't do" section explicitly
  - Positioning statement
  - Visual identity direction
  - Which work to lead with
  - What to leave out of each case study
  - The decision to use this project as lead case study
- [ ] Write "What failed or was redirected" section
- [ ] Before/after comparison (existing site vs. rebuilt site)
- [ ] Publish and replace Phase 4 placeholder
- [ ] Write final process-journal.md entry

---

## Critical Path

**Visual style references** — resolved (Phase 2 complete, 2026-06-17). No longer blocking.

**Sagent content** — your strongest Director-level evidence. Starts from
zero. Must run in parallel with other Phase 1 work or it becomes the
last thing written and the first thing that gets rushed. Still open.

**Remaining Phase 3 blocker before Phase 4 can start:**
- Storybook deploy (3G) — all Layers and tooling complete; deploy is the last gate

All component layers, page templates, tooling (Prettier, path aliases), and README are complete as of 2026-06-20.

---

## Ongoing Commitments Throughout All Phases

- **process-journal.md:** Updated at the end of every working session
- **decisions.md:** Updated whenever a significant choice is made
- **Screenshot habit:** Capture key Claude conversation moments as they happen
- **Commit messages:** Meaningful and readable — the repo is a portfolio artifact
- **CLAUDE.md:** Updated when decisions change — drift starts with stale instructions

---

*Last updated: 2026-06-20 — About, Resume, and 404 page templates built (3F
complete); README replaced with intentional project README (3A complete); Phase
0 marked complete; Phase 3 status updated — only Storybook deploy (3G) remaining.*
*See also: decisions.md — significant choices and reasoning*
*See also: key-insights.md — strategic insights from initial analysis*
*See also: process-journal.md — running build log*