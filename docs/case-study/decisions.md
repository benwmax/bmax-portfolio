# Decisions

Significant choices and the reasoning behind them.

## 2026-06-01 — Create a dedicated case study documentation area
- Decision: Store case study notes under `docs/case-study/`.
- Reasoning: Keeps process artifacts separate from source code and groups all supporting material in one place.

## 2026-06-01 — Initialize files with starter content
- Decision: Use structured starter content instead of blank files.
- Reasoning: Reduces setup friction and makes it clear what belongs in each document.

## 2026-06-01 — Track screenshots with a placeholder file
- Decision: Add a placeholder file in `screenshots/` so the directory is committed.
- Reasoning: Git does not retain empty directories, and the folder needs to exist in the repo structure now.

## 2026-06-02 — Finalize positioning statement and homepage thesis
- Decision: Lock the positioning statement and expanded thesis for the homepage hero.
- Positioning statement: *I make expert-level tools learnable — for agents, adjusters, attorneys, and traders who can't afford to get it wrong.*
- Expanded thesis: *I've worked across travel, insurance, fintech, and mortgage — building tools that experts actually adopt. The work is in the details: the decision that made onboarding 6 months faster, the user research that redesigned how an industry works, the chatbot that let retail traders think like professionals.*
- Reasoning: The positioning statement names both the capability (making expert tools learnable) and the audience (high-stakes expert users) in a single line. The thesis grounds it in real outcomes — specific enough to be credible, varied enough to signal range. The examples implicitly reference Sagent, USAA/Sabre, and Upfluent without requiring the reader to already know the work.

## 2026-06-09 — USAA case study draft method
- Decision: Version B selected as the final base for the USAA case study.
- Reasoning: Version B had more voice and told a story. Version A read
  like a thorough project summary — credible but safe. For Principal/Director
  reviewers, B demonstrated judgment rather than just competence. The
  stakeholder pivot section in particular earned the outcomes rather than
  just reporting them.
- Alternatives considered: Version A (direct rewrite from source material);
  hybrid of A and B. Both rejected — hybrid risked bloat, A lacked perspective.
- Open question: Question 7 (what outlasted the project beyond metrics)
  was skipped. Worth revisiting before the case study is finalized.

  
  ## 2026-06-14 — Upfluent case study rewrite
 
