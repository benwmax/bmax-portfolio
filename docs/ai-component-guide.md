# AI Component Guide

*Authoritative reference for all components and page templates in the bmax-portfolio design system.
Read this before building any new UI — it will save you from re-inventing components that already
exist or using them wrong.*

*Last updated: 2026-07-20*

---

## How to Use This Guide

1. Check the **Decision Tree** below to identify which component handles your use case.
2. Read the component section — especially **Prop cheat sheet** and **Pitfalls**.
3. Check the Storybook story for that component; every *production* component/page story has a
   `parameters.ai` block with `guidance`, `contentRules`, and `avoid` fields. **Exception:**
   archival exploration stories (`Explorations/*` — Signal, Boot, Phosphor, Blend — plus
   `Explorations/00 · Original Homepage`) are exempt. They document retired/comparison variants,
   not living components a session might build against, so an `ai` block would just be guidance
   for code nobody should extend. The production story that documents the *selected* design
   (`Pages/Homepage`, covering `HomeV4Blend`) does carry the full `ai` block.
4. When in doubt, look at how the component is used in existing page stories
   (`Pages/Homepage`, `Pages/Case Study`) before building something new.

**Golden rule:** Never hardcode hex values or arbitrary spacing. Every color and every space
value has a CSS custom property. They are documented in `Foundations/Colors` and
`Foundations/Spacing`.

---

## Decision Tree

| Use case | Component |
|---|---|
| Primary / committed action button | `Button` variant="primary" |
| Secondary / available-but-not-recommended action | `Button` variant="secondary" |
| Ghost / optional nav-adjacent action | `Button` variant="ghost" |
| Industry label (Travel, Fintech, etc.) | `Tag` variant="amber" (default) |
| Method / process label | `Tag` variant="green" |
| AI assistant availability signal | `StatusIndicator` |
| Full AI chat widget (prompt + button + status) | `ChatInput` |
| Generic form text field | `Input` |
| Inline "send Ben a message" form in the chat log | `ContactCard` |
| Site header / navigation | `NavBar` |
| Retro/Futuristic theme switch | `ThemeToggle` |
| Mobile "Ask about Ben" FAB + full-screen chat overlay | `MobileChatSurface` |
| Work grid thumbnail + link | `CaseStudyCard` |
| Case study page hero (title, meta grid) | `CaseStudyHero` |
| Screenshot / artifact with caption | `ImageCaption` |
| Explicit ownership rows | `RoleCallout` + `RoleCallouts` |
| Numbered case study process steps | `ProcessStep` + `ProcessSteps` |
| Outcome stat cell | `StatBlock` + `StatGrid` |
| Full homepage | `HomeV4Blend` (page component, `Pages/Homepage` in Storybook — see note below) |
| Full case study page | `CaseStudyPage` (page component) |
| About page | `AboutPage` (page component) |
| Resume page | `ResumePage` (page component) |
| 404 page | `NotFoundPage` (page component) |
| Contact page | `Contact` (page component) |

---

## Foundations

### Colors

**Storybook:** `Foundations/Colors`
**File:** `src/tokens/tokens.css`

Two accent families: phosphor green (interactive) and warm amber (callouts, industry tags).

- **Green** (`--color-green-*`): interactive only — buttons, links, active nav, focus rings, status dots.
- **Amber** (`--color-amber-*`): callouts and industry tags only. Never for interactive elements.
- **Red** (`#e05050`, `--color-status-error`): actual errors only — never for warnings, emphasis, or decoration.
- **Text hierarchy:** primary (`#ccd4b0`) → secondary (`#8a9478`) → tertiary (`#6b7055`) → muted (`#5a6050`) → disabled (`#3d4035`).

Never hardcode hex values. Always use `--color-*` CSS custom properties or Tailwind token classes.

#### Futuristic theme (second, user-selectable theme)

**Storybook:** every component and page-level story with a "Futuristic V2" variant; token tables in `Foundations/Colors` and `Foundations/Typography`.
**File:** `src/tokens/tokens.css`, `[data-theme='futuristic']` override block.

A second, light sci-fi theme toggled by `ThemeToggle` (top right of every `NavBar`) and persisted to `localStorage`. Retro is always the default. It's fully token-driven — most components need zero logic changes, only a CSS override block — with a few scoped effect swaps (cursor blink → soft pulse, block caret → insertion bar).

- **Accent:** azure (replaces phosphor green as the interactive color) plus a warm gold secondary accent (replaces amber).
- **Display type:** Space Grotesk (replaces Space Mono for display contexts under this theme).
- **Surface texture:** a fine line-grid at ~5% opacity (replaces the dot grid), with a consistent azure hairline HUD accent language — top rails, tick marks, docked-rail edges, chamfered index chips.
- Story variants are named **"Futuristic V2"** in Storybook — "V2" is a naming/iteration label carried over from a mid-build revision, not a second live theme; there is still only Retro and Futuristic. See `decisions.md` 2026-07-17 for the V1→V2 revision reasoning.

Never add theme-conditional logic to a component — the whole system works by having components read theme-agnostic tokens (`--color-green-accent`, etc.) that resolve differently under `[data-theme='futuristic']`. If a component looks wrong under Futuristic, the fix is almost always in `tokens.css`, not the component.

---

### Typography

**Storybook:** `Foundations/Typography`

Three fonts, three roles — never mix them:

| Font | Token | Role |
|---|---|---|
| Space Mono | `--font-mono-display` | Wordmark, nav, buttons, tags, ALL CAPS labels |
| IBM Plex Mono | `--font-mono-ui` | Metadata, small labels, code, anything Space Mono makes too loud below ~13px |
| System sans | `--font-sans` | Case study body copy and long-form prose **only** |

