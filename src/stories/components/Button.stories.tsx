import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { Button } from '../../components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Three variants: primary (committed action — chat submit), secondary (bordered neutral), ghost (text-only nav-adjacent). Space Mono, all-caps, wide tracking — reads as a terminal command. Hover and focus are handled entirely by CSS; no JS state needed for those transitions.',
      },
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
    layout: 'padded',
    docs: {
      description: {
        story:
          'sm (10px / 0.45rem pad), md (11px / 0.6rem pad), lg (13px / 0.75rem pad). md is the default and the only size used in production currently. sm and lg are available for future contexts.',
      },
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
