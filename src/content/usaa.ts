import type { CaseStudyContent } from '../pages/CaseStudyPage';

export const usaaData: CaseStudyContent = {
  number: '03',
  dateRange: '2018–2020',
  company: 'USAA',
  heroTitle: 'Modernizing P&C insurance without losing the members who trusted it.',
  heroSubtitle:
    "USAA's digital experience was showing its age. Mobile acquisition was leaking, members were calling support for things they should've done themselves, and fintech competitors were making insurance feel easy. We had the trust advantage. The experience wasn't holding up its end.",
  meta: [
    { label: 'My role', value: 'Lead UX Designer · P&C' },
    { label: 'Method', value: 'Heuristic review · Design sprint' },
    { label: 'Conversion', value: '+4–6%', accent: true },
    { label: 'Ship time', value: '< 3 mo.', accent: true },
  ],
  problem: {
    heading: "An experience that hadn't kept pace",
    paragraphs: [
      "USAA's digital products were built in the early 2000s and it showed. Mobile insurance shopping was growing fast, acquisition was leaking, and members were calling support for things they should have been able to do themselves.",
      "Meanwhile, Lemonade and its fintech cousins were making insurance feel easy — fast, mobile-first, built for a generation that didn't want to talk to anyone. USAA still had the trust advantage. The experience wasn't holding up its end.",
    ],
  },
  role: [
    {
      label: 'Owned',
      content:
        'Lead designer on P&C insurance. I sat between the team and our Director — defining project strategy, running workshops, leading stakeholder meetings, mentoring junior designers, and making the work happen.',
    },
    {
      label: 'Director layer',
      content: 'My Director handled the org layer. I handled everything in the room.',
    },
    {
      label: 'In the room',
      content:
        'Ran a design sprint with cross-functional stakeholders to align on KPIs, size up the competition, and get testable directions on the table fast.',
    },
  ],
  userContext: {
    paragraphs: [
      "USAA's membership was quietly shifting. The military core — active and former service members — was giving way to their families: spouses, kids, a generation that had never served and didn't carry the same institutional loyalty or privacy concerns.",
      'That created a genuine tension. Service members wanted formality and discretion. Their families wanted a normal consumer app. Modernize and you risk alienating longtime members; stand still and you lose the next generation.',
      "Military-specific edge cases weren't really edge cases: deployments, relocations, a spouse managing everything solo. These scenarios showed up constantly and the product mostly ignored them.",
    ],
  },
  process: [
    {
      phase: 'Assess',
      title: 'Baseline before redesign',
      body: 'Heuristic assessment and usability testing to get an honest read on what was actually broken — no redesigning before we knew what was wrong.',
      artifact: 'Heuristic review · Usability testing',
    },
    {
      phase: 'Align',
      title: 'Sprint to surface KPIs',
      body: 'Cross-functional design sprint to surface competing stakeholder priorities, size up fintech competition, and get testable directions on the table fast.',
      artifact: 'Design sprint',
    },
    {
      phase: 'Build',
      title: 'Two parallel tracks',
      body: 'Legacy A/B tests — built on the old stack, informed by new research — shipped quickly while the full redesign continued in the background. Measurable wins in production without waiting 18 months.',
      artifact: 'A/B testing · Service blueprint',
    },
  ],
  keyDecision: {
    heading: 'Ship on the old stack now, redesign in parallel',
    paragraphs: [
      "Running legacy improvements and the full redesign simultaneously instead of waiting for the new platform. It would've been easier to wait. Instead we pulled insights from the redesign and applied them immediately to production A/B tests — delivering measurable wins throughout.",
      'The two-track approach meant the business never had to wait 18 months for a big reveal. Results showed up in production from week one.',
    ],
    artifactLabel: 'A/B test → redesign pipeline',
  },
  whatWasHard: {
    paragraphs: [
      'Four months into a renters insurance overhaul — research done, concepts tested, final approach nearly dev-ready — our primary stakeholder got reorganized out. New exec, new team, different ideas.',
      "They hired a third-party agency to redo the work and handed us an advisory role for the next twelve months. The agency's final output was nearly identical to ours.",
      "Managing that moment was more about leadership than design. The work was gone. The team felt it. Keeping people motivated while chaperoning someone else's version of your own project is a specific kind of hard. We did it. Leadership noticed. Steps were taken.",
    ],
  },
  outcomes: [
    { value: '+4–6%', label: 'Conversion lift · P&C', body: 'Homeowners up 5%.' },
    {
      value: '↓ Calls',
      label: 'Self-service tasks',
      body: 'Support call volume dropped for basic actions.',
    },
    { value: '< 3 mo.', label: 'Mobile redesign ship', body: 'Test-validated, under 3 months.' },
    {
      value: 'Scaled',
      label: 'Service blueprint',
      body: 'Running cross-org without dedicated headcount.',
    },
  ],
  whatIdDoDifferently: {
    paragraphs: [
      'Start the service blueprint work earlier — run it alongside the initial assessment instead of after it. The ecosystem mapping uncovered regulatory dependencies and call center gaps that affected decisions already in flight.',
      "Knowing the operational layer sooner would've sharpened the problem definition from day one.",
    ],
  },
  chatSuggestions: [
    'Why two parallel tracks?',
    'What happened with the agency?',
    'How did you measure conversion?',
  ],
  nextCase: { title: 'Sabre', href: '/work/sabre' },
};