Type scale tokens (never use arbitrary px values): `--text-xs` (10px) through `--text-3xl` (28px).

---

### Spacing

**Storybook:** `Foundations/Spacing`

- **Border radius:** 3px (`--radius-md`) is the system default. 0 for terminal-chrome elements. 9999px for dots and pills.
- **Motion:** always `--ease-default` (`cubic-bezier(0.4, 0, 0.2, 1)`). Durations: `--duration-fast` (100ms) button presses, `--duration-base` (150ms) hover/focus, `--duration-slow` (250ms) panel transitions.
- **Space scale:** `--space-1` (4px) through `--space-24` (96px). Always use token names.

---

## Component Reference

### Button

**File:** `src/components/Button.tsx`
**Storybook:** `Components/Button`

Terminal command aesthetic — Space Mono, ALL CAPS, wide tracking. The component enforces uppercase; never pass sentence-case labels.

#### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost"` | `"primary"` | Three variants only — never invent a fourth |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | `md` is the only size in production |
| `disabled` | `boolean` | `false` | Use sparingly — prefer hiding over disabling |
| `loading` | `boolean` | `false` | Applies disabled state while in-flight |

#### When to use each variant

- **Primary:** The single committed action per surface — "ASK", "VIEW CASE STUDY +", "COMPOSE EMAIL +". One primary per surface.
- **Secondary:** Available but not the recommended next step — "COPY ADDRESS", "COPY URL". Always paired with a nearby primary.
- **Ghost:** Optional navigation-adjacent actions that must not compete with a primary — "BACK", "MORE", "VIEW".

#### Content rules

- Labels: SHORT COMMANDS — "ASK", "VIEW CASE STUDY +", "COPY ADDRESS", "COMPOSE EMAIL +"
- The canonical chat submit label is "ASK"
- All text is ALL CAPS — the component enforces this

#### Pitfalls

- Never place two primary buttons side by side
- Never use secondary as the only button on a surface
- Never use ghost as the primary CTA
- Don't show a spinner inside the button — the ChatInput sweep animation is the loading affordance

#### Accessibility

Focus ring uses `ring-green-accent` (`#00e054`, ~10:1 contrast against page background). Do NOT change this to `ring-interactive-border` (`#0e4a1e`) — that border token is intentionally dark for decorative use and is near-invisible as a focus indicator (fails WCAG 1.4.11).

---

### Tag

**File:** `src/components/Tag.tsx`
**Storybook:** `Components/Tag`

Space Mono, ultra-wide tracking. Never interactive — no onClick, no href.

#### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `"amber" \| "green" \| "solid"` | `"amber"` | amber=industry, green=method |
| `size` | `"sm" \| "lg"` | `"sm"` | sm for cards, lg for hero meta blocks |
| `dot` | `boolean` | `false` | Visual bullet — implies list membership |

#### When to use each variant

- **Amber (default):** Industry labels on CaseStudyCard thumbnails and ProcessStep artifact callouts — "Travel", "Fintech", "Mortgage", "Insurance", "AI Collaboration"
- **Green:** Method, build-process, or AI-collaboration labels where the tag reads as "process" not "industry"
- **Solid:** Reserved for high-emphasis callout contexts — not in v1 card layouts

#### The five canonical industry labels

Travel · Fintech · Mortgage · Insurance · AI Collaboration

These are the only industry labels in the portfolio. Do not invent new ones.

#### Pitfalls

- Never make a Tag interactive
- Never use green for industry categories
- Never use amber for interactive elements
- Never use solid as the default variant

---

### StatusIndicator

**File:** `src/components/StatusIndicator.tsx`
**Storybook:** `Components/StatusIndicator`

Availability signal. 7px dot, IBM Plex Mono 10px uppercase. Renders **below** ChatInput — never inside it.

#### Props

| Prop | Type | Notes |
|---|---|---|
| `status` | `"online" \| "offline" \| "warning" \| "error"` | Online: green-bright blinking dot. Offline: text-disabled, no blink |
| `label` | `string` | Always uppercase. Format: "ONLINE · assistant ready · ~2s response" |

#### States

- **Online:** Default. Green-bright dot, blink animation. Label: "ONLINE · assistant ready"
- **Offline:** No blink, text-disabled dot. Label: "OFFLINE · responses unavailable"
- **Warning:** Degraded-but-functional (rate limit approaching). Activate programmatically, not by default
- **Error:** Actual failure (API unreachable, auth error). Only red non-green element. Programmatic only

#### Pitfalls

- Never render StatusIndicator inside ChatInput — it renders separately below it
- Don't set `blink={false}` for online state — the blink is the signal
- Don't use "offline" for loading state — loading is still "online" (responding, just slow)

---

### ChatInput

**File:** `src/components/ChatInput.tsx`
**Storybook:** `Components/ChatInput`

The full AI chat widget — terminal `›` prompt indicator, input field, ASK button, and StatusIndicator below. Use this component, not the bare `Input`, for any AI chat surface.

#### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `status` | `"online" \| "loading" \| "offline"` | `"online"` | Controls field interactivity and loading animation |
| `multiline` | `boolean` | `false` | Grows to 6 lines then scrolls. Enter submits, Shift+Enter inserts a newline |
| `showStatus` | `boolean` | `true` | Set false when the surrounding panel already has a StatusIndicator |
| `placeholder` | `string` | `"ask about my work…"` | Lowercase, no period — matches the system default |
| `forceFocused` | `boolean` | — | **Storybook-only.** Do not use in application code |