- **Decision:** Rewrote the Upfluent case study using the eight-section structure. Reframed role ownership from "we/the team" to explicit individual ownership — led the AI chatbot design effort end to end, and owned signup, account management, and Risk Analysis individually; brand and visual system framed as a team effort contributed to. Reframed the product's non-launch as a funding outcome unrelated to design timelines: design delivered full platform designs and explorative chatbot concepts within 12 months, alongside market/user research and building the brand from scratch. Reframed the early-ChatGPT-model constraint (pre-function-calling) as a differentiator — early hands-on AI-in-product work, not a limitation.
- **Reasoning:** key-insights.md (#4, #5, #9) identified Upfluent as the most differentiated but most underdeveloped case study in the portfolio — "we" language obscured individual ownership, and the hybrid NLP + structured-UI chatbot architecture was never articulated despite being the most interesting design decision in the project. The non-launch needed careful framing to avoid implying design caused delays, since that wasn't the case. The early-model constraint connects to the portfolio's "AI before it was mainstream" throughline (key-insights.md #9), pairing this project with the portfolio rebuild itself.
- **Alternatives considered:** Considered keeping the 12-month delivery scope ("full platform + chatbot concepts + research + brand from scratch in 12 months") inside "What Was Hard or Failed" as part of the struggle narrative. Moved it to Outcomes instead — it reads as a delivery achievement, not a difficulty, and keeps the "hard" section focused on the genuine design tension (desktop-grade complexity vs. mobile feasibility).
- **Open question:** Sections 4 (Process) and 7 (Outcomes) currently cover multiple threads each — competitive research, signup, and the chatbot in Process; delivery scope, signup stat, and chatbot outcome in Outcomes — rather than the "one sharp detail beats three vague ones" standard. Claude flagged this as a deviation from the CLAUDE.md tone/length standard; Ben opted to keep as written. Revisit if overall portfolio length needs trimming, or if a future pass wants to narrow these sections to focus on the chatbot specifically.


## 2026-06-15 — Live AI chat feature: architecture and safeguards

- Decision: Add a live AI assistant to the portfolio so visitors can ask
  about Ben's work directly. Built as a Vercel Edge Function
  (`api/chat.ts`) that proxies to Claude Haiku 4.5, using a system prompt
  scoped to Ben's positioning and case studies (`api/lib/system-prompt.ts`).
  API key never reaches the client.

- Reasoning: Reinforces the AI-fluency throughline that already pairs
  Upfluent and the meta case study (key-insights.md #9) — this is a second,
  current example of directing AI tooling deliberately. Haiku 4.5 was
  chosen for cost ($1/$5 per MTok) since the task (short, scoped Q&A about
  Ben's work) doesn't need a larger model. Budget risk is bounded
  structurally rather than relying on application code alone: a dedicated
  Anthropic Workspace holds its own API key with a hard monthly spend limit
  and an email alert threshold, isolated from any other Anthropic usage.
  Application-level safeguards (per-IP rate limiting via Upstash,
  server-enforced session/message caps, output token caps, CORS lock)
  layer on top of that.

- Alternatives considered: Calling the Anthropic API directly from the
  client (rejected — exposes the API key). Sonnet 4.6 for a lower
  prompt-caching activation threshold (rejected for now — Haiku is the
  cheaper baseline regardless, and caching only meaningfully kicks in once
  the system prompt grows past Haiku's 4,096-token minimum, which is
  expected to happen naturally as Upfluent/USAA/Sagent case studies are
  folded in).

- Open question: Current limits (20 messages/hour/IP, 30-message session
  cap, 400 max output tokens, $10-20/mo workspace spend limit) are starting
  defaults, not tuned against real traffic — revisit after deployment.
  Whether this feature itself becomes a documented example in the meta case
  study (anticipating cost/abuse risk before shipping) is also open.

  ## 2026-06-17 — Visual identity direction

- Decision: Dark mode default with warm olive-charcoal backgrounds, phosphor terminal
  green as primary accent, amber/gold as secondary accent, two-font monospace system
  for UI chrome, sharp 3px border radius, dot grid surface texture.
- Reasoning: References provided included Cyberpunk 2077 UI, terminal/CLI aesthetics,
  satellite control dashboards, and minimal dark UI. The direction synthesizes these
  into something that reads as "serious tool built by someone with taste" — not a game
  UI, not a generic dark portfolio. The warm olive undertone distinguishes it from the
  neutral-dark crowd. Phosphor green (#00ff5e / #00e054) chosen over earthy green for
  stronger terminal signal. Amber chosen as secondary to avoid reds/negatives and to
  complement green without competing.
- Alternatives considered: Cool blue-gray background (rejected — too generic), neon
  green full phosphor #00ff5e as primary (retained as max-contrast variant only — too
  intense for sustained use), earthy green #39a84a (rejected — too muted, lost the
  terminal read), Berkeley Mono (rejected — $75 license, replaced with free options).
- Token file written: src/tokens/tokens.css (updated 2026-06-17)

## 2026-06-17 — Monospace font selection

- Decision: Two-font monospace system. Space Mono (Google Fonts, SIL OFL) for display
  and UI chrome — wordmark, nav, buttons, case study numbers, tags, chat prompt
  indicator. IBM Plex Mono (Google Fonts, SIL OFL) for functional mono — chat input
  text, metadata, smaller labels, anything Space Mono would make too loud at small
  sizes. System sans for prose and case study body copy only.
- Reasoning: Berkeley Mono was the original first-choice but requires a $75 license.
  Space Mono is the closest free equivalent for the terminal/retro-tech aesthetic —
  designed by Colophon for speculative fiction contexts, evokes monitor readouts and
  spacecraft status screens. IBM Plex Mono covers the functional mono role across eight
  weights with industrial precision. Together they give the system range: Space Mono
  for moments where the aesthetic is the point, IBM Plex Mono for sustained readability.
- Alternatives considered: JetBrains Mono (too neutral, no aesthetic signal), Geist
  Mono (contemporary but not on Google Fonts), Fira Code (good fallback but superseded
  by IBM Plex Mono for this use case).
- Google Fonts import: Space Mono (400, 700, italic variants) + IBM Plex Mono
  (400, 500, 600, italic). Import snippet is in src/tokens/tokens.css header comment.
- Open question: None — font selection resolved.

## 2026-06-20 — Page audit: accessibility, style tech debt, and mobile

Full audit of all built pages (HomePage, CaseStudyPage, Contact) and components
against WCAG AA, tech debt criteria, and mobile readiness. Four decisions made:

**1. `--color-text-tertiary` raised from `#6b7055` → `#7a8870` (contrast: 3.77:1 → 4.78:1)**
- Decision: Update the tertiary text token to pass WCAG AA at all text sizes.
- Reasoning: Every use of tertiary text in the built components (sidebar labels,
  StatBlock labels, ProcessStep phase, ChatInput counter, RoleCallout label) is
  at 9–11px — well below the 18px threshold where 3.77:1 would be acceptable.
  The new value maintains clear hierarchy below secondary (`#8a9478`, ~6.07:1).
  The aesthetic direction is unchanged — still a muted olive tone, just lighter.

**2. `--input-font-size: 1rem` (16px) as a floor for all input elements**
- Decision: Add a dedicated input font-size token and apply it to ChatInput and
  Input components, separate from `--text-base` (13px).
- Reasoning: iOS Safari auto-zooms the viewport when any focused input has
  `font-size < 16px`. With `--text-base` at 13px, every mobile iOS user was
  getting an unwanted viewport zoom on chat input tap. The fix requires 16px
  on the input element itself — not on surrounding UI. A dedicated token with
  an explicit comment keeps the constraint documented at the source.
- Alternatives considered: `maximum-scale=1` in the viewport meta tag
  (rejected — prevents manual zoom for accessibility, a WCAG 1.4.4 failure).

**3. Inline `paddingRight` styles eliminated; panel widths moved to tokens**
- Decision: Replace JS inline `style={{ paddingRight: '400px' }}` on both pages
  with CSS class toggles (`.pageContentDocked`, `.pageBodyWithChat`) backed by
  `--docked-panel-width: 400px` and `--cs-panel-width: 380px` in tokens.css.
- Reasoning: The panel width was defined twice — once in JS (inline) and once
  in CSS (the panel's `width` rule). If either changed, they'd drift. The `!important`
  override in the responsive media query was a symptom of the same problem.
  Single-source-of-truth via CSS custom properties; class toggle replaces inline style.

**4. Contact page buttons refactored to use the shared Button component**
- Decision: Delete ~60 lines of hand-rolled `.btnPrimary` / `.btnSecondary` in
  Contact.module.css and wire Contact.tsx to the existing Button component instead.
  Also added `min-h-[44px]` to Button's `md` and `lg` sizes.
- Reasoning: Duplicate button implementations mean two places that can drift.
  The hardcoded hover color `#0e2e14` in Contact.module.css (already caught in the
  audit) was the visible symptom. The right fix is elimination, not synchronization.
  Moving `min-h-[44px]` into Button sizes enforces the touch target at the component
  level rather than relying on per-page CSS.

## 2026-06-17 — Storybook and component build strategy

- Decision: Storybook 8 scaffolded and primitive component shells
  created in parallel with Claude Design visual explorations.
  Components are unstyled structure only — styling pass comes after
  design direction is locked from Claude Design sessions.
- Reasoning: Separating structure from styling means the Claude Design
  exploration is unconstrained by what's already been built, while
  the component shells are ready to receive styles immediately once
  direction is confirmed. No rework required at the handoff point.
- Parallel tracks: Claude Design (wordmark → homepage → case study page
  → component details) runs independently of the Storybook build.
  Handoff happens after Claude Design Session 4.