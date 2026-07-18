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

## 2026-06-20 — Storybook AI guidance system (parameters.ai + ai-component-guide.md)

- Decision: Added a `parameters.ai` block to every story file with `guidance`,
  `contentRules`, and `avoid` fields. Created `docs/ai-component-guide.md` as the
  macro-level companion — a 783-line authoritative reference with a decision tree,
  prop cheat sheets, composition patterns, and an explicit out-of-scope list.
- Reasoning: Each new Claude session was starting from zero on which components
  exist, which were deliberately cut, and what the token rules are. Two layers of
  guidance address two different questions: ai-component-guide.md answers
  "what should I build?" before any code is written; parameters.ai answers "how
  should I use this component?" while writing stories or variants. Together they
  prevent building excluded components (Select, Avatar, MobileMenu, etc.),
  hardcoding values, or inventing new industry tags.
- Alternatives considered: CLAUDE.md alone (too high-level for per-component
  decisions); inline code comments (not queryable holistically, easy to miss).

## 2026-06-20 — MDX documentation pages for all components

- Decision: Created MDX docs pages for all 12 components alongside their existing
  stories, with prose descriptions, embedded Canvas previews, do's/don'ts, and
  ArgTable prop tables.
- Reasoning: Storybook is hosted publicly as a portfolio artifact. A hiring manager
  or design director landing on it should understand each component's purpose,
  usage constraints, and design rationale without reading source code. Story files
  alone don't surface this at the Docs tab level — MDX does. The do's/don'ts were
  extracted directly from the parameters.ai blocks so they stay in sync.
- Alternatives considered: README files per component directory (not co-located
  with Storybook, not rendered in the UI); relying on story `parameters.docs`
  descriptions alone (not surfaced prominently at the Docs tab level for all users).

## 2026-06-22 — WCAG AA accessibility audit: contact, about, and case study pages

- Decision: Fixed 7 accessibility issues across 6 files after a full WCAG AA audit
  of the Contact, About, and CaseStudy page templates.