#### States

- **Default / idle:** status="online", empty field
- **Focused / active:** Green border, phosphor bg tint, block caret — triggers on real `:focus`
- **Filled:** Active state (green border + bg) persists while field has text, even after blur
- **Loading:** status="loading" — field read-only, sweep animation on bottom border, ASK at 55% opacity
- **Offline:** status="offline" — ASK disabled; field stays interactive

#### When to use multiline

- `multiline={true}` for the full case study right rail (expanded chat composer) and standalone chat surfaces
- Single-line for the compact homepage hero panel

#### Pitfalls

- Never use ChatInput as a generic form input — use the bare `Input` component for that
- Don't show a spinner inside the button — the sweep animation is the loading affordance
- Don't clear the field while loading — the user's question stays visible
- `forceFocused` is Storybook-only — never wire it to application state

---

### Input

**File:** `src/components/Input.tsx`
**Storybook:** `Components/Input`

Bare terminal text field. Use for forms — not for the AI chat widget (use `ChatInput` for that).

#### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | Space Mono ALL CAPS. Rendered above the field |
| `hint` | `string` | — | IBM Plex Mono 10px, tertiary. Wired to aria-describedby |
| `error` | `string` | — | Replaces hint, turns border red, sets aria-invalid |
| `prompt` | `boolean` | `false` | Adds terminal `›` indicator for terminal-aesthetic contexts |
| `multiline` | `boolean` | `false` | Renders `<textarea>`. Min-height 4.5rem, vertically resizable |
| `disabled` | `boolean` | `false` | 50% opacity, not-allowed cursor |

#### Content rules

- Labels are ALL CAPS — "YOUR QUESTION", "EMAIL ADDRESS"
- Hint: format guidance or limits — "Max 2000 characters", "Letters only"
- Error messages: specific — "Please enter a question before submitting." not "Invalid input."

#### Pitfalls

- For AI chat functionality, use `ChatInput` — not this component
- Don't add a `prompt` to a standard form field outside the terminal context
- Don't use red for any state other than actual errors

---

### ContactCard

**File:** `src/components/ContactCard/ContactCard.tsx`
**Storybook:** `Components/ContactCard`

Structured Name/Email/Message form (built from `Input` + `Button`) that renders inline in the chat message log — Home and case study pages only, never the standalone `Contact` page. Appears when `useChatSession`'s client-side `detectContactIntent` check matches either the visitor's message or the assistant's reply; submits to `/api/contact`, which emails Ben via Resend.

#### Props

| Prop | Type | Notes |
|---|---|---|
| `status` | `'idle' \| 'sending' \| 'sent' \| 'error'` | Owned by `useChatSession` (`contactFormStatus`), not local state |
| `errorText` | `string` | Server error message, passed through verbatim — don't rewrite it |
| `onSubmit` | `(fields: ContactSubmission) => void` | Wire to `useChatSession`'s `submitContactForm` |
| `onDismiss` | `() => void` | Wire to `useChatSession`'s `dismissContactCard` |

#### Content rules

- Header label: `SEND BEN A MESSAGE`
- Send button: `SEND` idle, `SENDING…` in flight — no spinner icon
- Confirmation copy: `Sent — Ben typically replies within 48 hours.`

#### Pitfalls

- Don't render on the `Contact` page — that page is intentionally form-free (see its section below)
- Don't strip the hidden honeypot field or the `elapsedMs` timing signal — both are load-bearing for `/api/contact`'s spam prevention
- Don't drop the "Not now" dismiss — the intent detection is a heuristic and can false-positive
- Don't clear the fields on an error response — the visitor's draft should survive a retry

---

### MobileChatSurface

**File:** `src/components/MobileChatSurface.tsx`
**Storybook:** `Components/MobileChatSurface`

The mobile-only "Ask about Ben" entry point — a floating action button that opens a full-screen chat overlay. Shared by `HomeV4Blend` and `CaseStudyPage` so mobile chat behaves identically on both. Desktop keeps its inline hero panel / docked rail instead — everything here is gated to `<=760px` by CSS and correctly renders nothing above that width.

#### Props

| Prop | Type | Notes |
|---|---|---|
| `visible` | `boolean` | Whether the FAB exists at all. Drive from `fabRevealed \|\| messages.length > 0` on Home, `true` on case study pages. |
| `open` | `boolean` | Controlled open state of the overlay. |
| `onOpenChange` | `(open: boolean) => void` | — |
| `messageCount` | `number` | Drives the FAB badge and its `aria-label`. |
| `chatStatus` | `ChatWidgetStatus` | Passed straight through to the overlay's `ChatInput`. |
| `onSubmit` | `(text: string) => void` | — |
| `renderLog` | `(ref, className) => ReactNode` | Render prop — the parent owns the log's content and per-page message styling; this component only supplies the ref (for autoscroll) and container class. |

#### The two behaviors that are easy to regress

- **FAB visibility formula:** `fabRevealed || messages.length > 0`, not message count alone. `fabRevealed` lives in the shared chat context and survives navigation, so a case-study visit reveals the FAB via `revealFab()` on mount even before a message is sent.
- **Homepage submit must hand off to the overlay.** The homepage's inline hero chat wraps its submit handler (`handleHeroSubmit`) to open this overlay first — on mobile there is no docked rail for the reply to flow into, so skipping the hand-off streams the reply into a hidden, non-interactive panel. See `decisions.md` 2026-07-19.

#### Pitfalls

