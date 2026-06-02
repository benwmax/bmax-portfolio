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
| 0 | Setup | Complete | — |
| 1 | Strategy and Content | Not started | — |
| 2 | Visual Identity | Not started | Style references |
| 3 | Storybook Foundation | Not started | Phase 2 |
| 4 | Site Assembly | Not started | Phases 1 + 3 |
| 5 | QA and Pre-Launch | Not started | Phase 4 |
| 6 | Launch | Not started | Phase 5 |
| 7 | Meta Case Study | Not started | Phase 6 |

---

## Phase 0 — Setup
*Complete*

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
- [x] Provide visual style references (unblocks Phase 2)
- [x] Finalize positioning statement wording

---

## Phase 1 — Strategy and Content
*Sagent runs as a parallel workstream — do not wait until others are done*

### 1A. Positioning
- [ ] Write final positioning statement
- [ ] Write expanded thesis (2-3 sentences for homepage)
- [ ] Log in decisions.md when finalized

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

- [ ] Upfluent (highest priority — most differentiated, most recent)
- [ ] USAA
- [ ] Sabre

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
*Blocked until style references are provided*

- [ ] Review style references
- [ ] Define color palette
  - Primary, secondary, accent
  - Semantic tokens: surface, text, border, interactive states
  - Dark mode variants (required — build in from day one, not retrofitted)
- [ ] Define type scale
  - Font selection (variable font or deliberate pairing)
  - Size scale, weight, line height, letter spacing tokens
- [ ] Define spacing scale
- [ ] Define border radius, shadow, motion tokens
- [ ] Create wordmark / identity mark
- [ ] Document all tokens in reference sheet before writing any code
- [ ] Log key identity decisions in decisions.md

---

## Phase 3 — Storybook Foundation
*Depends on Phase 2. Build in layers — do not skip ahead.*

### 3A. Repo and tooling setup
- [ ] Vite + React + TypeScript
- [ ] Tailwind CSS with custom theme (tokens from Phase 2)
- [ ] ShadCN initialization
- [ ] Storybook 8 initialization
- [ ] ESLint, Prettier, path aliases
- [ ] README written (public repo — make it intentional)

### 3B. Layer 1 — Token system
- [ ] CSS custom properties in /src/tokens/
- [ ] Tailwind config extending default scale with custom tokens
- [ ] Storybook Foundations section:
  - Color table (legible to non-developers)
  - Typography table
  - Spacing table
  - Motion table

### 3C. Layer 2 — Primitive components
Each component requires: Default story + all meaningful state stories.
Story descriptions explain design decisions, not just props.
- [ ] Button (primary, secondary, ghost, destructive + all states)
- [ ] Input, Textarea, Select
- [ ] Badge, Tag
- [ ] Icon wrapper
- [ ] Link
- [ ] Avatar

### 3D. Layer 3 — Layout components
- [ ] Container (max-width + responsive padding)
- [ ] Section (vertical rhythm)
- [ ] Grid (flexible layout primitive)
- [ ] Divider

### 3E. Layer 4 — Portfolio-specific components
- [ ] CaseStudyCard (homepage thumbnail)
- [ ] CaseStudyHero (full-bleed header with title, company, outcome stat)
- [ ] StatBlock (big number + label — outcomes deserve visual treatment)
- [ ] ProcessStep (research/design methodology in sequence)
- [ ] ImageCaption (image + label — fixes unlabeled artifact problem)
- [ ] RoleCallout (styled block: "My role: X. Team: Y.")
- [ ] QuoteBlock (standout outcomes or stakeholder feedback)
- [ ] TimelineEntry (resume/experience page)
- [ ] NavBar + MobileMenu

### 3F. Layer 5 — Page templates
- [ ] Home
- [ ] Case Study
- [ ] About / Resume
- [ ] 404
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

The two items with the most downstream dependencies:

**Visual style references** — unblocks Phase 2, which unblocks Phase 3,
which unblocks Phase 4. Everything waits on this.

**Sagent content** — your strongest Director-level evidence. Starts from
zero. Must run in parallel with other Phase 1 work or it becomes the
last thing written and the first thing that gets rushed.

---

## Ongoing Commitments Throughout All Phases

- **process-journal.md:** Updated at the end of every working session
- **decisions.md:** Updated whenever a significant choice is made
- **Screenshot habit:** Capture key Claude conversation moments as they happen
- **Commit messages:** Meaningful and readable — the repo is a portfolio artifact
- **CLAUDE.md:** Updated when decisions change — drift starts with stale instructions

---

*Last updated: 2026-06-02 — Phase 0 complete*
*See also: decisions.md — significant choices and reasoning*
*See also: key-insights.md — strategic insights from initial analysis*
*See also: process-journal.md — running build log*