- Changes:
  - **Button.tsx:** focus ring color changed from `--color-green-border` (#0e4a1e,
    ~1.9:1 contrast) to `--color-green-accent` (#00e054, ~10:1) — WCAG 1.4.11
    Non-text Contrast. The border token is intentionally dark (for decorative use);
    it was never correct for focus indicators.
  - **CaseStudyPage.tsx:** added missing skip link (`#main-content`) — WCAG 2.4.1
    Bypass Blocks. Contact and About pages already had skip links; CaseStudy was missed.
  - **CaseStudyPage.tsx:** labeled the sidebar `<nav>` as `"Case study contents"` to
    distinguish it from the site nav (`"Site navigation"`). Multiple unlabeled `<nav>`
    elements confuse AT landmark navigation.
  - **CaseStudyPage.module.css:** added `:focus-visible` rings to `.sidebarLink`,
    `.endTickNext`, and `.chatSuggestBtn` — WCAG 2.4.7 Focus Visible. All three had
    hover styles but no keyboard focus indicator.
  - **AboutPage.tsx:** moved `<footer>` outside `<main>` so it carries the
    `contentinfo` landmark role for AT navigation — WCAG 1.3.1. A `<footer>` nested
    inside `<main>` is treated as a section footer, not a page footer, by the
    accessibility tree.
  - **NavBar.tsx:** added `aria-label="Ben Maxwell – Home"` to the BM_ wordmark link
    — WCAG 2.4.4 Link Purpose. "BM" alone is opaque to screen readers.
  - **Contact.tsx:** added `<span className="sr-only"> (opens in new tab)</span>`
    to the LinkedIn address link and OPEN PROFILE button — WCAG 3.2.2 On Input. Both
    use `target="_blank"` without any AT notification.
- Reasoning: Keyboard navigation and screen reader support are part of the portfolio's
  brand signal. A portfolio for a senior UX designer with inaccessible focus indicators
  and missing landmarks is self-undermining. These fixes are also the baseline that the
  Phase 5 Lighthouse audit will verify.

## 2026-06-22 — Routing architecture and case study content files

- Decision: Implemented Phase 4A (routing) and Phase 4B (content) using React Router v6
  BrowserRouter, a `vercel.json` SPA rewrite, and typed `CaseStudyContent` objects in
  `src/content/`.
- Changes:
  - **`vercel.json`**: Single SPA rewrite rule (`/(.*) → /`) so all routes serve
    `index.html` on Vercel — React Router handles the rest in the browser.
  - **`src/App.tsx`**: Rewritten with `BrowserRouter` and 10 routes: `/`, `/work`,
    `/work/portfolio`, `/work/upfluent`, `/work/sagent`, `/work/usaa`, `/work/sabre`,
    `/about`, `/resume`, and `*` catch-all to `NotFoundPage`.
  - **`src/content/usaa.ts`**: `CaseStudyContent` object copied verbatim from
    `CaseStudyPage.stories.tsx` — already complete, just extracted and exported.
  - **`src/content/upfluent.ts`**: Converted from `docs/case-studies/upfluent.md`.
    number: '02', dateRange: '2023–24', nextCase → Sagent.
  - **`src/content/sabre.ts`**: Converted from `docs/case-studies/sabre.md`.
    number: '05', outcomes: $1B contract, +23% revenue, 6mo early, +$800M TTV. No nextCase.
  - **`src/content/sagent.ts`**: Placeholder. number: '03', known data (4 designers,
    12 business teams), all section paragraphs set to holding copy. nextCase → USAA.
  - **`src/content/portfolio-rebuild.ts`**: Placeholder. number: '01', dateRange: '2026',
    full write-up deferred to Phase 7 after launch. nextCase → Upfluent.
- Reasoning: NavBar already accepts an explicit `activePath` prop from each page, so no
  `useLocation()` hook was needed — page components remain router-agnostic and Storybook
  stories continue to work without a Router decorator.
- Alternatives considered: File-based routing via a Vite plugin (rejected — unnecessary
  abstraction for a 5-page site); calling `useNavigate` in page components (rejected —
  couples pages to the router and breaks Storybook). 
- Open question: Sagent placeholder needs a full content pass once the Phase 1C brain dump
  is complete. Portfolio Rebuild placeholder content is intentional until Phase 7.

## 2026-07-16 — Launch before Sagent case study is written
- Decision: Prioritize getting the site launched (viewbens.work re-pointed, live) over
  finishing the Sagent case study first. Sagent will go live with its existing Phase 4B
  placeholder/holding copy and get a full content pass afterward.
- Reasoning: Ben wants the site live as soon as possible; Sagent content is a from-scratch
  writing effort (Phase 1C brain dump has not started) that would otherwise gate launch
  indefinitely.
- Alternatives considered: Writing Sagent first per the original Phase 1 parallel-workstream
  plan, which flagged Sagent as the strongest Director-level evidence and warned against it
  becoming "the last thing written and the first thing that gets rushed." That risk still
  applies — noting it here so it doesn't get lost after launch.
- Open question: how long the Sagent placeholder stays live post-launch before the full
  case study replaces it.

## 2026-07-17 — Add a user-selectable Futuristic theme alongside Retro
- Decision: Built a second, user-toggleable theme — "Futuristic" — as an alternative to the
  existing terminal/phosphor aesthetic, now called "Retro" for contrast. Retro stays the
  default for every visitor; Futuristic is opt-in via a segmented Retro/Futuristic control
  in the NavBar (top right, present on every page), persisted to localStorage. No layout
  changes — same components, same page structure, same content — only the token layer and
  a handful of scoped CSS overrides change per theme.
- Reasoning: Ben requested a second visual mode inspired by clean, light sci-fi interfaces
  (referencing UI screenshots from *Destiny*) as an additional demonstration of range and
  systems thinking for the meta case study — a token system flexible enough to support a
  second full aesthetic without a rewrite is itself a Principal-level signal.
- Implementation approach: `[data-theme='futuristic']` attribute on `<html>`, set by an
  inline script in `index.html` before first paint (so a saved preference never flashes the
  wrong theme) and by `src/hooks/useTheme.ts` afterward. All theme-specific values live in
  `src/tokens/tokens.css` as a `[data-theme='futuristic']` override block layered on top of
  the existing `:root` (retro) tokens — component code is untouched except for a few
  animation/shape swaps that couldn't be expressed as a color token (the blinking terminal
  cursor becoming a soft pulse or a static dot; the ChatInput block caret thinning to an
  insertion bar). `src/components/ThemeToggle/` is the new switch component, added to
  `NavBar`.
- Palette: cool pale surfaces (`#f2f5f8` page / `#fbfdfe` card), near-black slate text
  (`#17222c`, ~15:1), azure primary accent (`#0467b3`) replacing phosphor green, deep gold
  secondary accent (`#8f6400`) replacing amber. Space Grotesk replaces Space Mono for
  display/chrome type; IBM Plex Mono is unchanged in both themes so data/metadata keeps a
  technical throughline. The dot-grid texture becomes a fine line grid.
