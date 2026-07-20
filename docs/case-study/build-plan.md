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
| 3 | Storybook Foundation | Complete (2026-07-16) | — |
| 4 | Site Assembly | In progress — 4A/4B/4C/4D/4F complete; 4E blocked on OG images (Ben) | — |
| 5 | QA and Pre-Launch | In progress — Lighthouse/cross-browser/a11y/links/console/typography/dark-mode all complete; real-device testing and image checks (blocked on Phase 1E) remain | — |
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

### 2A. Futuristic theme (post-completion addition, 2026-07-17)
*Second user-selectable theme, added after Phase 2 shipped. See decisions.md
2026-07-17 for full reasoning and palette.*

- [x] Research clean, light sci-fi UI references (2026-07-17)
- [x] Define `[data-theme='futuristic']` token override block in tokens.css —
      azure/gold palette, Space Grotesk display type, fine line-grid texture (2026-07-17)
- [x] Fix light-theme contrast: primary buttons (Button + ChatInput ASK) moved
      to a solid azure fill; darkened green-bright/green-light so cursor dots,
      hover text, and the Tag "green" variant clear 4.5:1 / 3:1 (2026-07-17)
- [x] Build `useTheme` hook + `ThemeToggle` component; wired into NavBar top
      right on every page, default Retro, persisted to localStorage, applied
      pre-paint via an inline script in index.html (2026-07-17)
- [x] Restyle every component and page for the futuristic theme — token-driven,
      plus scoped CSS for the handful of effects that aren't colors (cursor
      blink → soft pulse or static dot, block caret → insertion bar) (2026-07-17)
- [x] Add one "Futuristic" story per component and per page-level story in
      Storybook, named explicitly rather than tied to the Storybook theme
      switcher (2026-07-17)
- [x] Verify: production build, Storybook build, and full-page screenshots of
      both themes across Home/Case Study/About/Contact/404 at desktop and
      390px mobile (2026-07-17)

#### 2A.1 — Futuristic V2 push (2026-07-17)
*Second pass to make the theme read as cleaner/more overtly sci-fi, changing
component/element treatments (not just tokens). Enhanced Storybook stories
labeled "Futuristic V2". See decisions.md 2026-07-17 (second entry).*

- [x] Drop the futuristic grid background to ~5% opacity (`--color-bg-dot` →
      `rgba(23,34,44,0.05)`, cells 28→32px) (2026-07-17)
- [x] Sharpen futuristic geometry theme-wide (radii → 0–2px; pill radius kept
      for the toggle/status pills) (2026-07-17)
- [x] Add crisp azure hairline HUD accents: NavBar underline gradient, 2px
      azure top rail on cards/chat panels/404 shell/contact channels, docked-rail
      accent edge, inset azure edge on the active chat field, leading azure ticks
      on section/work kickers (2026-07-17)
- [x] Solid HUD chips: azure index/channel numbers with chamfered corner; squared
      status badge with a solid azure marker square (2026-07-17)
- [x] Add `data-variant` hook to Button for per-variant theme refinement; focus
      rings kept on the utility layer so theme CSS never clips them (2026-07-17)
