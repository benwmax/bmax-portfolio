// Ben's work history, newest first. Shared by the Resume page and the chat's
// career timeline widget (src/chat/widgets) so the two can't drift — the case
// study card list drifted across four copies before it was centralized
// (decisions.md 2026-07-29), and this is the same fix applied early.

export const EXPERIENCE = [
  {
    role: 'Principal UX Designer',
    company: 'Self-directed — Portfolio Rebuild',
    dates: '2026',
    sector: 'Meta',
    outcomes: [
      'Directed a full portfolio rebuild using Claude as AI collaborator.',
      'Designed and built the component system, page templates, and AI chat feature using React, Tailwind, and Storybook 8.',
    ],
  },
  {
    role: 'Principal UX Designer · Co-lead',
    company: 'Sagent',
    dates: '2024–present',
    sector: 'Mortgage technology',
    outcomes: [
      'Led a design team of 10 (now 6) supporting 14 business teams across 3 mortgage servicing products, through nine months with no design director; now co-lead.',
      'Used AI to build a working Workflow builder on real components and APIs; developers finished it in 2 days against a 3+ sprint estimate. Built the Attorney Portal and its design system in under four months.',
    ],
  },
  {
    role: 'Lead UX Designer',
    company: 'Upfluent',
    dates: '2021–24',
    sector: 'Fintech',
    outcomes: [
      'Designed a hybrid AI chatbot that functions as a financial advisor: conversational interface with real control actions.',
      'Reduced signup flow length by 30% through targeted research and iterative testing.',
    ],
  },
  {
    role: 'UX Designer',
    company: 'Market Rebellion',
    dates: '2021–22',
    sector: 'Financial trading',
    outcomes: [
      'Designed retail-facing options trading tools for a platform co-founded by veteran traders — expert-to-novice translation at its hardest.',
    ],
  },
  {
    role: 'Lead UX Designer — P&C',
    company: 'USAA',
    dates: '2017–21',
    sector: 'Insurance',
    outcomes: [
      'Led UX for the P&C modernization initiative: heuristic review, design sprint, and iterative redesign of the core insurance experience.',
      'Conversion +4–6% across redesigned flows without removing the depth long-time members relied on.',
    ],
  },
  {
    role: 'Senior UX Designer',
    company: 'Sabre',
    dates: '2015–18',
    sector: 'Travel technology',
    outcomes: [
      'Redesigned the NDC booking channel; work contributed to winning the $1B Flightcentre contract and a +23% revenue lift for Flightcentre.',
      'Built complex tools for travel agents who need speed, accuracy, and zero-tolerance for UX errors.',
    ],
  },
  {
    role: 'UX Designer',
    company: 'AT&T',
    dates: 'Mar–Oct 2015',
    sector: 'Telecom enterprise',
    outcomes: [
      'Analyzed end-to-end B2B user registration across all AT&T products and architected solutions covering online and offline touchpoints.',
      'Created designs for B2B internet and phone signup and servicing experiences in collaboration with product, engineering, and research.',
    ],
  },
  {
    role: 'UX/UI Designer',
    company: 'PeopleAnswers',
    dates: 'Oct 2014–Mar 2015',
    sector: 'HR technology',
    outcomes: [
      'Established the UX department and designed HR tools for hiring and employee management.',
      'Researched multi-lingual best practices for an internationalization project spanning six countries; provided UX recommendations across all markets.',
    ],
  },
  {
    role: 'UX Designer',
    company: 'Aperia Solutions',
    dates: 'May–Oct 2014',
    sector: 'Fintech / compliance',
    outcomes: [
      'Helped establish the UX department and overhauled B2B financial and compliance applications used by millions of merchants nationwide.',
      'Reduced call-center costs and improved call-time efficiency by studying employee workflows and redesigning internal tools; led PCI compliance software redesign through usability testing with beta clients.',
    ],
  },
] as const;