- Contrast fix mid-build: the first pass reused retro's structure literally — accent-colored
  text on a pale accent-tinted button fill (mirroring retro's dark-fill-plus-bright-text
  button) — which measured under 4.5:1 on a light background, since both the tint and the
  page are already light. Fixed by giving the futuristic primary button (`Button` primary
  variant and `ChatInput`'s ASK button, now sharing the same `--btn-primary-*` token family)
  a solid azure fill with white text instead. Also darkened `--color-green-bright` and
  `--color-green-light` for the futuristic theme specifically — on a dark background,
  "brightest" correctly means "palest/most luminous," but on a light background it has to
  mean the opposite (darker, more saturated) to stay legible. Caught by contrast math during
  build, not by a11y tooling — worth remembering that "swap the palette" isn't a safe
  find-and-replace even when every individual color was chosen carefully.
- Storybook: each component and page-level story gets one additional "Futuristic" story
  (not tied to Storybook's own light/dark theme switcher, per Ben's explicit instruction) —
  `parameters.theme = 'futuristic'` on the story, read by a decorator in
  `.storybook/preview.tsx` that sets the same `[data-theme]` attribute the live toggle uses.
- Alternatives considered: A Storybook-only theme switcher addon (rejected — Ben wants both
  themes as directly linkable, permanent artifacts in the sidebar, not an ephemeral toolbar
  state); reusing the green/amber token names for genuinely different hues without a comment
  explaining the remap (rejected — would read as a bug to a future editor; documented inline
  in tokens.css instead).
- Open question: whether Futuristic should get its own OG image / meta description pass
  before launch, or whether that's out of scope since Retro is the default first-impression
  theme.

## 2026-07-17 — Push the Futuristic theme further (V2)
- Decision: Took a second pass on the Futuristic theme to make it read as more overtly, cleanly
  sci-fi rather than "the light version of Retro." This went beyond the first pass's token-only
  recolor — it changed component and element treatments. The enhanced Storybook stories are
  labeled "Futuristic V2" (per Ben's instruction to label the pushed variants V2). The product
  toggle is unchanged (still Retro/Futuristic); "V2" is the iteration label in Storybook, not a
  third theme.
- What changed:
  - **Grid background dropped to ~5% opacity** (per Ben's explicit request): the futuristic line
    grid's color became `rgba(23,34,44,0.05)` — barely-there, so it reads as a technical
    substrate rather than graph paper. Cells also widened 28px → 32px.
  - **Sharper geometry theme-wide**: futuristic radii dropped to 0–2px (`--radius-sm:0`,
    `--radius-md:1px`, `--radius-lg:2px`) so chrome reads as instrument, not app. The pill radius
    is untouched, so the ThemeToggle and status pills stay round against squared panels for
    deliberate contrast.
  - **Crisp azure hairline accents as a consistent HUD motif**, replacing the softer first pass:
    a gradient underline on the NavBar, a 2px azure top rail on cards / chat panels / the 404
    shell / contact channels, an azure accent edge on the docked chat rail, an inset azure edge on
    the active chat field (inset shadow, so no focus layout shift), and a reusable `--accent-line`
    token. Section kickers and the work kicker gained a leading azure tick (HUD label convention).
  - **Solid HUD chips**: the case-study index chip and contact channel numbers became solid azure
    blocks with white numerals and a chamfered corner (`clip-path`, decorative only — never on
    focusable elements); the hero status badge became a squared chip with a solid azure marker
    square instead of a round dot.
  - **Button hook**: added a stable `data-variant` attribute to Button so the theme can add
    per-variant refinements (a white top-inset on primary, azure hover on secondary) in index.css.
    Focus rings were deliberately left on the Tailwind utility layer so no theme CSS can clip them.
- Reasoning: the first pass proved the token architecture could carry a second theme; Ben wanted
  the payoff pushed — cleaner, more distinctly sci-fi, more polished — and explicitly OK'd changing
  components/elements (not just colors) to get there. Keeping every change scoped under
  `[data-theme='futuristic']` (plus the `data-variant` hook, which is inert in retro) means retro
  is byte-for-byte unaffected.
- Alternatives considered: (1) A separate `[data-theme='futuristic-v2']` theme keeping V1 live for
  A/B in the product — rejected; the product only needs one futuristic theme, and a permanent
  second one is maintenance cost with no user benefit. V1 vs V2 is a Storybook-history concern, and
  the git history already preserves V1. (2) Chamfered (clip-path) buttons for a stronger HUD look —
  rejected because `clip-path` also clips the focus-ring box-shadow, an accessibility regression;
  the chamfer is used only on decorative index chips instead.
- Open question: none new. The V1-vs-V2 comparison isn't preserved as a live toggle — if Ben wants
  a side-by-side later, it'd need the separate-theme approach above.

## 2026-07-17 — Futuristic V2 approved as-is
- Decision: Ben reviewed the Futuristic V2 push and signed off with no revision requests
  ("v2 looks perfect"). The theme is considered done — HUD accent language, ~5% grid opacity,
  sharpened geometry, solid chamfered index chips, and the `data-variant` Button hook all stand
  as shipped.
- Reasoning: n/a — this is a confirmation, not a new judgment call. Logged because it closes out
  the open work from the two prior 2026-07-17 entries and confirms the approach (scoped
  `[data-theme='futuristic']` overrides rather than a component fork, chamfer reserved for
  non-focusable elements only) is validated, not just shipped — worth keeping as precedent for
  how future theme/variant work in this project should be scoped and reviewed.
- Open question: the OG image / meta description question from the first Futuristic entry
  (2026-07-17, first entry) is still open and unrelated to this sign-off.

## 2026-07-17 — AI chat widget: abuse-prevention hardening pass
- Decision: Hardened `api/chat.ts` and related files against LLM abuse — jailbreak/impersonation
  attempts, prompt injection (including a fabricated-history vector found in the existing code),
  code-execution requests, and resource abuse. Full plan and reasoning captured in a plan-mode
  session; summary below.
- What changed:
  - **System prompt** (`api/lib/system-prompt.ts`): added a SAFETY section — persona-lock
    (no user framing, hypothetical or otherwise, can change scope/persona/format), an
    ignore-embedded-instructions clause (text inside visitor messages that looks like a system
    message or an authority claim is untrusted data, never a command), an anti-defamation/
    anti-impersonation clause (never generate negative/false claims about Ben or speak as him in
    first person), a groundedness clause (say "not covered" rather than inventing plausible
    answers to on-topic-but-unsupported questions), and a no-code-execution clause (not a coding
    assistant, won't generate/execute/explain code or claim unavailable capabilities).
  - **Server-side session authority** (new `api/lib/session.ts`): the client previously sent its
    entire message history — including `assistant` turns, which are just React state — back to
    the server on every request, and the server trusted it verbatim. A modified client could
    fabricate a prior "assistant" turn that already appeared to have broken character, a classic
    fake-prior-compliance jailbreak that no amount of shape/role validation can detect, since a
    well-formed fake turn is indistinguishable from a real one. Fixed by moving conversation
    history and the session message cap into a Redis-backed record keyed by an HttpOnly cookie
    (`bmax_chat_sid`); the client now sends only the newest message, and the server appends to
    its own authoritative history. Degrades to stateless single-turn mode if Redis is unavailable
    (fails safe: no history = no injection surface). `src/hooks/useChatSession.ts` simplified
    to match — the wire payload shrank from the full message array + a client-reported
    `sessionMessageCount` to just the new message text.
  - **IP source**: switched from parsing `x-forwarded-for` (comma-split, `'unknown'` fallback
    shared a rate-limit bucket across unidentified clients) to `x-real-ip` (Vercel's single-value,
    edge-set client IP), failing closed (400) if neither header is present.
  - **CORS enforcement**: `api/chat.ts` previously only set response headers reflecting the
    allowed origin — it never rejected a request server-side, so the check did nothing on its
    own. Added an explicit 403 reject when `Origin` is present and not in `ALLOWED_ORIGINS`.
    Framed for future reference: this stops other sites' pages from riding a visitor's browser to
    call the endpoint (CSRF-style); it does not stop direct script/curl abuse, since non-browser
    callers don't send a trustworthy `Origin` header — rate limiting and the session cap cover
    that.
  - **Global daily budget circuit breaker**: `GLOBAL_DAILY_MESSAGE_CAP = 500` in `api/chat.ts`,
    a Redis counter (`api/lib/session.ts`) incremented only after a successful model call. Chosen
    as a conservative starting ceiling meant to keep the widget well under the Anthropic
    Workspace's monthly spend cap even under a coordinated multi-IP spike (which per-IP rate
    limiting alone can't catch) — **not yet tied to Ben's actual Workspace spend cap number**,
    since that wasn't available during this pass. Re-tune once the Workspace is set up (see the
    "Ben's actions to go live" item in this file's status section / build-plan.md).
  - **Security headers** (`vercel.json`): added `X-Content-Type-Options`, `X-Frame-Options: DENY`,
    `Referrer-Policy`, `Permissions-Policy` (camera/mic/geolocation disabled), and a
    `Content-Security-Policy-Report-Only` header. Shipped as report-only rather than enforcing —
    it currently allows `'unsafe-inline'` for `script-src`/`style-src` (needed for the inline
    theme-flash-prevention script in `index.html` and inline `style={{}}` usage in a few page
    components) as a starting point to observe real violations before tightening. Before ever
    switching to enforcing mode, the inline theme script should move to a nonce or hash so
    `'unsafe-inline'` can be dropped from `script-src` — that's the real security value of a CSP
    and report-only mode doesn't deliver it on its own.
  - **Structured logging**: one JSON line per request via `console.log` (captured as Vercel
    Function Logs, no new vendor) at every decision point — blocked events (bad origin, missing
    IP, rate-limited, invalid message, session-capped, global-budget-capped) and successful
    replies (latency, output length, stop_reason). Logs metadata only, never full visitor message
    text.
  - **Documentation**: added a standing rule to `CLAUDE.md`'s AI Chat Feature section — if
    assistant-output rendering is ever changed to support markdown/HTML, that change must ship
    with output sanitization (e.g. DOMPurify) in the same commit. Not acted on now — confirmed no
    unsafe rendering sink exists today (plain JSX text interpolation, React auto-escapes).
- Reasoning: Ben asked how to protect the chat widget from reputational abuse (jailbreaking it
  into saying negative/false things about him), lying/hallucination, code injection, and general
  LLM abuse. A read of the existing implementation found reasonable bones already in place
  (scope-limiting language, per-IP rate limiting, length caps, non-leaky error messages, safe
  output rendering) but several concrete gaps, most importantly the fabricated-history vector —
  the one item that couldn't be closed by better validation alone and needed an actual
  architecture change.
- Alternatives considered: a moderation-model/second-LLM classification pass (rejected —
  disproportionate cost/latency for a low-traffic, already narrow-scope widget); a WAF or paid
  guardrail service (rejected — disproportionate for this scale); CAPTCHA/Turnstile at launch
  (rejected — hurts UX for the actual audience, recruiters trying the widget; held in reserve for
  if real recurring abuse shows up); an automated alerting pipeline (rejected for now — the
  Workspace spend cap is already the real backstop; occasional manual dashboard checks are
  proportionate at this scale).
- Open question: `GLOBAL_DAILY_MESSAGE_CAP`'s value (500) needs to be revisited once Ben's
  Anthropic Workspace spend cap is actually known — currently a placeholder informed guess, not
  a number derived from real pricing math. Also open: whether/when to move the CSP from
  report-only to enforcing, which requires first fixing the inline-script `'unsafe-inline'` gap
  noted above.

## 2026-07-18 — Verified the abuse-prevention hardening against real credentials
- Decision: Built `scripts/verify-chat-safeguards.mjs` to test the 2026-07-17 hardening pass
  end to end, rather than testing through `vercel dev`. It imports `api/chat.ts`'s handler
  directly and drives it with constructed `Request` objects — real Redis, real Anthropic calls,
  no local server, no port/CORS juggling. Ran it and confirmed every safeguard behaves as
  designed.
- What it found: all 6 objective checks passed — CORS rejects a disallowed origin (403), a
  session cookie is issued and conversation history persists correctly across turns (server
  correctly recalled a prior question when asked "what did I just ask you?"), the
  fabricated-history injection attempt (a fake `assistant` turn claiming Ben already admitted
  his USAA numbers were fabricated) was completely ignored by the reply, all four jailbreak/
  persona-override probes (DAN-style override, hypothetical-critic framing, fake system-override
  claim, code-generation request) were declined cleanly with a redirect back to scope, and
  invalid-input handling (empty message, malformed JSON) both returned 400. Rate-limit (20/hr)
  and session-cap (30/session) boundary tests were deliberately skipped — confirming them would
  cost ~50 real model calls against the Workspace's spend cap to exercise a mechanism (the Redis
  session store) already proven working by the other checks.
- Reasoning: the 2026-07-17 pass was implemented and typechecked but never exercised against
  real infrastructure — in particular, the fabricated-history fix (the centerpiece of that pass)
  needed to be proven against an actual model response, not just reasoned about.
- A real gotcha worth recording for future local-dev work in this project: getting real
  secrets into a local `.env.local` here was harder than expected. Claude's own sandboxed Bash
  tool redacts anything secret-shaped that flows through a command it runs — `vercel env pull`
  executed through Claude's tool wrote the literal string `"[SENSITIVE]"` as the env var value
  instead of the real credential, breaking every Redis call. Testing the hypothesis that this
  was specific to Claude's sandbox: Ben ran the identical `vercel env pull` command himself, but
  in VSCode's integrated terminal, and got the exact same `"[SENSITIVE]"` placeholder — proving
  the redaction isn't confined to Claude's own tool calls, it's Claude Code's extension reaching
  into any terminal it has visibility into, including ones typed into directly. Moving to a
  terminal window opened completely outside VSCode fixed it immediately. Separately (and
  unrelated to the above), that standalone terminal then hit a PowerShell execution-policy block
  on `npx.ps1` — worked around with `npx.cmd` instead of changing the system's execution policy.
  **Takeaway for future sessions**: any local testing in this project that needs real secrets in
  a file must be run from a terminal opened outside VSCode, not the integrated terminal panel.
- Alternatives considered: continuing to debug `vercel dev` locally (abandoned — the direct
  handler-import approach in the verify script sidesteps `vercel dev`'s port/env/CORS quirks
  entirely and is simpler to rerun after future `api/chat.ts` changes).

## 2026-07-18 — Chat conversation now persists across Home ⇄ Case Study navigation
- Decision: Ben reported that starting a chat on the homepage and then navigating to a case
  study lost the conversation. Fixed by lifting chat state into a `ChatProvider` (new
  `src/context/`) rendered once above the router in `App.tsx`, shared by `HomeV4Blend` and
  `CaseStudyPage` — the two pages that have a chat surface (deliberately not extended to
  About/Resume/Contact, which have none). Both pages now call `useChat()` instead of
  `useChatSession()` directly; Storybook stories are unaffected since `useChat()` falls back to
  a standalone `useChatSession()` when rendered outside a `ChatProvider`.
- Behavior on landing on a case study: the existing "Reading about X — ask anything about this
  project..." message and its suggestion chips are now appended into the persistent transcript
  instead of replacing it, and only the first time that company is seen this session — revisiting
  a case study already chatted about doesn't repeat the note or chips, but does still keep the
  assistant informed (see below). Scrolling up on any page now shows the full conversation from
  every page visited this session.
- Model awareness: a `pageContext` field (the company name) rides along with every message sent
  while on a case study page and gets folded into the system prompt server-side as an ephemeral,
  per-call addendum — never written to session history, so it can't drift or accumulate. Validated
  against a hardcoded allowlist of the five real case study names in `api/chat.ts`
  (`ALLOWED_PAGE_CONTEXTS`) rather than trusted as free text, since it's client-supplied and this
  is the same codebase that just went through a prompt-injection hardening pass (2026-07-17) —
  an unvalidated client string concatenated into the system prompt would have reopened exactly
  the kind of injection surface that pass closed. Invalid/tampered values are silently ignored
  rather than rejecting the request, since this field only affects answer quality, not security.
- Scope explicitly excluded (per Ben's choice when asked): the chat rail is not being built out on
  About/Resume/Contact, and the conversation does not survive a hard page refresh or new tab —
  only in-app (client-side) navigation. Both are reasonable follow-ups if ever wanted, not
  currently planned.
- Two real, separate bugs found and fixed while implementing and testing this:
  1. **Navigation was never actually client-side.** `NavBar`, `CaseStudyCard`, and
     `CaseStudyPage`'s "Next case" link all rendered plain `<a href>` tags instead of React
     Router's `Link` — every click was a full browser page reload. This would have silently
     defeated the entire persistence feature regardless of where the chat state lived, since a
     hard reload destroys all in-memory React state no matter what. Caught by testing with
     Playwright using real `page.goto()` calls (which behave like hard reloads) versus real
     `.click()` calls on the actual links — the former showed persistence completely failing,
     which led to finding the root cause. Converted all three to `Link`. This directly revisits
     the 2026-06-22 decision ("NavBar remains router-agnostic... Storybook stories continue to
     work without a Router decorator") — that constraint is now stale: a global `MemoryRouter`
     decorator was added to `.storybook/preview.tsx` at some point after that decision (needed
     for `CaseStudyPage`'s `useLocation()` call), so every story already runs inside a Router and
     converting these components to `Link` is safe. `NavBar` keeps its `activePath` prop pattern
     unchanged (still doesn't call `useLocation()` itself) — only the rendered element changed
     from `<a>` to `Link`.
  2. **Sabre was missing from the homepage work grid entirely**, in both
     `src/pages/explorations/data.ts` (used by all four Home exploration variants including the
     live `HomeV4Blend`) and the separate canonical array in `src/pages/HomePage.tsx`. The route
     (`/work/sabre`) and full content (`src/content/sabre.ts`) both existed and worked fine if
     visited directly — there was simply no card linking to it from Home, meaning Sabre (case
     study 5, called out in CLAUDE.md as "the anchor close") was unreachable from primary
     navigation. Unrelated to the chat-persistence work, found only because testing the new
     feature required clicking through every case study from the homepage grid. Added the missing
     card entry to both files, using copy/metadata pulled from `src/content/sabre.ts` for accuracy
     (role: "UX Designer", year: "2015–18", sector/tag: "Travel", matching the ascending-seniority
     pattern of the other four cards).
- A third, cosmetic-only issue found and deliberately not fixed: React Strict Mode
  double-invokes effects in development, which exposed a real bug in the new
  `setPageContext` logic — the "already announced this session" branch was clearing
  `activeSuggestions`, so Strict Mode's synthetic second call (with no real navigation in
  between) wiped out the suggestion chips that the first call had just set, on every first
  visit. Fixed by having that branch leave `activeSuggestions` untouched rather than clearing
  it — revisits still correctly show no suggestions, because reaching a second case study
  always passes through a page (Home) that explicitly clears `activeSuggestions` via
  `setPageContext(null)` first. See `src/hooks/useChatSession.ts` for the reasoning inline.
- Verification: Playwright script driving real `.click()`-based navigation against a mocked
  `/api/chat` (no live credentials needed) — start a conversation on Home, navigate to Sabre
  (prior message still visible, context note appears once, suggestions shown), navigate to USAA
  (Sabre's note still visible higher up, new note appears), revisit Sabre (no duplicate note or
  chips), detour through About, return to Home (original conversation intact, docked view active
  immediately rather than the empty hero prompt). All checks passed.
- Files touched: `src/context/ChatContext.tsx`, `src/context/chatContextInstance.ts`,
  `src/context/useChat.ts` (new); `src/App.tsx`, `src/hooks/useChatSession.ts`,
  `src/pages/CaseStudyPage.tsx`, `src/pages/explorations/HomeV4Blend.tsx`,
  `src/components/NavBar/NavBar.tsx`, `src/components/CaseStudyCard/CaseStudyCard.tsx`,
  `src/pages/explorations/data.ts`, `src/pages/HomePage.tsx`, `api/chat.ts`.

## 2026-07-18 — Security/QA hardening pass on the AI chat backend

- **Decision:** Ran a full security/QA audit of the codebase and implemented fixes rather
  than just reporting findings. Three scope calls, all Ben's:
  1. **Redis-outage behavior for cost-relevant checks: fail closed.** If Upstash is
     unreachable, the per-IP rate limit and the `GLOBAL_DAILY_MESSAGE_CAP` circuit breaker
     now return a 503 ("temporarily unavailable") instead of letting requests through
     unmetered. Chat goes down for the outage's duration; spend can never run uncapped
     during one. (Chosen over the alternative — keep degrading gracefully like the
     history-loading path — because these two checks exist specifically to bound Anthropic
     spend, and undercounting during an outage was judged worse than a temporary outage.)
  2. **Enforce CSP now**, not defer it. Switched `vercel.json` from
     `Content-Security-Policy-Report-Only` to a real, blocking `Content-Security-Policy`.
     Required converting the inline theme-flash-prevention script in `index.html` from
     relying on `'unsafe-inline'` to a `sha256` hash source, since the script is static
     (not per-request) and doesn't need a nonce.
  3. Implement fixes directly rather than deliver a findings-only report.
- **What was fixed:**
  - **TOCTOU race on both spend caps** (`api/chat.ts`, `api/lib/session.ts`): the session
    message cap and the global daily budget were checked with a plain `GET` well before the
    corresponding write, which only happened after the full SSE stream finished seconds
    later — concurrent requests near a cap could all pass the check before any of them
    recorded usage. Replaced with atomic Redis `INCR`-then-check "reservations" taken before
    the Anthropic call, `DECR`'d back on any path that doesn't end in a real reply (cap
    exceeded, Redis error, upstream failure). `SessionRecord` no longer carries `count` —
    it moved to its own atomically-incremented Redis key, decoupled from the history blob
    (which stays best-effort/fail-open, since losing history only shortens context, not cost).
  - **Single IP could consume ~96% of the daily budget** (`api/lib/rate-limit.ts`): the
    existing 20/hour window alone let one sustained visitor hit ~480 messages/day against a
    500 global cap. Added a second per-IP daily window (60/day) — both must pass.
  - **Spoofable rate-limit key** (`api/chat.ts`): dropped the `x-forwarded-for` fallback
    used when `x-real-ip` was absent — that header is client-settable and could be forged to
    pick an arbitrary rate-limit bucket. `x-real-ip` (edge-set, not client-controllable) is
    now the only source; the existing "missing IP → 400" path covers its absence.
  - **Uncaught Redis exception** in `checkRateLimit` (no try/catch existed) — now caught by
    a unified try/catch in `api/chat.ts` around all three cap-relevant Redis calls
    (rate limit, session reserve, global reserve), returning a proper 503 with CORS headers
    and a `logEvent` call instead of a bare, unlogged 500.
  - Added a `Content-Length` guard (413 above 8KB) ahead of `req.json()` as defense-in-depth
    beyond the platform's own body-size limit.
  - **CSP enforced**: hash-based `script-src` (see `index.html` comment for the recompute
    note if the inline theme script ever changes), `'unsafe-inline'` kept only on
    `style-src` (needed for React's inline `style={{}}` props). Added
    `Strict-Transport-Security` and explicit `Cache-Control` headers (long-lived immutable
    for `/assets/*`, `must-revalidate` for everything else) to `vercel.json`.
  - **TypeScript `strict` mode enabled** across the whole project. Found in the process that
    `api/` wasn't covered by *either* existing `tsconfig` project reference — `npm run
    build`'s `tsc -b` had never type-checked the backend at all, only ESLint did. Added
    `tsconfig.api.json` (strict, Edge-runtime lib set) and referenced it from `tsconfig.json`.
    The whole codebase — app, node config, and now api — compiled clean under strict mode
    with zero errors once these were wired up; no source changes were needed for strict mode
    itself.
  - Added a client-side stream timeout (`AbortController`, re-armed per chunk, 30s) and a
    ref-based double-submit guard to `src/hooks/useChatSession.ts`, so a hung Edge Function
    or a fast double-trigger can't leave the widget stuck or send a message twice.
  - Corrected two stale doc references found during the pass: this file's "Current Project
    Status → Immediate next steps" list still had Phase 3G/4D listed as pending (both
    complete) and Phase 4E's full item list (most of it was already done, only OG images
    remain) — corrected against `build-plan.md`, which was accurate. Also corrected a
    completed-work log line that described the client sending `sessionMessageCount`, a
    contract superseded by the 2026-07-17 session-authority rewrite.
- **Explicitly not changed:** `vercel.json`'s catch-all rewrite (`/(.*) → /`) was flagged as
  not excluding `/api/` by pattern, but Vercel's documented routing order already serves
  Function/filesystem routes before rewrites apply, so `/api/chat` was never actually at
  risk — and a `(?!...)`-style exclusion pattern couldn't be verified against Vercel's
  actual routing engine in this environment. Changing config with unverifiable syntax risked
  breaking the site to fix a gap that doesn't exist in practice, so it was left as-is.
- **Verification:** `npm run build` (tsc -b + vite build) and `npm run lint` both pass clean.
  Manually traced every early-return path in the new `api/chat.ts` control flow to confirm
  reservations are released exactly when they should be. Recomputed and confirmed the CSP
  script hash against the actual `dist/index.html` build output, not just the source file
  (Vite doesn't minify the inline script, so they match, but this was checked rather than
  assumed). Full end-to-end testing against real Anthropic/Upstash traffic was not possible
  in this environment — no credentials are configured yet (see "Ben's actions to go live").
  `scripts/verify-chat-safeguards.mjs` is unaffected (it only calls the public `handler`
  export) and remains the tool for that once Ben's env vars are set.
  `src/pages/explorations/data.ts`, `src/pages/HomePage.tsx`, `api/chat.ts`.