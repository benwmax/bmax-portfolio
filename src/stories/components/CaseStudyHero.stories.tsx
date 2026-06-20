import type { Meta, StoryObj } from '@storybook/react-vite';
import { CaseStudyHero } from '../../components/CaseStudyHero';

const meta = {
  title: 'Components/CaseStudyHero',
  component: CaseStudyHero,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Case study page header — case number, date range, H1 problem statement, ' +
          'subtitle, and a bordered meta grid for role, method, and headline outcome stats. ' +
          'The H1 is always a problem statement ("making X learnable") not a project description ("redesigned X"). ' +
          'Meta cells with accent=true render the value in phosphor green at display weight — ' +
          'reserved for hard numbers ($1B, +23%). Standard meta cells (role, method) use mono-ui in primary text.',
      },
    },
    ai: {
      guidance:
        'Case study page header. The H1 (title prop) is always a problem statement, never a project description. accent:true on meta cells is reserved for hard numbers only.',
      contentRules: [
        'title must be a problem statement: "Modernizing X without Y", "Making X learnable".',
        'Never write title as a project description: "Redesigned the USAA P&C experience".',
        'subtitle: one paragraph, 2–4 sentences setting up the problem context.',
        'accent:true only for hard numbers: "$1B", "+23%", "+4–6%", "< 3 mo.".',
        'Standard meta cells (role, method) use no accent.',
        'Target: 4 meta cells (role, method, 2 outcome stats). Can flex to 2 cells if outcomes unavailable.',
      ],
      avoid: [
        "Don't use accent:true for non-numeric values like 'Lead UX Designer' or method names.",
        "Don't list more than 2 accent stats.",
        "Don't pass empty placeholder outcome stats — omit those cells entirely.",
      ],
    },
  },
} satisfies Meta<typeof CaseStudyHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'USAA',
  parameters: {
    ai: {
      guidance:
        'The standard 4-cell meta grid pattern: role, method, and two outcome stats. Target layout for all case studies with measurable outcomes.',
    },
  },
  args: {
    number: '04',
    dateRange: '2018–2020',
    title: 'Modernizing P&C insurance without losing the members who trusted it.',
    subtitle:
      "USAA's digital experience was showing its age. Mobile acquisition was leaking, members were calling support for things they should've done themselves, and fintech competitors were making insurance feel easy. We had the trust advantage. The experience wasn't holding up its end.",
    meta: [
      { label: 'My role', value: 'Lead UX Designer · P&C' },
      { label: 'Method', value: 'Heuristic review · Design sprint' },
      { label: 'Conversion', value: '+4–6%', accent: true },
      { label: 'Ship time', value: '< 3 mo.', accent: true },
    ],
  },
};

export const Sabre: Story = {
  name: 'Sabre — high-stakes stats',
  parameters: {
    docs: {
      description: {
        story:
          'Both accent slots filled with hard numbers. The green display-weight values are the first thing the eye lands on — the role and method cells subordinate.',
      },
    },
    ai: {
      guidance:
        'Reference when both outcome stat slots are filled with hard numbers — both accent slots active.',
      contentRules: [
        'accent:true for "$1B", "+23%", "+4–6%", "< 3 mo." — not for role or method labels.',
        'The green display-weight values are the first thing the eye lands on.',
      ],
    },
  },
  args: {
    number: '01',
    dateRange: '2014–2017',
    title: 'Making a command-line tool learnable — without slowing the veterans.',
    subtitle:
      'Agents booked travel by typing cryptic command strings. Proficiency took weeks, mastery months. Flightcentre put the platform out to bid: make it learnable fast, without taking power away from the veterans.',
    meta: [
      { label: 'My role', value: 'UX Designer · Hotel' },
      { label: 'Method', value: 'Field research · Buy a Feature' },
      { label: 'Contract', value: '$1B', accent: true },
      { label: 'Revenue', value: '+23%', accent: true },
    ],
  },
};

export const TwoMetaCells: Story = {
  name: 'Two meta cells',
  parameters: {
    docs: {
      description: {
        story:
          'When outcome data is not yet available or not applicable, the meta grid flexes gracefully to two wider cells.',
      },
    },
    ai: {
      guidance:
        'Use when outcome data is not yet available. The meta grid flexes to two wider cells — pass only role and method.',
      avoid: [
        "Don't pass empty or placeholder outcome stats — omit those cells entirely.",
      ],
    },
  },
  args: {
    number: '02',
    dateRange: '2023–2024',
    title: 'A hybrid AI chatbot: talk like an advisor, act with real controls.',
    subtitle:
      'Retail traders needed professional-grade insight without needing to be professionals. The solution was a chatbot that could speak naturally and execute trades — without ever losing the guardrails.',
    meta: [
      { label: 'My role', value: 'Lead UX Designer' },
      { label: 'Method', value: 'Concept testing · Prototyping' },
    ],
  },
};