- Never fork a second FAB/overlay pair into a page file — both pages must import this one component
- Never render it on About/Resume/Contact/404 — chat (and its mobile entry point) is scoped to Home + case study pages only (decisions.md 2026-07-18)
- Don't remove the `inert` attribute on the closed overlay — it keeps the hidden log out of the tab order for keyboard/screen-reader users

---

### NavBar

**File:** `src/components/NavBar.tsx`
**Storybook:** `Components/NavBar`

Site header. Present on every page. Three fixed nav links. Pass `activePath` from the router.

#### Props

| Prop | Type | Notes |
|---|---|---|
| `activePath` | `string` | Wire to router pathname. One of: "/work", "/about", "/resume" |

#### Pitfalls

- Always wire `activePath` to the router pathname — never leave it undefined in production
- Don't add custom nav links or a mobile hamburger — three links fit at 390px without collapsing
- Don't add a fourth nav link without checking with Ben

#### Accessibility

The BM_ wordmark link carries `aria-label="Ben Maxwell – Home"`. Do not remove this — "BM" alone is opaque to screen readers (WCAG 2.4.4 Link Purpose). The trailing underscore is `aria-hidden="true"` by design.

---

### ThemeToggle

**File:** `src/components/ThemeToggle/ThemeToggle.tsx`
**Storybook:** `Components/ThemeToggle`

Retro/Futuristic segmented control, fixed to the top-right of `NavBar`. A real two-option radiogroup (`role="radiogroup"`), not an icon toggle — the theme names are the feature. Theme state lives on `<html data-theme>` via `src/hooks/useTheme.ts`, not a React provider, so this component is self-contained and works standalone in Storybook exactly as it does in production.

Implements the full ARIA APG radiogroup keyboard pattern, not just the roles: roving `tabIndex` (only the checked option is a Tab stop) plus Arrow key navigation that both moves focus and changes the selection. Click still works independently. Don't add `role="radio"`/`radiogroup"` to a control that doesn't implement this — the roles alone create an accessibility-tree promise that native tab-per-button behavior breaks (WCAG 4.1.2).

#### Props

| Prop | Type | Notes |
|---|---|---|
| `className` | `string` | Optional. Layout hook only — no visual variants to configure. |

#### Content rules

- Exactly two options: "Retro" and "Futuristic," abbreviated "RET"/"FUT" below 560px so the NavBar still fits its three nav links at a 390px viewport.
- Labels are full theme names, not icons.

#### Pitfalls

- Never relocate it out of the NavBar's top-right corner
- Never add a third theme option without a design pass — the styling assumes exactly two
- Don't wrap it in a provider or add a second persistence layer — `useTheme` already owns `localStorage` (`viewbens-theme`) and the `data-theme` attribute

---

### CaseStudyCard

**File:** `src/components/CaseStudyCard.tsx`
**Storybook:** `Components/CaseStudyCard`

The work-grid entry point. Always a link (`href` required). 16:9 thumbnail, index chip, sector tag, title, hook, meta grid.

#### Props (key decisions)

| Prop | Type | Notes |
|---|---|---|
| `index` | `string` | Zero-padded two digits: "01", "02", "03", "04", "05" |
| `title` | `string` | Project name (not the hook) |
| `desc` | `string` | One-sentence hook — the problem angle |
| `tag` | `string` | Industry label — one of the five canonical labels |
| `href` | `string` | Required. Card should always navigate |
| `role` | `string` | Role title — omit to hide meta grid |
| `year` | `string` | Year or date range |
| `stat` | `string` | Headline outcome value — "+4–6%", "$1B" |
| `statLabel` | `string` | Outcome label |
| `sector` | `string` | Industry context |
| `forceHover` | `boolean` | **Storybook-only.** Never use in application code |

#### Content rules

- `index`: always zero-padded — "01", "02" — matches the finalized case study order
- `desc` is the hook (problem angle), not the project title. "title" is the project name
- `tag`: one of the five canonical industry labels only

#### Case study index reference

| Index | Case Study |
|---|---|
| 01 | Portfolio Rebuild |
| 02 | Upfluent |
| 03 | USAA |
| 04 | Sabre |

Sagent is deliberately absent: its content is still a placeholder, so the page is unrouted
and unlisted rather than shipping holding copy. It remains third in the strategic order and
reclaims `03` when it ships, pushing USAA and Sabre back down. Don't treat the compacted
numbering as a reordering decision. See decisions.md 2026-07-29.

#### Pitfalls

- Never omit `href` — the card should always navigate
- Don't use title as the hook — `desc` is the hook; `title` is the project name
- Don't pass empty strings for meta props — omit them entirely to collapse the meta grid
- `forceHover` is Storybook-only — never use in application code

---

### CaseStudyHero

**File:** `src/components/CaseStudyHero.tsx`
**Storybook:** `Components/CaseStudyHero`

The case study page header. H1 is always a problem statement. Accent meta values are reserved for hard numbers only.

#### Props

| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | **Must be a problem statement:** "Modernizing X without Y" |
| `subtitle` | `string` | 2–4 sentences of problem context |
| `meta` | `MetaItem[]` | Array of `{ label, value, accent? }`. accent=true for hard numbers only |

#### Content rules

- `title` is the H1 — always a problem statement, never a project description
  - ✓ "Modernizing P&C insurance without losing the members who trusted it."
  - ✗ "Redesigned the USAA P&C experience"
- `accent: true` only for hard numbers — "+4–6%", "$1B", "< 3 mo."
- Max 2 accent slots — role and method should never be green

#### Pitfalls

- Never write the title as a project description
- Never use `accent: true` for role, method, or non-numeric values

---

### ImageCaption

**File:** `src/components/ImageCaption/ImageCaption.tsx`
**Storybook:** `Components/ImageCaption`

