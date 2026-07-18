import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { CaseStudyPage } from '../pages/CaseStudyPage';
import type { CaseStudyContent } from '../pages/CaseStudyPage';

const meta = {
  title: 'Pages/Case Study',
  component: CaseStudyPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full case-study page template — 8 labeled sections, sticky sidebar TOC, ' +
          'scroll progress bar, artifact inset, outcome stat grid, and docked chat panel. ' +
          'Props are data-driven: pass any CaseStudyContent object to fill the template. ' +
          'The sidebar tracks scroll position; the chat panel is always docked on the right ' +
          'and hides below 1100px viewport width.',
      },
    },
    ai: {
      guidance:
        'The canonical case study page template. Always use this template — never build a case study page from scratch. Pass a CaseStudyContent object for each case study.',
      contentRules: [
        'CaseStudyContent has a strict 8-section schema: problem, role, userContext, process, keyDecision, whatWasHard, outcomes, whatIdDoDifferently.',
        'The 8 sections are mandatory and in that order — the sidebar TOC is generated from them.',
        'All 8 sections must be populated. Do not skip sections.',
        'heroTitle must be a problem statement: "Modernizing X without Y", "Making X learnable for Y". Never use it as a project description.',
        'heroSubtitle is 2–4 sentences that set up the problem context.',
        'meta array: role and method cells are plain values; outcome cells use accent: true for hard numbers only.',
      ],
      avoid: [
        'Never build a case study page layout from scratch — always use this template.',
        "Don't change the 8-section order.",
        "Don't use accent: true for role, method, or non-numeric meta values.",
        "Don't write heroTitle as a project description — it must be a problem statement.",
      ],
    },
  },
  argTypes: {
    layout: {
      control: 'radio',
      options: ['sidebar', 'linear'],
      description: 'Sidebar table of contents or linear single-column read.',
    },
    showChat: {
      control: 'boolean',
      description: 'Show or hide the docked chat panel.',
    },
  },
} satisfies Meta<typeof CaseStudyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─────────────────────────────────────────────────────────────
   USAA content — the reference case study for the template
───────────────────────────────────────────────────────────── */
const USAA: CaseStudyContent = {
  number: '04',
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

/* ─────────────────────────────────────────────────────────────
   STORIES
───────────────────────────────────────────────────────────── */

export const Default: Story = {
  name: 'USAA — Sidebar + Chat',
  parameters: {
    docs: {
      description: {
        story:
          'The canonical case study layout: sidebar TOC, 8 content sections, docked chat panel. ' +
          'USAA is the reference implementation — all other case studies follow this structure.',
      },
    },
    ai: {
      guidance:
        'The canonical case study page: sidebar TOC, 8 content sections, docked chat panel, scroll progress bar. Pass a CaseStudyContent object — never build the layout from primitives.',
      contentRules: [
        'chatSuggestions: 2–3 conversation starters relevant to this case study.',
        'nextCase: { title, href } links to the next case study in order.',
      ],
    },
  },
  args: {
    ...USAA,
    layout: 'sidebar',
    showChat: true,
    onChatSubmit: fn(),
  },
};

export const Linear: Story = {
  name: 'USAA — Linear (no sidebar)',
  args: {
    ...USAA,
    layout: 'linear',
    showChat: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Linear layout with no sidebar TOC and no chat panel — fallback for smaller viewports or when sidebar is not wanted.',
      },
    },
    ai: {
      guidance:
        'Fallback layout for narrower viewports or when sidebar is not needed. Use layout="linear" and showChat={false}.',
      avoid: [
        "Don't use linear as the default — sidebar + chat is the intended production experience.",
        "Don't omit sections just because the layout is linear — all 8 sections are still required.",
      ],
    },
  },
};

export const WithConversation: Story = {
  name: 'USAA — Conversation started',
  args: {
    ...USAA,
    layout: 'sidebar',
    showChat: true,
    onChatSubmit: fn(),
    initialMessages: [
      { role: 'user', text: 'Why two parallel tracks?' },
      {
        role: 'assistant',
        text: "Conversion was bleeding now — we couldn't wait 18 months for the new platform. The two-track approach let us apply research insights immediately to production A/B tests, so the business saw measurable results throughout instead of at the end.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Docked panel with an in-progress conversation pre-seeded.',
      },
    },
    ai: {
      guidance:
        'Case study page with the docked chat panel pre-populated. Use initialMessages to seed the conversation for demonstration or testing.',
      contentRules: [
        'Pass initialMessages as [{ role: "user", text: "..." }, { role: "assistant", text: "..." }].',
        'chatSuggestions on the case study become the initial prompt chips.',
      ],
    },
  },
};

export const Futuristic: Story = {
  name: 'USAA — Futuristic V2',
  parameters: {
    theme: 'futuristic',
    docs: {
      description: {
        story:
          'The canonical case study layout under the Futuristic theme — light surfaces, azure ' +
          'sidebar states and stats, gold tags, Space Grotesk headings. Token-driven; the chat ' +
          'message cursor becomes a pulsing dot via a scoped CSS override.',
      },
    },
    ai: {
      guidance:
        'Case study page under the futuristic theme — token-driven. Same structure rules as the retro stories.',
    },
  },
  args: {
    ...USAA,
    layout: 'sidebar',
    showChat: true,
    onChatSubmit: fn(),
  },
};
