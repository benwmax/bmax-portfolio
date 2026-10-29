import type { CaseStudyContent } from '../pages/CaseStudyPage';

// Written 2026-10-29 from Ben's own account (docs/case-studies/sagent.md), replacing the
// 2026-10-08 teaser. Deliberately has no `figures`: the work is under NDA and no images
// of it can be shown, so the page carries the story in text and numbers alone. The
// section that would be empty ("What I'd do differently") is dropped by CaseStudyPage
// rather than filled — Ben had nothing to add. See decisions.md 2026-10-29.
export const sagentData: CaseStudyContent = {
  number: '02',
  dateRange: '2024–present',
  company: 'Sagent',
  heroTitle: 'Ten designers, fourteen teams, and no design leader for nine months.',
  heroSubtitle:
    'I led the team through the gap, then used AI to ship a workflow builder in two days.',
  meta: [
    { label: 'My role', value: 'Principal UX Designer · Co-lead' },
    { label: 'Scope', value: '14 teams · 3 products' },
    { label: 'Team', value: '10 → 6 designers', accent: true },
    { label: 'Workflow builder', value: '2 days', accent: true },
  ],
  problem: {
    heading: 'A stretched team, then no leader',
    paragraphs: [
      'Dara is a suite of mortgage servicing products. When I joined as Principal, ten designers supported fourteen business teams across three products.',
      "A month later our design leader left, and the other principals followed. The company didn't backfill for almost nine months.",
    ],
  },
  role: [
    {
      label: 'Owned',
      content:
        'Led the team through the gap: our ways of working, design principles, and processes. Led two designers on Defaults, owned the Attorney Portal and its design system, and designed the first Workflow UI.',
    },
    {
      label: 'Shared',
      content:
        'When the company promoted a designer from within, I co-led the team with him. I vetted and interviewed designers and helped plan headcount and resourcing.',
    },
    {
      label: 'Not mine',
      content:
        "Hiring decisions and the manager title. I advised on Roots DS, the system behind Dara Core, but didn't design it.",
    },
    {
      label: 'AI',
      content:
        'Taught designers to use AI tooling in Figma and in code, and built tools that help product partners write PRDs and manage projects.',
    },
  ],
  userContext: {
    paragraphs: [
      'Defaults is the product for managing mortgages in default. Workflow is a feature of Dara Core that coordinates tasks across the system and guides users through working them, configured to match how each servicer runs its business.',
      'Attorneys were the third audience. Their old tool covered several job roles at once and was complex. They needed one focused tool built around their work.',
    ],
  },
  process: [
    {
      phase: 'Defaults',
      title: 'Two designers, hundreds of improvements',
      body: 'I led two designers on Defaults. In under a year we shipped hundreds of UI enhancements and several net-new features.',
      artifact: 'Enhancements · New features',
    },
    {
      phase: 'Portal',
      title: 'A design system first, then the portal',
      body: 'The company had no approved design system, so I built a Figma library from scratch, with every component and state documented for developers. Then I designed the portal mobile-up in under four months, around legacy systems. A few dozen attorneys were interviewed, and a few dozen beta users gave feedback.',
      artifact: 'Figma library · Guerrilla testing · Beta',
    },
    {
      phase: 'Workflow',
      title: 'A builder that outgrew its components',
      body: 'I worked with architects, developers, and product from the start and designed the first Workflow builder. It was built from our existing components, and it degraded fast as capabilities piled on.',
      artifact: 'Workflow builder V1',
    },
  ],
  keyDecision: {
    heading: 'Build the real thing instead of waiting for capacity',
    paragraphs: [
      'On my own initiative I used AI to build a node-diagram prototype, so users could see how tasks connect. It landed well. Our lead devs estimated three-plus sprints to build it, because it was not built on our stack, and with no capacity it was shelved.',
      "So with the product owners' support I went further: I used AI to code a working builder on our real components and APIs. After the demo, our developers reviewed the code and decided they could finish it in two days.",
      'They were reviewing code that already ran, not reinterpreting a design. That is what collapsed the estimate.',
    ],
  },
  whatWasHard: {
    paragraphs: [
      'Headcount only went one way. Ten designers when I joined, eight a year in, six now, and fourteen teams still needed us. With product, I drew a line between work that needs designed screens and work that can be assembled from features and Roots components in Storybook. It cut production work and kept time for design thinking.',
      "AI didn't finish the builder either. Developers fixed the API and data connections and added validations from the workflow engine that I had missed. I wrote a doc on how it was built, written so their own AI tooling could pick it up faster.",
    ],
  },
  outcomes: [
    {
      value: '2 days',
      label: 'Workflow builder, live',
      body: 'Estimated at 3+ sprints. Now in use, after a few days of QA.',
    },
    {
      value: '< 4 mo.',
      label: 'Attorney Portal, designed',
      body: 'Mobile to desktop. Beta users praised how focused and usable it is.',
    },
    {
      value: '100s',
      label: 'Defaults UI enhancements',
      body: 'Plus several net-new features, in under a year, with two designers.',
    },
    {
      value: '10 → 6',
      label: 'Designers, same 14 teams',
      body: 'The portal library will migrate onto Roots over time.',
    },
  ],
  whatIdDoDifferently: { paragraphs: [] },
  chatSuggestions: [
    'How did you build the workflow builder in two days?',
    'What did you do when the design leader left?',
    'How did you keep delivering as the team shrank?',
  ],
  nextCase: { title: 'USAA', href: '/work/usaa' },
};