Terminal-chrome frame for all case study screenshots. Never use a plain `<img>` tag for portfolio artifacts — always use `ImageCaption`.

#### Props

| Prop | Type | Notes |
|---|---|---|
| `src` | `string` | Image URL. Omit both `src` and `alt` to show the dot-grid placeholder instead. |
| `alt` | `string` | **Required whenever `src` is set** — enforced at the type level (a discriminated union), not just a convention. There is no default that lets a real screenshot silently ship as decorative. |
| `tabLabel` | `string` | Format: "project · artifact-type" |
| `caption` | `string` | Format: "Fig. 01 — description." |

#### Content rules

- `tabLabel` format: "project · artifact-type" — e.g., "usaa · A/B test pipeline", "sabre-red · hotel-workspace"
- `caption` format: "Fig. 01 — description." — numbered, em dash, period
- Omit `src` to show the dot-grid placeholder (intentional — signals "image goes here")

#### Pitfalls

- Never use a plain `<img>` tag for case study artifacts
- Never use a grey box placeholder — the dot-grid treatment is the system default
- Inside a case study, don't render `ImageCaption` directly — declare a `figures` entry on
  the content object instead, so numbering and placement stay consistent. See
  "Adding figures to a case study" under CaseStudyPage. When going through `figures`, the
  caption omits the "Fig. 0N —" prefix; it's generated.

---

### RoleCallout + RoleCallouts

**File:** `src/components/RoleCallout.tsx`
**Storybook:** `Components/RoleCallout`

Explicit ownership rows for the Role section of a case study. 132px fixed label, flowing prose content. Always use `RoleCallouts` wrapper for multiple rows.

#### Props — RoleCallout

| Prop | Type | Notes |
|---|---|---|
| `label` | `string` | Short descriptor — "Owned", "In the room", "Director layer", "Started as", "Became" |
| `content` | `string` | 1–2 sentences, first person, active voice |

#### Standard 3-row pattern

```tsx
<RoleCallouts>
  <RoleCallout label="Owned" content="..." />
  <RoleCallout label="Director layer" content="..." />
  <RoleCallout label="In the room" content="..." />
</RoleCallouts>
```

#### Content rules

- Standard labels: "Owned", "Director layer", "In the room"
- Content: specific, first person — "I sat between the team and our Director" not "I was the lead designer"
- Pick the three that define scope and level — don't list every task

#### Pitfalls

- Always use `RoleCallouts` wrapper — never lay out rows manually
- Don't exceed the 3-row pattern without a specific reason

---

### ProcessStep + ProcessSteps

**File:** `src/components/ProcessStep.tsx`
**Storybook:** `Components/ProcessStep`

Numbered process step cards for case study process sections. Always use `ProcessSteps` wrapper. The body reads like something that happened — not a methodology list.

#### Props — ProcessStep

| Prop | Type | Notes |
|---|---|---|
| `num` | `number` | 1-based integer |
| `phase` | `string` | One-word label — "Assess", "Align", "Build", "Discover", "Define", "Test" |
| `title` | `string` | One-line step label |
| `body` | `string` | 1–3 sentences of what actually happened |
| `artifact` | `string` | Method names joined with ` · ` — "Field observation · Analytics review" |

#### Composition

```tsx
<ProcessSteps>
  <ProcessStep num={1} phase="Assess" title="..." body="..." artifact="..." />
  <ProcessStep num={2} phase="Align" title="..." body="..." artifact="..." />
  <ProcessStep num={3} phase="Build" title="..." body="..." artifact="..." />
</ProcessSteps>
```

#### Content rules

- `body` reads as an observation, not a methodology: "They kept leaving the tool mid-call for Expedia" not "Conducted field observation sessions"
- Past tense, first or third person: "We found...", "They told us...", "The data showed..."
- One sharp observation beats a bullet list of frameworks

#### Pitfalls

- Always use `ProcessSteps` wrapper — never lay out cards manually
- Don't exceed 5 steps — the process section should be scannable
- Don't use `ProcessSteps` outside of a case study process section

---

### StatBlock + StatGrid

**File:** `src/components/StatBlock.tsx`
**Storybook:** `Components/StatBlock`

Outcome stat cell — phosphor green headline value, ALL CAPS label, optional one-line context body. Always use `StatGrid` wrapper for multiple cells.

#### Props — StatBlock

| Prop | Type | Notes |
|---|---|---|
| `value` | `string` | The number or short word — "+4–6%", "$1B", "< 3 mo.", "Scaled", "Shipped" |
| `label` | `string` | ALL CAPS descriptor — "Conversion lift · P&C", "Contract won" |
| `body` | `string` | Optional. One sentence of context — "Homeowners up 5%." |

#### Props — StatGrid

| Prop | Type | Default | Notes |
|---|---|---|---|
| `cols` | `2 \| 3` | `2` | 2-col for 2 or 4 cells; 3-col for exactly 3 cells |

#### Composition

```tsx
<StatGrid>                        {/* default 2-col */}
  <StatBlock value="+4–6%" label="Conversion lift · P&C" body="Homeowners up 5%." />
  <StatBlock value="↓ Calls" label="Self-service tasks" body="..." />
  <StatBlock value="< 3 mo." label="Mobile redesign ship" body="..." />
  <StatBlock value="Scaled" label="Service blueprint" body="..." />
</StatGrid>

<StatGrid cols={3}>               {/* 3-col for exactly 3 stats */}
  <StatBlock value="$1B" label="Contract won" body="..." />
  <StatBlock value="+23%" label="Revenue lift" />
  <StatBlock value="$800M" label="TTV gain, year one" body="..." />
</StatGrid>
```

