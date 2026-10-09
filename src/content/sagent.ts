import type { CaseStudyContent } from '../pages/CaseStudyPage';

// A teaser, not the case study: Ben listed Sagent on 2026-10-08 as a short
// preview until the Phase 1C brain dump is done. `teaser` makes CaseStudyPage
// render only Problem, Role, and Outcomes plus the in-progress note. Every line
// here restates facts already on the Resume and About pages — nothing new is
// claimed. The unrendered sections are left empty on purpose so no holding copy
// can leak onto the page. See decisions.md 2026-10-08.
export const sagentData: CaseStudyContent = {
  number: '02',
  dateRange: '2021–22',
  company: 'Sagent',
  heroTitle: 'Leading design on a mortgage platform when the director disappeared.',
  heroSubtitle:
    'Sagent was mid-rebuild on a mortgage servicing platform. The design director departed unexpectedly. I stepped up — co-leading a four-person team across twelve business teams simultaneously, no playbook.',
  meta: [
    { label: 'My role', value: 'Principal UX Designer · Co-lead' },
    { label: 'Team', value: '4 designers', accent: true },
    { label: 'Business teams', value: '12 coordinated', accent: true },
  ],
  problem: {
    heading: 'A platform rebuild that lost its design lead',
    paragraphs: [
      'Sagent was rebuilding its mortgage servicing platform, with design work spread across twelve business teams. Then the design director departed unexpectedly, mid-rebuild.',
      'Four designers, twelve teams, and nobody running design strategy. Someone had to.',
    ],
  },
  role: [
    {
      label: 'Owned',
      content:
        'Co-led the four-person design team after the design director departed. Ran strategic planning, mentored junior designers, and coordinated across twelve business teams simultaneously.',
    },
  ],
  userContext: { paragraphs: [] },
  process: [],
  keyDecision: { heading: '', paragraphs: [] },
  whatWasHard: { paragraphs: [] },
  outcomes: [
    { value: '4', label: 'Designers led', body: 'Co-led the full design team.' },
    { value: '12', label: 'Business teams', body: 'Coordinated across simultaneously.' },
    { value: 'Stepped up', label: 'When director departed', body: 'No gap in design leadership.' },
  ],
  whatIdDoDifferently: { paragraphs: [] },
  teaser:
    "This is a preview. The full case study — how the team kept twelve business teams moving without a director, what I'd do differently — is being written. Ask the assistant in the meantime, or get in touch.",
  chatSuggestions: [
    'What happened when the director left?',
    'How did you coordinate 12 teams?',
    'What was the hardest part of the leadership transition?',
  ],
  nextCase: { title: 'USAA', href: '/work/usaa' },
};
