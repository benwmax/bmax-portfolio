import type { CaseStudyContent } from '../pages/CaseStudyPage';

export const portfolioRebuildData: CaseStudyContent = {
  number: '01',
  dateRange: '2026',
  company: 'Portfolio Rebuild',
  heroTitle: 'Directing an AI to build a portfolio — and making the process the case study.',
  heroSubtitle:
    "This site was built with Claude as a collaborator. The work isn't just the portfolio — it's the demonstration that a senior designer can direct AI tooling deliberately, at Principal level, without handing over judgment.",
  meta: [
    { label: 'My role', value: 'Principal UX Designer · Director' },
    { label: 'Method', value: 'AI-directed build' },
    { label: 'Stack', value: 'React · Vite · TypeScript', accent: true },
    { label: 'Status', value: 'In progress', accent: true },
  ],
  problem: {
    heading: 'Case study in progress.',
    paragraphs: [
      'This case study documents the process of building this portfolio using Claude as a collaborator. Full write-up is Phase 7 — after launch.',
    ],
  },
  role: [
    {
      label: 'Owned',
      content:
        'Every strategic, visual, and content decision. Claude handled code generation, writing drafts, and surfacing blind spots. The distinction is the point.',
    },
  ],
  userContext: {
    paragraphs: ['Case study in progress.'],
  },
  process: [
    {
      phase: 'Direct',
      title: 'Case study in progress.',
      body: 'Full process documentation coming after launch.',
      artifact: 'In progress',
    },
  ],
  keyDecision: {
    heading: 'Case study in progress.',
    paragraphs: ['Full content coming after launch.'],
  },
  whatWasHard: {
    paragraphs: ['Case study in progress.'],
  },
  outcomes: [
    { value: 'Live', label: 'Site shipped', body: 'viewbens.work' },
    { value: 'Public', label: 'Storybook', body: 'system.viewbens.work' },
    { value: 'Documented', label: 'AI process', body: 'End-to-end build log.' },
  ],
  whatIdDoDifferently: {
    paragraphs: ['Case study in progress.'],
  },
  chatSuggestions: [
    'How did you direct Claude?',
    'What did Claude get wrong?',
    'Is this site AI-generated?',
  ],
  nextCase: { title: 'Upfluent', href: '/work/upfluent' },
};