- [x] Relabel every Futuristic Storybook story to "Futuristic V2" (18 stories);
      verify site build + Storybook build + re-screenshot both themes (2026-07-17)

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
- [x] About (AboutPage.tsx — intro, approach, leadership, career arc incl. Market Rebellion, what I'm looking for; footer) (2026-06-20); career arc extended to include Aperia Solutions, PeopleAnswers, and AT&T (early roles, 2014–15) (2026-06-20)
- [x] Resume (ResumePage.tsx — designed header, 9-role experience list with outcome bullets, 4-column skills grid; date-column width fixed from 80px → 140px to prevent overflow on longer date strings) (2026-06-20)
- [x] 404 (NotFoundPage.tsx — terminal-themed shell error, link back home) (2026-06-20)
Each documented as a full-page Storybook story.

### 3G. Storybook deployment
- [x] Deploy to separate Vercel project (2026-07-16) — bmax-portfolio-storybook;
      required fixing the Build Command override (Vercel was silently running the
      main app's `npm run build` instead of `npm run build-storybook`)
- [x] Configure subdomain (2026-07-16) — system.viewbens.work live, verified 200 OK over HTTPS
- [x] Verify public accessibility (2026-07-16) — 200 OK, deployment protection disabled
      (intentionally, unlike the main site — Storybook is meant to be public per CLAUDE.md)

---

## Phase 4 — Site Assembly
*Depends on Phase 3 components and Phase 1 content*

### 4A. Page shells
- [x] Home — HomeV4Blend wired as production homepage per Ben's direction (2026-06-22)
- [x] Case Study template (2026-06-22)
- [x] About (2026-06-22)
- [x] Resume (2026-06-22)
- [x] 404 (2026-06-22)

### 4B. Case study content integration
- [x] Portfolio Rebuild (placeholder — full content in Phase 7) (2026-06-22)
- [x] Upfluent (2026-06-22)
- [x] Sagent (placeholder — full draft blocked on Phase 1C brain dump) (2026-06-22)
- [x] USAA (2026-06-22)
- [x] Sabre (2026-06-22)

### 4C. Supporting pages
- [x] About page (leadership narrative, career arc, what you're looking for) (2026-06-22)
- [x] Resume page (designed — not a wall of text) (2026-06-22)

### 4D. Responsive QA (ongoing throughout Phase 4)
*Test on real devices as you build. Mobile is not an afterthought.*
- Full-width desktop (1440px+)
- Standard desktop (1280px)
- Tablet (768px)
- Mobile (390px)
CSS audit complete (2026-06-22): all pages have responsive breakpoints; fixed missing flex-wrap on AboutPage footer (was inconsistent with homepage footer). Real-device test still needed.
Mid-width bug found and fixed (2026-07-17): at viewport widths where the two-column hero grid
is still active but has narrowed (~1000-1200px, before the 960px single-column collapse), the
"tools learnable" span in the h1 was forced `white-space: nowrap`, so it visibly overflowed
past the hero column and clipped behind the chat panel instead of wrapping. Removed the forced
nowrap — text now wraps naturally at every width. Fixing that surfaced a second bug (the
ChatInput character counter overlapping the placeholder text on an empty field) and reintroduced
CLS at the widths where the headline now wraps to 3-4 lines instead of 2 — see decisions/journal
for both. Re-verified: no overflow at any width 390-1440px, CLS <0.03 everywhere (was up to 0.58
mid-fix), Lighthouse Home still 96/100/100/100 after all three fixes.
Homepage hero layout tweak per Ben's screenshot feedback (2026-07-17): two-column breakpoint
raised 960px→1100px (was squeezing into two cramped columns at tablet widths instead of using
the full-width single-column stack); stat row (15+ yrs, $1B, etc.) reordered to appear after
the chat panel, not before, in the mobile/tablet single-column layout via CSS grid-template-areas
(desktop two-column arrangement unchanged). Re-verified CLS <0.03 and Lighthouse 96/100/100/100
still hold after this change.
Automated pass complete (2026-07-16): Playwright headless check across all 10 routes ×
1440/768/390px. Found and fixed a horizontal-overflow bug on /contact at 390px (unbreakable
email/URL strings in `.cardAddress` forcing card width past viewport — added `word-break:
break-word`). All routes now clean at all three widths. Real physical-device test still needed.

### 4E. SEO foundations
- [x] Unique meta description per page — react-helmet-async installed; Helmet added to all 8 pages (2026-06-22)
- [ ] OG image per case study — tags wired to /og/{slug}.png; create 1200×630 PNGs in public/og/ before launch
- [x] sitemap.xml — public/sitemap.xml created (2026-06-22)
- [x] Canonical tags pointing to viewbens.work — set via Helmet in each page (2026-06-22)
- [x] robots.txt — public/robots.txt created (2026-06-22)

### 4F. AI Chat Feature
*Live AI assistant on the portfolio — see decisions.md, 2026-06-15.
Backend setup does not depend on Phase 2/3 visual tokens and can start
independently; only the widget's visual styling depends on those.*

- [x] Architecture and safeguards plan drafted: Edge Function proxy,
      Haiku 4.5, system prompt, Upstash rate limiting, dedicated Anthropic
      Workspace with spend limit (2026-06-15)
- [x] FAB button — mobile floating chat button for continuity between
      homepage hero and docked rail (2026-06-19)
- [x] Create dedicated Anthropic Workspace + API key, set spend limit and
      email alert (2026-07-16)
- [x] Create Upstash Redis database, add REST credentials to Vercel env (2026-07-16)
- [x] Install @upstash/ratelimit and @upstash/redis (2026-06-20)
- [x] Commit api/chat.ts, api/lib/system-prompt.ts, api/lib/rate-limit.ts
      to repo (2026-06-20)
- ~~Replace [CONTACT_LINK] placeholders~~ — not applicable; system-prompt.ts used real email (ben@viewbens.work) from the start
- [x] Build frontend chat widget — UI was already built in both pages; extracted shared useChatSession hook, wired sessionMessageCount so server-side session cap actually fires, surfaced API error messages to the user (2026-06-20)
- [x] Deploy to Vercel, test endpoint with curl (2026-07-16) — verified 200 OK with streamed response after fixing a quoted-string bug in UPSTASH_REDIS_REST_URL
- [x] Abuse-prevention hardening pass (2026-07-17) — system-prompt safety clauses,
      server-side session authority (closes a fabricated-history jailbreak vector),
      real CORS enforcement, x-real-ip fix, global daily budget circuit breaker,
      security headers + CSP (report-only) in vercel.json, structured request
      logging. See decisions.md, 2026-07-17.
- [x] Verified the hardening pass against real Redis/Anthropic (2026-07-17) — added
      `scripts/verify-chat-safeguards.mjs` (drives api/chat.ts's handler directly with
      real credentials, no vercel dev needed). All checks passed: CORS rejection,
      session-cookie issuance, cross-turn history via server-side session, the
      fabricated-history injection attempt correctly ignored, all 4 jailbreak/persona
      probes declined cleanly, invalid-input handling. Rate-limit and session-cap
      boundary tests intentionally skipped (would cost ~50 real model calls) — the
      underlying Redis session mechanism they'd exercise is already proven working
      by the other checks.
- [x] Chat conversation persists across Home ⇄ Case Study navigation (2026-07-18) —
      shared ChatProvider context, once-per-session context note on landing on a case
      study, model informed of current page via a server-allowlisted pageContext field.
      Found and fixed two unrelated bugs along the way: NavBar/CaseStudyCard/"Next case"
      were plain `<a>` tags causing hard reloads (now React Router `Link`); Sabre was
      missing from the homepage work grid entirely. See decisions.md, 2026-07-18.
- [x] Move inline theme script to a nonce/hash and switch CSP from report-only to enforcing
      (2026-07-18) — done via a precomputed sha256 hash on the inline script rather than a
      nonce (Vercel's static headers can't inject a per-request nonce); see decisions.md
      2026-07-18 and `docs/testing/hardening-verification.md` Step 2 for the verification
      method (recompute the hash from `dist/index.html` and diff against `vercel.json`).
- [ ] Retune GLOBAL_DAILY_MESSAGE_CAP once the real Anthropic Workspace spend cap is known
- [ ] Tune rate limits / caps against real traffic
- [ ] Update system-prompt.ts as Upfluent, USAA, and Sagent case studies
      are finalized (ongoing — revisit each time a case study moves to
      "published")
- [x] In-chat "get in touch" contact flow (2026-07-20) — `api/contact.ts` (new Edge
      Function, mirrors chat.ts's origin/rate-limit/fail-closed pattern), `api/lib/
      contact-limit.ts` (own per-IP + global-daily Redis budget), `api/lib/cors.ts`
      (origin allowlist extracted so chat.ts and contact.ts share one list). Client
      side: `ContactCard` component (Name/Email/Message, honeypot + fill-time anti-bot
      signals), wired into `useChatSession`'s client-side `detectContactIntent` check
      (runs against both the visitor's message and the assistant's reply) and rendered
      inline in the chat log on Home + case study pages. Sends via Resend. See
      decisions.md, 2026-07-20.
- [ ] **Ben:** create a Resend account, verify the viewbens.work sending domain, add
      `RESEND_API_KEY` to Vercel env vars (see .env.example) — the contact form can't
      actually send email until this is done

---

## Phase 5 — QA and Pre-Launch
*Before re-pointing the domain*

- [x] Lighthouse audit — targets: 90+ performance, 100 accessibility (2026-07-16) — ran against
      the production build across all 9 routes. Final: performance 96–98, accessibility 100,
      best-practices 100, SEO 100 on every route. Three real bugs found and fixed along the way:
      (1) CLS 0.201→~0.01 on Home — the h1 typewriter effect wrapped from 1 line to 2 lines
      mid-typing because `.heroH1` only reserved `min-height` for one line, pushing the lede and
      chat panel down each time; now reserves 2 lines up front. (2) Accessibility 96→100 on
      About — inline prose links relied on color alone to stand out from surrounding text (WCAG
      1.4.1); added a permanent underline. Also fixed the NavBar wordmark's `aria-label="Ben
      Maxwell – Home"` not containing its visible text "BM_" (WCAG 2.5.3, breaks voice-control
      activation) — changed to `"BM_ — Ben Maxwell, Home"`. (3) SEO 92→100 on case study pages —
      index.html had a static canonical tag AND react-helmet-async was injecting a per-page one,
      producing two conflicting canonical URLs; removed the static one since every page already
      sets its own via Helmet. Also found and fixed the root font-loading setup: fonts were
      loaded via a blocking `@import` in index.css instead of a `<link>` in index.html (as
      tokens.css's own header comment specified but was never actually wired up) — moved to
      index.html for earlier discovery.
- [x] Cross-browser testing (Chrome, Safari, Firefox, Edge) (2026-07-16) — automated pass via
      Playwright across Chromium (Chrome/Edge engine), Firefox, and WebKit (Safari engine): all
      9 routes × 3 engines, 200 status, zero console errors, zero horizontal overflow, identical
      dark-theme background everywhere. Visual screenshot spot-check on Home confirmed consistent
      fonts/layout/color across engines. Not a substitute for real Safari-on-macOS/iOS testing —
      WebKit-the-engine and Safari-the-browser can still diverge in ways this doesn't catch.
- [ ] Mobile device testing (real devices, not just browser resize) — still open, but one
      real-device mobile bug was caught and fixed 2026-07-19: sending a message from the
      homepage's inline chat container on mobile left the reply streaming into a hidden,
      non-interactive panel while the "Ask Ben" FAB overlapped it. Fixed by handing off to
      the full-screen overlay on first submit and sharing the FAB/overlay across Home + case
      study pages via `src/components/MobileChatSurface.tsx` (case study pages had no mobile
      chat entry before this). See decisions.md 2026-07-19. Systematic real-device testing
      across the whole site is still needed.
- [ ] Image optimization: WebP format, lazy loading, proper srcset — blocked: no real case study
      images exist in content yet (all five `src/content/*.ts` files have zero image refs) —
      this is really gated on Phase 1E (image audit), not a QA task
- [x] Accessibility audit: keyboard navigation, screen reader, color contrast (2026-06-22 — 7 fixes across 6 files; see decisions.md 2026-06-22)
- [x] All internal links resolve correctly (2026-07-16) — found `/contact` was linked from
      every page's NavBar but never wired into App.tsx's routes (404 on click); added the
      missing route using the existing Contact component
- [ ] All case study images load at correct sizes — blocked, same reason as image optimization above
- [x] No console errors (2026-07-16) — found and fixed a React warning on every page: `inert`
      was being set to `''` instead of `true`/`undefined`, which (per the warning) React was
      silently coercing to `false` — meaning boot-overlay/docked-chat/mobile-overlay content
      meant to be inert during those states was not actually inert. Fixed in HomeV4Blend.tsx
      (production) and HomePage.tsx (Storybook exploration)
- [x] Typography renders correctly across browsers (2026-07-16) — confirmed via the
      Chromium/Firefox/WebKit sweep above
- [x] Dark mode works across all pages and components (2026-07-16) — background color
      (`rgb(14,16,15)` / `#0e100f`) verified identical across all 9 routes × 3 viewports ×
      3 browser engines

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

*Last updated: 2026-06-22 — WCAG AA accessibility audit complete: 7 fixes across 6 files
(Button focus ring, CaseStudyPage skip link + labeled nav + 3 focus rings, AboutPage footer
landmark, NavBar aria-label, Contact new-tab announcements). ai-component-guide.md updated
with Accessibility Patterns section. React Router installed; App.tsx rewritten with
BrowserRouter and all 10 routes; vercel.json SPA rewrite added. src/content/ created with
5 typed CaseStudyContent objects (usaa full, upfluent full, sabre full, sagent placeholder,
portfolio-rebuild placeholder). Phase 4A/4B/4C marked complete.*
*See also: decisions.md — significant choices and reasoning*
*See also: key-insights.md — strategic insights from initial analysis*
*See also: process-journal.md — running build log*