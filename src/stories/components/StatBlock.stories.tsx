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
  },
} satisfies Meta<typeof StatBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'With context body',
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
