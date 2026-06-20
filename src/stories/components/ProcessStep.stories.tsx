import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProcessStep, ProcessSteps } from '../../components/ProcessStep';

const meta = {
  title: 'Components/ProcessStep',
  component: ProcessStep,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Numbered process step card — phase label, title, body, and amber artifact/method tag. ' +
          'Rendered in a surface-background card with a 1px subtle border. ' +
          'The numbered chip uses green accent with a green-border outline — same green system as ' +
          'interactive elements, signalling progression. ' +
          'The amber artifact tag reads as "this is what we used," distinct from the green interactive system. ' +
          'Use ProcessSteps wrapper to compose multiple cards with the 2px seam between them.',
      },
    },
  },
} satisfies Meta<typeof ProcessStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Single step',
  args: {
    num: 1,
    phase: 'Assess',
    title: 'Baseline before redesign',
    body: 'Heuristic assessment and usability testing to get an honest read on what was actually broken — no redesigning before we knew what was wrong.',
    artifact: 'Heuristic review · Usability testing',
  },
};

export const List: Story = {
  name: 'List of steps',
  parameters: {
    docs: {
      description: {
        story:
          'Three steps composed with the ProcessSteps wrapper. ' +
          'The 2px gap between cards creates a faint seam that groups them visually without merging borders.',
      },
    },
  },
  render: () => (
    <ProcessSteps>
      <ProcessStep
        num={1}
        phase="Assess"
        title="Baseline before redesign"
        body="Heuristic assessment and usability testing to get an honest read on what was broken — no redesigning before we knew what was wrong."
        artifact="Heuristic review · Usability testing"
      />
      <ProcessStep
        num={2}
        phase="Align"
        title="Sprint to surface KPIs"
        body="Cross-functional design sprint to surface competing stakeholder priorities, size up fintech competition, and get testable directions on the table fast."
        artifact="Design sprint"
      />
      <ProcessStep
        num={3}
        phase="Build"
        title="Two parallel tracks"
        body="Legacy A/B tests shipped on the old stack while the full redesign ran in parallel. Measurable wins in production without waiting 18 months."
        artifact="A/B testing · Service blueprint"
      />
    </ProcessSteps>
  ),
};

export const FieldResearch: Story = {
  name: 'Field research step',
  args: {
    num: 2,
    phase: 'Discover',
    title: 'Watched agents book hotels live',
    body: "They kept leaving the tool mid-call for Expedia and Hotels.com — photos, amenities, neighborhoods. The data existed in the XML; it just wasn't surfaced.",
    artifact: 'Field observation · Analytics review',
  },
  parameters: {
    docs: {
      description: {
        story: 'The body should read like something that happened — not a methodology list. One observation beats a bullet of frameworks.',
      },
    },
  },
};
