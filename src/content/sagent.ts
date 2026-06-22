import type { CaseStudyContent } from '../pages/CaseStudyPage';

export const sagentData: CaseStudyContent = {
  number: '03',
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
    heading: 'Case study in progress.',
    paragraphs: ['This case study is being written. Full content coming soon.'],
  },
  role: [
    {
      label: 'Owned',
      content:
        'Co-led the four-person design team after the design director departed. Ran strategic planning, mentored junior designers, and coordinated across twelve business teams simultaneously.',
    },
  ],
  userContext: {
    paragraphs: ['Case study in progress.'],
  },
  process: [
    {
      phase: 'Lead',
      title: 'Case study in progress.',
      body: 'Full process documentation coming soon.',
      artifact: 'In progress',
    },
  ],
  keyDecision: {
    heading: 'Case study in progress.',
    paragraphs: ['Full content coming soon.'],
  },
  whatWasHard: {
    paragraphs: ['Case study in progress.'],
  },
  outcomes: [
    { value: '4', label: 'Designers led', body: 'Co-led the full design team.' },
    { value: '12', label: 'Business teams', body: 'Coordinated across simultaneously.' },
    { value: 'Stepped up', label: 'When director departed', body: 'No gap in design leadership.' },
  ],
  whatIdDoDifferently: {
    paragraphs: ['Case study in progress.'],
  },
  chatSuggestions: [
    'What happened when the director left?',
    'How did you coordinate 12 teams?',
    'What was the hardest part of the leadership transition?',
  ],
  nextCase: { title: 'USAA', href: '/work/usaa' },
};