#### Content rules

- `value`: concrete number or short word — "+4–6%", "$1B", "< 3 mo.", "Scaled", "Shipped"
- Non-numeric values: past tense or qualitative — "Scaled", "Adopted", "Launched", "Shipped"
- Omit `body` when the value speaks for itself — don't force a sentence
- `label`: ALL CAPS — "Conversion lift · P&C", "Contract won", "Mobile redesign ship"

#### Pitfalls

- Always use `StatGrid` wrapper — never lay out cells manually
- Don't use vague qualifiers as values: "Improved", "Better", "Enhanced" — these don't land
- Don't force 3 cells when you only have 2 — use the default 2-col grid
- The 1px hairline is the grid background color showing through 1px gaps — never replicate manually

---

## Page Templates

### Homepage

**File:** `src/pages/explorations/HomeV4Blend.tsx` — despite the `explorations/` path, this is the live
production homepage, not a draft. It's the selected design from the three-way exploration phase
(Signal/Boot/Phosphor); the retired original is `src/pages/HomePage.tsx` (see note below).
**Storybook:** `Pages/Homepage` (also mirrored at `Explorations/04 · Blend` for exploration-history
comparison — same component, two story titles)

Fast 3-line boot sequence (~1.5s, replays on reload), full-viewport green scanline, split hero (typewriter
headline left, chat right), a 4-column staggered-reveal case study grid, and footer. When the visitor
sends the first message, the hero chat panel fades out and the desktop docked rail slides in. On mobile
(≤760px) chat instead hands off to `MobileChatSurface`'s full-screen overlay — see that component's
section above.

#### Props

| Prop | Type | Notes |
|---|---|---|
| `onChatSubmit` | `function` | Handler for chat message submission |
| `initialMessages` | `Message[]` | Seed messages to pre-populate the conversation |
| `skipBoot` | `boolean` | Skips the boot-sequence intro animation — useful for reviewing the assembled layout without waiting. Not Storybook-only; also used to skip the replay on client-side navigation back to `/`. |

#### States

- **Full boot sequence (Default):** 3-line terminal boot, then the page assembles in. Hero shows greeting + suggestion chips, docked rail hidden.
- **Assembled (skip intro):** `skipBoot={true}` — same idle layout, boot skipped.
- **Conversation started:** Hero panel faded, docked 400px rail visible (desktop only), page acquires padding-right. A contact-intent message renders an inline `ContactCard` at the end of the log — see that component's section above.
- **Mobile (≤760px):** Single column, docked rail hidden; chat is handled entirely by `MobileChatSurface`'s FAB + overlay, not the inline hero panel past the first submit.

#### Pitfalls

- Don't add content outside the existing hero layout — identity left, chat right
- Don't try to keep the hero panel visible during a conversation
- Don't show the docked rail on mobile — it's desktop-only
- Don't change the work grid order — displayed as 01 Portfolio Rebuild, 02 Upfluent, 03 USAA, 04 Sabre (Sagent unlisted pending content, still third strategically)
- Don't skip wiring the homepage's inline submit through `handleHeroSubmit` on mobile — it must open `MobileChatSurface`'s overlay before submitting, or the reply streams into the faded, non-interactive hero panel (decisions.md 2026-07-19)
- `forceShowContactCard` is Storybook-only — never wire it to application state; `showContactCard` from `useChat()` is the real production signal

**A note on `src/pages/HomePage.tsx`:** this is the retired original homepage design, kept only as a
Storybook comparison artifact under `Explorations/00 · Original Homepage`. It is not routed in `App.tsx`
and should not be built against — if you're updating "the homepage," that's `HomeV4Blend.tsx`.

---

### CaseStudyPage

**File:** `src/pages/CaseStudyPage.tsx`
**Storybook:** `Pages/Case Study`

Full case study page template. 8 labeled sections, sticky sidebar TOC, scroll progress bar, docked chat panel. Pass a `CaseStudyContent` object — never build from primitives.

#### CaseStudyContent Schema

```typescript
interface CaseStudyContent {
  number: string;           // "04" — zero-padded, matches finalized order
  dateRange: string;        // "2018–2020"
  company: string;          // "USAA"
  heroTitle: string;        // Problem statement — "Modernizing X without Y"
  heroSubtitle: string;     // 2–4 sentence problem context
  meta: MetaItem[];         // [{ label, value, accent? }] — accent:true for hard numbers only
  problem: Section;         // { heading, paragraphs[] }
  role: RoleItem[];         // [{ label, content }] — maps to RoleCallout
  userContext: Section;     // { paragraphs[] }
  process: ProcessItem[];   // [{ phase, title, body, artifact }] — maps to ProcessStep
  keyDecision: Section;     // { heading, paragraphs[], artifactLabel? }
  whatWasHard: Section;     // { paragraphs[] }
  outcomes: StatItem[];     // [{ value, label, body? }] — maps to StatBlock
  whatIdDoDifferently: Section; // { paragraphs[] }
  figures?: CaseFigure[];       // Captioned screenshots — see "Adding figures" below
  chatSuggestions?: string[];   // 2–3 conversation starters for the docked chat
  nextCase?: { title, href };   // Link to next case study
}
```

#### Adding figures to a case study

Two mechanisms exist. **Use `figures` for anything new.**

`figures` anchors captioned screenshots to a section and numbers them automatically in
array order, so captions read Fig. 01, 02, 03 down the page:

