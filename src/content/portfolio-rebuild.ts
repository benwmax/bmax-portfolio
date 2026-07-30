import type { CaseStudyContent } from '../pages/CaseStudyPage';

/**
 * Case study 01 — the meta case study.
 *
 * Sourced from docs/case-study/: key-insights.md (the strategic diagnosis and
 * the "evidence without argument" quote), process-journal.md (the dated build
 * log), and decisions.md. Every claim here traces to one of those — the
 * Lighthouse range, the two themes, the component count, the eight weeks.
 *
 * Two framing rules from CLAUDE.md apply and are load-bearing, not stylistic:
 * this is never "Claude built this" — Ben directed the process — and the limits
 * of the AI collaboration are stated plainly rather than smoothed over. The
 * "what Claude couldn't do" content is the trust signal, so it stays in
 * whatWasHard even when trimming for length.
 *
 * Apostrophes are straight, not typographic, matching the other content files —
 * mixed styles would render inconsistently between case studies. Strings
 * containing one use double quotes (Prettier's own preference).
 */
export const portfolioRebuildData: CaseStudyContent = {
  number: '01',
  dateRange: '2026',
  company: 'Portfolio Rebuild',
  heroTitle: 'Directing an AI to build a portfolio — and making the process the case study.',
  heroSubtitle:
    "I rebuilt this site with Claude as a collaborator, not an autopilot. Every strategic call — positioning, what to lead with, what to cut — stayed mine. The interesting part isn't that AI wrote code fast. It's where I had to overrule it.",
  meta: [
    { label: 'My role', value: 'Director · Sole designer' },
    { label: 'Method', value: 'AI-directed build' },
    { label: 'Lighthouse', value: '96–100', accent: true },
    { label: 'Build time', value: '8 weeks', accent: true },
  ],
  problem: {
    heading: 'A portfolio full of evidence and no argument',
    paragraphs: [
      "My old portfolio had strong outcomes on it — a $1B contract, a 23% revenue lift, conversion wins at USAA. What it didn't have was a reason to read them in order. The reader had to assemble the case themselves, and readers don't do that.",
      "The first AI audit told me the homepage was weak and some links were broken. True, and beside the point. It took a second adversarial pass, aimed at the first one's output, to name the real failure: evidence without argument is just a pile of stuff.",
    ],
  },
  role: [
    {
      label: 'Owned',
      content:
        'Everything that required judgment: positioning, case study order, what to leave out, visual direction, and the decision to make this build the lead case study.',
    },
    {
      label: 'Claude owned',
      content:
        'Code generation, first drafts, audits, and surfacing things I had stopped seeing in my own work. Fast, and often right. Never the decision-maker.',
    },
    {
      label: 'The distinction',
      content:
        "That split is the case study. A portfolio built by AI proves nothing. A portfolio directed through AI shows how I'd run a team.",
    },
  ],
  userContext: {
    paragraphs: [
      "The reader is a design director or hiring manager with about ninety seconds and four other tabs open. They aren't auditing my process. They're deciding whether to keep reading.",
      'That makes AI collaboration a liability as much as a selling point. The same audience curious about how I work with AI is primed to spot slop — one generic gradient, one sentence about leveraging synergies, and the argument dies before it gets made.',
      'So the site has to survive a skim and reward a close read. And it has to look like it was made by someone with taste, before anyone reads a word about method.',
    ],
  },
  process: [
    {
      phase: 'Audit',
      title: 'Two AI passes, stacked against each other',
      body: 'Ran a straight portfolio assessment, then pointed a second adversarial review at its output. The second pass caught what the first missed — no NDA question, a misread of which case study actually showed craft, and a generic site map dressed up as strategy.',
      artifact: 'Adversarial review · Positioning synthesis',
    },
    {
      phase: 'System',
      title: 'Tokens first, components second',
      body: 'Locked the palette and type scale into CSS custom properties before building a single component, then built the library on ShadCN primitives with a public Storybook. When I later wanted a second full aesthetic, it cost a token override block instead of a refactor.',
      artifact: 'Design tokens · Storybook · 12 MDX docs',
    },
    {
      phase: 'Ship',
      title: "Build the AI, don't just claim it",
      body: 'Put a live assistant on the site so visitors can interrogate the work instead of taking my word for the AI fluency. It runs on an edge function with a scoped brief, server-side session authority, rate limits, and a spend cap — a public LLM endpoint is an attack surface, not a demo.',
      artifact: 'Edge function · Prompt-injection hardening',
    },
  ],
  keyDecision: {
    heading: 'Make the rebuild the lead case study',
    paragraphs: [
      'The original plan was simple: rebuild the site, add a Sagent case study, ship. Instead I moved this project to position one, ahead of every client engagement.',
      'My newest client work is from 2024. This is from this month. Leading with it means the first thing a director sees is how I work now — directing a process, not executing a brief — instead of how I worked in 2017.',
    ],
  },
  whatWasHard: {
    paragraphs: [
      'The AI was a confident bad editor before it was a good one. Its first read of my portfolio was fluent and wrong in ways that were hard to spot — it never asked whether the USAA screens raised an NDA problem, it called my only visually strong case study the weakest, and it handed back Home → Work → About as if that were a strategy.',
      'So I stopped asking it for answers and made it argue with itself instead. Same with the writing: I had it draft one case study two ways, then rejected its recommendation to merge them and kept the leaner version — the merge would have read like a template again.',
      'And the whole thing is recursive. This page is hosted on the thing it describes, so the site gets judged before the argument gets made. Every wrap point and focus ring is a claim about my judgment, which meant no default got accepted just because it worked.',
    ],
  },
  outcomes: [
    {
      value: '96–100',
      label: 'Lighthouse · 9 routes',
      body: 'Performance 96–98. Accessibility, best practices, SEO all 100.',
    },
    {
      value: '2',
      label: 'Complete themes',
      body: 'Retro and Futuristic, one token layer apart.',
    },
    {
      value: '12',
      label: 'Documented components',
      body: 'Public Storybook, MDX docs, stories for every state.',
    },
    {
      value: '8 wks',
      label: 'Audit to launch-ready',
      body: 'Design system, case studies, and a live AI assistant.',
    },
  ],
  whatIdDoDifferently: {
    paragraphs: [
      'Write the documentation rules before the first prompt, not after the fourth session started cold. The project instructions and component guide exist because I kept re-explaining the same constraints — they should have been the first artifact, not a mid-project patch.',
      'And test on a real phone earlier. Emulated viewports caught most things and missed the one that mattered: on mobile, a reply streamed into a panel that had already collapsed and gone dead.',
    ],
  },
  // Placeholder slots — captions and positions are final, screenshots pending.
  // Each renders ImageCaption's dot-grid frame until `src` + `alt` are added.
  figures: [
    {
      section: 'process',
      tabLabel: 'portfolio rebuild · storybook',
      caption: 'The component library, documented as a public artifact rather than a dev tool.',
    },
    {
      section: 'decision',
      tabLabel: 'portfolio rebuild · two-pass audit',
      caption: "The adversarial pass, reviewing the first assessment's output.",
    },
    {
      section: 'hard',
      tabLabel: 'portfolio rebuild · redirecting claude',
      caption: 'Where the direction changed — a recommendation taken apart rather than accepted.',
    },
  ],
  chatSuggestions: [
    'What did Claude get wrong?',
    'How much of this did you actually decide?',
    'Why lead with this instead of client work?',
  ],
  nextCase: { title: 'Upfluent', href: '/work/upfluent' },
};
