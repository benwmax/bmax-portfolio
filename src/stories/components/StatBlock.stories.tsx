import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatBlock, StatGrid } from '../../components/StatBlock';

const meta = {
  title: 'Components/StatBlock',
  component: StatBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Outcome stat cell — headline value in phosphor green, short label in ALL CAPS, ' +
          'optional one-line context body. ' +
          'The value uses display-weight Space Mono at 26px; it is the first thing the eye lands on. ' +
          'Label uses ultra-wide tracking tertiary text to subordinate visually. ' +
          'Use StatGrid to compose 2 or 3 cells with hairline borders between them. ' +
          'The grid background technique (background: border-subtle, gap: 1px) produces 1px hairlines ' +
          'without doubling borders — each cell has its own background that covers the grid color.',
      },
    },
    ai: {
      guidance:
        'Outcome stat cell — phosphor green headline value, ALL CAPS label, optional context body. Always use StatGrid wrapper for multiple cells. Never lay out cells manually.',
      contentRules: [
        'value: concrete number or short word — "+4–6%", "$1B", "< 3 mo.", "Scaled", "Shipped".',
        'label: ALL CAPS descriptor — "Conversion lift · P&C", "Contract won".',
        'body: one sentence of context — "Homeowners up 5%." Keep it short.',
        'Always use StatGrid wrapper — never lay out cells manually.',
      ],
      avoid: [
        "Don't use vague qualifiers as values: 'Improved', 'Better', 'Enhanced'.",
        "Don't force a body sentence if the value speaks for itself.",
        "Don't lay out StatBlock cells without StatGrid.",
      ],
    },
  },
} satisfies Meta<typeof StatBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'With context body',
  parameters: {
    ai: {
      guidance:
        'The standard stat cell: headline value + ALL CAPS label + one-line context body.',
    },
  },
  args: {
    value: '+4–6%',
    label: 'Conversion lift · P&C',
    body: 'Homeowners up 5%.',
  },
};

export const NoBody: Story = {
  name: 'No context body',
  args: {
    value: '$1B',
    label: 'Contract won',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When the value is self-explanatory, omit the body. The green number carries the weight.',
      },
    },
    ai: {
      guidance:
        "Use when the value is self-explanatory. '$1B' with 'Contract won' needs no body sentence.",
    },
  },
};

export const TextValue: Story = {
  name: 'Non-numeric value',
  args: {
    value: 'Scaled',
    label: 'Service blueprint',
    body: 'Running cross-org without dedicated headcount.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Not all outcomes are numbers. Short words ("Scaled", "Shipped", "Adopted") work in the value slot when the body adds the specifics.',
      },
    },
    ai: {
      guidance:
        'Short words ("Scaled", "Shipped", "Adopted") work in the value slot when the body adds the specifics.',
      contentRules: [
        'Non-numeric values: past tense or qualitative — "Scaled", "Adopted", "Launched", "Shipped".',
      ],
    },
  },
};

export const TwoColumn: Story = {
  name: '2-column grid — USAA outcomes',
  args: {
    value: '+4–6%',
    label: 'Conversion lift',
  },
  parameters: {
    docs: {
      description: {
        story:
          'StatGrid (2-col default) composing four StatBlock cells. The 1px hairline grid is the background color showing through 1px gaps.',
      },
    },
    ai: {
      guidance:
        'Use StatGrid (default 2-col) for 2 or 4 outcome cells. The 1px hairline is the background color showing through — never replicate this manually.',
      contentRules: [
        '2-col grid (default) holds 2 or 4 cells.',
      ],
    },
  },
  render: () => (
    <StatGrid>
      <StatBlock value="+4–6%" label="Conversion lift · P&C" body="Homeowners up 5%." />
      <StatBlock
        value="↓ Calls"
        label="Self-service tasks"
        body="Support call volume dropped for basic actions."
      />
      <StatBlock
        value="< 3 mo."
        label="Mobile redesign ship"
        body="Test-validated, under 3 months."
      />
      <StatBlock
        value="Scaled"
        label="Service blueprint"
        body="Running cross-org without dedicated headcount."
      />
    </StatGrid>
  ),
};

export const ThreeColumn: Story = {
  name: '3-column grid — Sabre outcomes',
  args: {
    value: '$1B',
    label: 'Contract won',
  },
  parameters: {
    docs: {
      description: {
        story: 'StatGrid cols={3} for cases with three headline stats.',
      },
    },
    ai: {
      guidance:
        'Use StatGrid cols={3} when there are exactly 3 headline outcome stats.',
      avoid: [
        "Don't force 3 cells when you only have 2 — use the default 2-col grid.",
      ],
    },
  },
  render: () => (
    <StatGrid cols={3}>
      <StatBlock value="$1B" label="Contract won" body="Sabre won the Flightcentre bid." />
      <StatBlock value="+23%" label="Revenue lift" />
      <StatBlock
        value="$800M"
        label="TTV gain, year one"
        body="Total Transaction Volume up 8.7%."
      />
    </StatGrid>
  ),
};