```ts
figures: [
  {
    section: 'process',                        // problem | context | process | decision | hard
    tabLabel: 'portfolio rebuild · storybook', // "project · artifact-type"
    caption: 'The component library, documented as a public artifact.', // no "Fig. 0N —" prefix
    // src + alt are optional, but only together:
    src: '/case/portfolio/storybook.png',
    alt: 'Storybook docs page for the Button component, showing all five states.',
  },
],
```

Omitting `src`/`alt` renders the dot-grid placeholder. That's the intended way to ship a
page before its screenshots exist — the captions and positions are already right, and
gaining a real image later means adding two fields and nothing else.

`keyDecision.artifactLabel` is the older single-figure mechanism, still used by Upfluent,
USAA, and Sabre. **Never set both on one page** — each numbers its figures from 01.

Role and Outcomes deliberately can't hold a figure: they're already visual (callout rows,
stat grid), so a screenshot competes with them rather than supporting the prose.

#### Section order (mandatory)

1. Problem
2. Role
3. User Context
4. Process
5. Key Decision
6. What Was Hard
7. Outcomes
8. What I'd Do Differently

All 8 sections are mandatory. The sidebar TOC is generated from them. Do not skip or reorder.

#### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `layout` | `"sidebar" \| "linear"` | `"sidebar"` | Sidebar is the intended production experience |
| `showChat` | `boolean` | `true` | Show/hide docked chat panel |
| `onChatSubmit` | `function` | — | Chat message handler |
| `initialMessages` | `Message[]` | — | Seed messages |

#### Pitfalls

- Never build a case study page layout from scratch — always use this template
- Don't change the section order
- Don't use `accent: true` for role, method, or non-numeric meta values
- Don't write `heroTitle` as a project description — it must be a problem statement
- Don't use `layout="linear"` as the default — sidebar + chat is the intended experience
- `forceShowContactCard` is Storybook-only — never wire it to application state; `showContactCard` from `useChat()` is the real production signal

---

### AboutPage

**File:** `src/pages/AboutPage.tsx`
**Storybook:** `Pages/About`

Static content page — four sections: approach, leadership, career arc, what I'm looking for. No props — all content is embedded in the file.

**Update content:** edit `AboutPage.tsx` directly.

**Career arc:** Runs from May 2014 (Aperia Solutions) to present — nine roles total. Market Rebellion is included as a brief mention, not a standalone case study.

**Location:** Dallas, Texas (not remote-only).

---

### ResumePage

**File:** `src/pages/ResumePage.tsx`
**Storybook:** `Pages/Resume`

Designed resume page — not a PDF dump. Nine roles, most-recent-first. Each role has: title, company, date range, sector `Tag`, and two outcome bullets. Date column is 140px wide (fixed to prevent overflow on longer date strings).

**Update content:** edit `ResumePage.tsx` directly. No props.

---

### NotFoundPage

**File:** `src/pages/NotFoundPage.tsx`
**Storybook:** `Pages/404`

Terminal-themed 404 — fake shell session where the page request fails, with a link back home. Fully self-contained. No props.

**Pitfalls:**
- No search bar or site map — link back home only
- No generic error illustration — the terminal visual is the aesthetic

---

### Contact

**File:** `src/components/Contact/Contact.tsx`
**Storybook:** `Pages/Contact`

Contact page — two channel cards (email + LinkedIn) with copy-to-clipboard actions and a receipt strip. All content is hardcoded.

**Content:**
- Email: ben@viewbens.work
- LinkedIn: linkedin.com/in/benjaminwmaxwell
- Receipt strip: "REPLY WITHIN ≤ 48 hrs" · "TIMEZONE Dallas · UTC-5" · "STATUS Available"

**Update content:** edit `Contact.tsx` directly. No props.

**Pitfalls:**
- No contact form on this page — two channel cards are the contact method here
- Don't change email address or timezone without checking with Ben
- Don't confuse this with `ContactCard` — that's a separate, chat-only form that appears inline in the AI assistant on Home/case study pages, not on this page. See `ContactCard`'s section above.

---

## Composition Patterns

### AI Chat Surface (Homepage Hero)

```tsx
<ChatInput
  status={chatStatus}
  placeholder="ask about my work…"
  onSubmit={handleSubmit}
  multiline={false}
/>
{/* StatusIndicator rendered by ChatInput via showStatus={true} */}
```

### AI Chat Surface (Case Study Right Rail)

```tsx
<ChatInput
  status={chatStatus}
  multiline={true}
  showStatus={false}   {/* rail panel has its own status display */}
  onSubmit={handleSubmit}
/>
<StatusIndicator status={chatStatus} label="ONLINE · assistant ready" />
```

Both surfaces also render `ContactCard` at the end of the message log (not inside `ChatInput`) whenever `useChatSession`'s `showContactCard` is true:

```tsx
{showContactCard && (
  <ContactCard
    status={contactFormStatus}
    errorText={contactErrorText}
    onSubmit={submitContactForm}
    onDismiss={dismissContactCard}
  />
)}
```

### Case Study Process Section

```tsx
<ProcessSteps>
  <ProcessStep num={1} phase="Assess" title="..." body="..." artifact="..." />
  <ProcessStep num={2} phase="Align" title="..." body="..." artifact="..." />
  <ProcessStep num={3} phase="Build" title="..." body="..." artifact="..." />
</ProcessSteps>
```

### Case Study Role Section

```tsx
<RoleCallouts>
  <RoleCallout label="Owned" content="..." />
  <RoleCallout label="Director layer" content="..." />
  <RoleCallout label="In the room" content="..." />
</RoleCallouts>
```

### Case Study Outcomes Section

