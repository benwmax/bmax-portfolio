import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProcessStep, ProcessSteps } from '../../components/ProcessStep';

const meta = {
  title: 'Components/ProcessStep',
  component: ProcessStep,
  parameters: {
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
    ai: {
      guidance:
        'Numbered process step cards for case study process sections. Always use ProcessSteps wrapper for multiple steps. Body reads like something that happened — not a methodology list.',
      contentRules: [
        'num: 1-based integer.',
        'phase: one-word label — "Assess", "Align", "Build", "Discover", "Define", "Test".',
        'title: one-line step label.',
        'body: 1–3 sentences describing what actually happened. First person or observational.',
        'artifact: method names joined with · — "Field observation · Analytics review".',
        'Always wrap steps in ProcessSteps — never lay out cards manually.',
      ],
      avoid: [
        "Don't write body as a methodology list: 'Conducted X methodology'. Write what happened: 'They kept leaving the tool mid-call'.",
        "Don't exceed 5 steps — the process section should be scannable.",
        "Don't use ProcessSteps outside of a case study process section.",
      ],
    },
  },
} satisfies Meta<typeof ProcessStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Single step',
  parameters: {
    ai: {
      guidance:
        'A single process step. Rarely used alone — typically composed in a ProcessSteps list of 2–4 steps.',
    },
  },
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
  args: {
    num: 1,
    phase: 'Phase',
    title: 'Title',
    body: 'Body',
    artifact: 'Artifact',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Three steps composed with the ProcessSteps wrapper. ' +
          'The 2px gap between cards creates a faint seam that groups them visually without merging borders.',
      },
    },
    ai: {
      guidance:
        'The canonical 3-step process section. Wrap all steps in ProcessSteps — never lay out cards manually.',
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
        story:
          'The body should read like something that happened — not a methodology list. One observation beats a bullet of frameworks.',
      },
    },
    ai: {
      guidance:
        'Reference for how to write the body — it reads as an observation, not a methodology. "They kept leaving the tool mid-call for Expedia" not "Conducted field observation sessions".',
      contentRules: [
        'One sharp observation beats a bullet list of frameworks.',
      ],
    },
  },
};
