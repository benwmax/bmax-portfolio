# bmax-portfolio

Portfolio of Ben Maxwell — UX Principal and Design Director. Live at [viewbens.work](https://viewbens.work).

This repo is public from day one. The build process is intentional: Ben directed the work, Claude assisted with code generation and design exploration. That distinction is the point — and it's the lead case study.

---

## What this is

A ground-up portfolio rebuild targeting UX Principal and Design Director roles across fintech, insurance, mortgage, and travel. Five case studies, a live AI assistant, and a component library built in public.

The rebuild process itself is documented as a case study — design decisions logged in `docs/case-study/`, prompts that produced useful output in `ai-prompts.md`, and a running build journal in `process-journal.md`. If you're curious how a senior designer actually directs AI tools rather than just using them, that's the case study.

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React + Vite + TypeScript | Fast iteration, type safety, broad deployment support |
| Styling | Tailwind CSS + CSS Modules | Custom token system; CSS Modules for component isolation |
| Components | ShadCN UI + custom | ShadCN as primitive floor, not the system |
| Component library | Storybook 8 | Hosted publicly as a portfolio artifact |
| Hosting | Vercel | GitHub integration, Edge Functions, zero-config deploys |
| AI chat | Vercel Edge Functions + Anthropic | Portfolio assistant proxies to Claude Haiku via edge runtime |
| Rate limiting | Upstash Redis | Per-IP sliding window; no Node.js runtime dependency |

---

## Project structure

```
/
├── api/                     ← Vercel Edge Functions
│   ├── chat.ts              ← AI chat proxy (validation, rate limiting, streaming)
│   └── lib/
│       ├── system-prompt.ts ← Assistant brief — update as case studies finalize
│       └── rate-limit.ts    ← Per-IP rate limiting via Upstash
├── docs/
│   └── case-study/          ← Build documentation
│       ├── build-plan.md    ← Phased plan with live checkbox tracking
│       ├── decisions.md     ← Significant choices and reasoning
│       ├── process-journal.md ← Dated build log
│       └── ai-prompts.md    ← Prompts that produced useful output
├── src/
│   ├── components/          ← UI component library (see Storybook)
│   ├── pages/               ← Page-level components
│   ├── stories/             ← Storybook stories
│   ├── hooks/               ← Shared React hooks
│   └── tokens/tokens.css    ← Design token definitions (CSS custom properties)
└── public/
```

---

## Running locally

```bash
npm install
npm run dev          # Vite dev server — http://localhost:5173
npm run storybook    # Storybook — http://localhost:6006
npm run build        # Production build
npm run typecheck    # TypeScript check
```

For the AI chat feature, you'll need environment variables — see `.env.example`.

---

## Design system

The component library will be hosted publicly as a Storybook at `system.viewbens.work` (Phase 3G in `build-plan.md`).

Token definitions live in `src/tokens/tokens.css` — CSS custom properties, wired into the Tailwind config. The system uses two monospace fonts (Space Mono for display/UI chrome, IBM Plex Mono for functional mono), a system sans stack for prose, and a phosphor terminal green (`#00e054`) as the primary accent.

---

## Build documentation

The process is documented in `docs/case-study/` as it happens:

- **`build-plan.md`** — phased plan with live checkbox tracking across 7 phases
- **`decisions.md`** — significant choices and the reasoning behind them
- **`process-journal.md`** — running dated log of build activity
- **`ai-prompts.md`** — prompts that produced useful output, and what was done with them

If you're hiring for a Principal or Director role and want to understand how I work with AI tools, start there.

---

*Ben Maxwell · ben@viewbens.work · [linkedin.com/in/benwmax](https://linkedin.com/in/benwmax)*
