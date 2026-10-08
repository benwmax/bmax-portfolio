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
    "I rebuilt this site with Claude as a collaborator, not an autopilot. Every strategic call stayed mine. The interesting part isn't that AI wrote code fast — it's where I had to overrule it.",
  meta: [
    { label: 'My role', value: 'Director · Sole designer' },
    { label: 'Method', value: 'AI-directed build' },
    { label: 'Lighthouse', value: '96–100', accent: true },
    { label: 'Build time', value: '8 weeks', accent: true },
  ],
  problem: {
    heading: 'A portfolio full of evidence and no argument',
    paragraphs: [
      "My old portfolio had strong outcomes on it — a $1B contract, a 23% revenue lift, conversion wins at USAA — and no reason to read them in order. The reader had to assemble the case themselves, and readers don't do that. The first AI audit missed it entirely and handed back surface fixes. It took a second adversarial pass, aimed at the first one's output, to name the real failure: evidence without argument is just a pile of stuff.",
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
        'Code, first drafts, audits, and surfacing things I had stopped seeing in my own work. Fast, often right, and never the decision-maker.',
    },
    {
      label: 'The distinction',
      content:
        "That split is the case study. A portfolio built by AI proves nothing. A portfolio directed through AI shows how I'd run a team.",
    },
  ],
  userContext: {
    paragraphs: [
      "The reader is a design director with about ninety seconds and four other tabs open. They aren't auditing my process. They're deciding whether to keep reading.",
      'That makes AI a liability as much as a selling point. The people curious about how I work with AI are the same people primed to spot slop, and one generic gradient ends the argument before it starts. The site has to look like someone with taste made it before anyone reads a word about method.',
    ],
  },
  process: [
    {
      phase: 'Audit',
      title: 'Two AI passes, stacked against each other',
      body: 'Ran a straight portfolio assessment, then pointed an adversarial review at its output. The second pass caught what the first missed: the unasked NDA question, a misread of which case study showed craft, and a generic site map dressed up as strategy.',
      artifact: 'Adversarial review · Positioning synthesis',
    },
    {
      phase: 'System',
      title: 'Tokens first, components second',
      body: 'Locked the palette and type scale into CSS custom properties before building a single component, then documented the library in a public Storybook. When I wanted a second full aesthetic, it cost a token override block instead of a refactor.',
      artifact: 'Design tokens · Storybook · 16 MDX docs',
    },
    {
      phase: 'Ship',
      title: "Build the AI, don't just claim it",
      body: 'Put a live assistant on the site so visitors can question the work instead of taking my word for it. Treating it as an attack surface paid off: the first version trusted the chat history the browser sent back, so a tampered client could fake a reply where the assistant had already broken character. History now lives on the server.',
      artifact: 'Edge function · Server-side session · Spend cap',
    },
  ],
  keyDecision: {
    heading: 'Make the rebuild the lead case study',
    paragraphs: [
      'The original plan was simple: rebuild the site, add a Sagent case study, ship. Instead I moved this project to position one, ahead of every client engagement.',
      'My newest client work is from 2024. This is from 2026. Leading with it means the first thing a director sees is how I work now — directing a process, not executing a brief.',
    ],
  },
  whatWasHard: {
    paragraphs: [
      'The AI was a confident bad editor before it was a good one. Its first audit never raised the NDA question, called my only visually strong case study the weakest, and offered Home → Work → About as strategy.',
      'So I made it argue with itself, and overruled it where taste was the call. It wanted to merge two drafts of a case study; I kept the leaner one. It wanted to leave a gap in the case study numbering to save churn; I renumbered, because a gap reads as something missing — and noticing that is the whole argument.',
      'And the whole thing is recursive. This page is hosted on the thing it describes, so every wrap point and focus ring is a claim about my judgment. No default got accepted just because it worked.',
    ],
  },
  outcomes: [
    {
      value: '96–100',
      label: 'Lighthouse · 8 pages',
      body: 'Performance 96–98. Accessibility, best practices, SEO all 100.',
    },
    {
      value: '2',
      label: 'Complete themes',
      body: 'Retro and Futuristic, one token layer apart.',
    },
    {
      value: '16',
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
      "And get it on a real phone sooner. Emulated viewports and scripted browsers caught almost everything, but they're the AI's view of the site, not a visitor's. A real device is the one check I can't delegate.",
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