```tsx
<StatGrid>
  <StatBlock value="+4–6%" label="Conversion lift · P&C" body="Homeowners up 5%." />
  <StatBlock value="↓ Calls" label="Self-service tasks" body="..." />
  <StatBlock value="< 3 mo." label="Mobile redesign ship" body="..." />
  <StatBlock value="Scaled" label="Service blueprint" body="..." />
</StatGrid>
```

### Work Grid (Homepage)

Don't hand-write the cards. The grid renders from the `CASE_STUDIES` array in
`src/pages/explorations/data.ts`, which is the single source of truth shared by the live
homepage, the retired `HomePage.tsx`, and the Storybook grid story. Hardcoded copies of
this list drifted three separate times — add or reorder cards in `data.ts`.

```tsx
import { CASE_STUDIES } from './explorations/data';

{
  CASE_STUDIES.map((cs) => <CaseStudyCard key={cs.index} {...cs} />);
}
```

Current displayed order: `01` Portfolio Rebuild, `02` Upfluent, `03` USAA, `04` Sabre.
Sagent is unlisted while its content is a placeholder — it remains strategically third
and reclaims `03` when it ships. See decisions.md 2026-07-29.

---

## Accessibility Patterns

These patterns are required on every page template. They were audited and fixed on 2026-06-22 — the Phase 5 Lighthouse audit will verify them.

### Skip link

Every page wrapper must include a skip link as its **first child**, before the NavBar:

```tsx
<div className={styles.wrapper}>
  <a href="#main-content" className="skip-link">
    Skip to main content
  </a>
  <NavBar activePath="..." />
  <main id="main-content" ...>
```

The `.skip-link` class lives in `src/index.css` (positioned off-screen, revealed on `:focus`). Use the project class — not Tailwind's `sr-only` — so it's always available regardless of purge.

### Footer landmark placement

A page-level `<footer>` must be a **sibling of `<main>`**, not nested inside it:

```tsx
// Correct — footer gets the contentinfo landmark role
<div className={styles.wrapper}>
  <NavBar ... />
  <main id="main-content">...</main>
  <footer>...</footer>
</div>

// Wrong — footer inside main loses its landmark role
<main id="main-content">
  ...
  <footer>...</footer>  {/* ❌ treated as section footer, not page footer */}
</main>
```

### Labeled nav elements

When a page has more than one `<nav>`, each must have a distinct `aria-label`:

- Site nav (NavBar): `aria-label="Site navigation"` — already set in NavBar.tsx
- Case study sidebar: `aria-label="Case study contents"`
- Any additional nav: use a descriptive label that distinguishes it

### External links (new tab)

Any link with `target="_blank"` needs a screen-reader announcement. Add sr-only text inside the link:

```tsx
<a href="https://www.linkedin.com/in/benjaminwmaxwell/" target="_blank" rel="noopener noreferrer">
  LinkedIn
  <span className="sr-only"> (opens in new tab)</span>
</a>
```

This applies to both raw `<a>` tags and Button with `href` pointing to external URLs.

### Focus-visible on custom interactive elements

Every custom clickable element needs an explicit `:focus-visible` CSS rule. Hover styles alone are not sufficient — keyboard users get no indicator. The pattern used throughout the project:

```css
.myInteractiveElement:focus-visible {
  outline: 2px solid var(--color-green-accent);
  outline-offset: 3px;
  border-radius: 2px;
}
```

Use `--color-green-accent` (#00e054, ~10:1 contrast) — never `--color-green-border` (#0e4a1e, ~1.9:1 contrast) for focus indicators.

### sr-only class

Use `className="sr-only"` from `src/index.css` for visually hidden but AT-accessible content. Do not use Tailwind's built-in `sr-only` utility — the project class is guaranteed available without purge risk.

---

## Things That Don't Exist Yet

The following components were explicitly removed from scope during Phase 3 (2026-06-20).
Do not build them unless Ben explicitly re-adds them to the plan.

| Component | Why removed |
|---|---|
| `Select` | Not needed for current page set |
| Icon wrapper | Using inline SVG or direct emoji where needed |
| `Link` component | Native `<a>` tags serve the current need |
| `Avatar` | Not in current page designs |
| `Container` / `Section` / `Grid` / `Divider` | Layout handled at page level |
| `QuoteBlock` | Not in current case study layouts |
| `TimelineEntry` | Not in current page designs |
| `MobileMenu` | Three nav links fit at 390px without collapsing |

---

## Open Questions for Ben

See the questions report (delivered 2026-06-20) for items needing decisions before the guide
can be fully finalized. Key open items:

1. ~~**Case study index mismatch in CaseStudyCard.stories.tsx**~~ — resolved 2026-07-29: the
   Grid story now renders from the real `CASE_STUDIES` array, so it can't mismatch.
2. **`@storybook/addon-mcp` parameter schema** — confirm it uses `parameters.ai` or different namespace
3. **CaseStudyContent field-by-field docs** — full TypeScript interface in this guide, or link to source?
4. **"Fifteen years" copy** — career arc starts May 2014 (~12 years); decide copy update
5. **Sagent CaseStudyHero story** — the story still exists with placeholder args that don't
   match `src/content/sagent.ts`. Harmless while the page is unlisted; reconcile when the
   case study ships.
6. ~~**Portfolio Rebuild case study**~~ — resolved 2026-07-29: written in full
   (`src/content/portfolio-rebuild.ts`), card live, page story added.
7. **Contact page classification** — "Page Templates" section (current) or separate section?
8. **Sabre's date range disagrees across files** — `2015–18` in `explorations/data.ts`,
   `2014–18` on the Resume page, `2014–17` in `CaseStudyCard.stories.tsx`. Needs one answer.
