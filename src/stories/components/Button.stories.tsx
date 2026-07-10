import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { Button } from '../../components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Three variants: primary (committed action — chat submit), secondary (bordered neutral), ghost (text-only nav-adjacent). Space Mono, all-caps, wide tracking — reads as a terminal command. Hover and focus are handled entirely by CSS; no JS state needed for those transitions.',
      },
    },
    ai: {
      guidance:
        'Button is Space Mono, all-caps, wide-tracked — it reads as a terminal command. Three variants cover every action context in the system. Never invent a fourth variant; never use sentence-case labels.',
      contentRules: [
        "All button text is ALL CAPS — the component renders text as provided; capitalize in the prop.",
        "Short commands only: 'ASK', 'VIEW CASE STUDY +', 'COMPOSE EMAIL +', 'COPY ADDRESS', 'COPY URL'.",
        'One primary button per surface maximum.',
      ],
      avoid: [
        "Don't invent a new Button variant — primary, secondary, ghost cover every case.",
        "Don't use Button for navigation links — use an <a> tag or pass href to render as anchor.",
      ],
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: 'Primary',
  parameters: {
    docs: {
      description: {
        story:
          'The primary call-to-action. Phosphor green text on deep-green background with a green-border border — high contrast against the dark surface. "ASK" is the canonical label: short, commanding, monospace. Hover brightens text to green-bright and lightens the fill to #0e2e14.',
      },
    },
    ai: {
      guidance:
        'Use for the single committed action in a form or panel — ASK, COMPOSE EMAIL, OPEN PROFILE. One primary per surface.',
      contentRules: [
        "Canonical chat submit label is 'ASK'.",
        "Contact page labels: 'COMPOSE EMAIL +' and 'OPEN PROFILE +'.",
      ],
      avoid: [
        "Don't place two primary buttons side by side.",
      ],
    },
  },
  args: {
    variant: 'primary',
    children: 'ASK',
  },
};

export const Secondary: Story = {
  name: 'Secondary',
  parameters: {
    docs: {
      description: {
        story:
          'Bordered neutral action. Secondary text color with a default border — lower visual weight than primary. Hover warms text to primary and strengthens the border. Used when an action is available but not the recommended next step.',
      },
    },
    ai: {
      guidance:
        'Use when an action is available but not the recommended next step — always paired with a primary nearby.',
      contentRules: [
        "Canonical secondary labels on Contact page: 'COPY ADDRESS', 'COPY URL'.",
        "Secondary label should describe the action differently from the primary — never echo it.",
      ],
      avoid: [
        "Don't use secondary as the only button on a surface — it needs a primary to defer to.",
      ],
    },
  },
  args: {
    variant: 'secondary',
    children: 'View Case Study',
  },
};

export const Ghost: Story = {
  name: 'Ghost',
  parameters: {
    docs: {
      description: {
        story:
          'Text-only with reduced horizontal padding. No fill, no border — just the green accent label. Used for navigation-adjacent actions (Back, More) where the choice is optional and should not compete with a primary nearby.',
      },
    },
    ai: {
      guidance:
        'Use for optional navigation-adjacent actions (Back, More, View) that should not compete visually with a nearby primary.',
      contentRules: [
        'Keep ghost labels to 1–2 words.',
      ],
      avoid: [
        "Don't pair ghost with primary in the same row — visual noise.",
      ],
    },
  },
  args: {
    variant: 'ghost',
    children: 'View Case Study',
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: {
        story:
          'Disabled applies to all variants at 45% opacity with not-allowed cursor. The chat submit disables when the input is empty — that is the only unconditional use. Prefer hiding over disabling when possible.',
      },
    },
    ai: {
      guidance:
        'Use when the action is temporarily unavailable. The chat ASK button when the input is empty is the only unconditional use of disabled.',
      avoid: [
        'Prefer hiding over disabling when possible.',
        "Don't disable a button because a field is unfilled — show validation errors on submit instead.",
      ],
    },
  },
  args: {
    variant: 'primary',
    children: 'ASK',
    disabled: true,
  },
};

export const Loading: Story = {
  name: 'Loading (in-flight)',
  parameters: {
    docs: {
      description: {
        story:
          'The ASK button while a request is in-flight — disabled at 45% opacity with not-allowed cursor. Identical to Disabled visually; the distinction is semantic. The ChatInput handles the loading affordance (sweep animation, "thinking" label); the button just steps back.',
      },
    },
    ai: {
      guidance:
        'Apply disabled to the ASK button while a chat response is in-flight. The ChatInput sweep animation is the loading affordance — the button just steps back.',
      avoid: [
        "Don't show a spinner inside the button.",
        "Don't change the label to 'Loading...' or 'Sending...' — the ChatInput handles messaging.",
      ],
    },
  },
  args: {
    variant: 'primary',
    children: 'ASK',
    disabled: true,
  },
};

export const Sizes: Story = {
  name: 'All sizes (primary)',
  parameters: {
    docs: {
      description: {
        story:
          'sm (10px / 0.45rem pad), md (11px / 0.6rem pad), lg (13px / 0.75rem pad). md is the default and the only size used in production currently. sm and lg are available for future contexts.',
      },
    },
    ai: {
      guidance:
        'md is the only size used in production. Reference this story to confirm size tokens if a future context needs sm or lg.',
      contentRules: [
        'md is the only size in production — sm and lg are available but not yet deployed.',
      ],
      avoid: [
        "Don't deviate from md without documenting the reason.",
      ],
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button {...args} size="sm">
        ASK
      </Button>
      <Button {...args} size="md">
        ASK
      </Button>
      <Button {...args} size="lg">
        ASK
      </Button>
    </div>
  ),
  args: {
    variant: 'primary',
    children: 'ASK',
  },
};
