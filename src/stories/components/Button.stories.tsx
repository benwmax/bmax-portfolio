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
          'Two variants: primary for committed actions (chat submit, form submit) and ghost for secondary navigation. Space Mono, all-caps label, wide tracking — reads as a terminal command rather than a generic UI button.',
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
  parameters: {
    docs: {
      description: {
        story:
          'The primary call-to-action. Gets phosphor green foreground on the dark green background — high contrast, intentional visual weight. "ASK" is the canonical primary label in this system: short, commanding, monospace. Used for chat submit and form submissions.',
      },
    },
  },
  args: {
    variant: 'primary',
    children: 'ASK',
  },
};

export const Ghost: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Secondary actions that should not compete with primary. No fill, no border — just the label. Used for "View Case Study" and navigation-adjacent actions where the choice is optional. When primary and ghost appear together, primary wins the visual scan immediately.',
      },
    },
  },
  args: {
    variant: 'ghost',
    children: 'View Case Study',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Disabled applies to both variants. The chat submit disables when the input is empty or a request is in-flight — those are the only two disabled states this system uses. Disabled is a last resort; prefer hiding or contextual logic over greying out.',
      },
    },
  },
  args: {
    variant: 'primary',
    children: 'ASK',
    disabled: true,
  },
};
