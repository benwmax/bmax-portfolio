import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusIndicator } from '../../components/StatusIndicator';

const meta = {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Availability signal — typically "Available for work" or "Currently engaged." The dot uses the phosphor green bright (#00ff5e) in the online state, matching the cursor blink and input caret. In its styled form, it pulses with the same keyframe as the terminal prompt cursor: green, blinking, live.',
      },
    },
  },
} satisfies Meta<typeof StatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Available state. The dot will carry the cursor-blink animation when styled — same CSS keyframe used for the terminal prompt cursor. The connection is intentional: green, blinking, ready is the same signal in both contexts.',
      },
    },
  },
  args: {
    status: 'online',
    label: 'Available for work',
  },
};

export const Offline: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Unavailable or currently engaged. Dot goes muted, no animation. Same component structure as online — only data-status changes. The label changes via props. This state is rarely shown; the site is optimized for the available case.',
      },
    },
  },
  args: {
    status: 'offline',
    label: 'Currently engaged',
  },
};
