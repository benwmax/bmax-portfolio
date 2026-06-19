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
          'Availability signal below the chat input — 7px dot, IBM Plex Mono 10px, wide-tracked uppercase tertiary text. The online dot uses green-bright (#00ff5e), the same color as the cursor blink and input caret. Offline drops everything to disabled-text so absence reads as intentional, not broken.',
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
          'Available state. The dot carries the cursor-blink animation — same 1.4s step-end keyframe as the terminal prompt cursor. Reads "green, blinking, ready" which is the same signal in both contexts. Label is tertiary (#6b7055) so it subordinates visually to the input above it.',
      },
    },
  },
  args: {
    status: 'online',
    label: 'Online · assistant ready · ~2s response',
  },
};

export const Offline: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Unavailable state. Dot drops to text-disabled (#3d4035), blink stops. Label color matches the dot — both elements sink together so the offline state reads as a single quiet signal, not two competing pieces of text.',
      },
    },
  },
  args: {
    status: 'offline',
    label: 'Offline · responses unavailable',
  },
};

export const Warning: Story = {
  name: 'Warning (reserved)',
  parameters: {
    docs: {
      description: {
        story:
          'Reserved state — amber dot, same tertiary label. Not used in the chat widget (only online/offline appear there) but available for future contexts: rate-limit approaching, degraded response time, or a slow-mode flag. The dot uses status-warning (#c08820) matching the amber accent family.',
      },
    },
  },
  args: {
    status: 'warning',
    label: 'Degraded · slower than usual',
  },
};

export const ErrorState: Story = {
  name: 'Error (reserved)',
  parameters: {
    docs: {
      description: {
        story:
          'Error state — red dot (#e05050), same tertiary label. Reserved for actual failure: API unreachable, auth error. The only use of red in the system — appears nowhere else. Not shown in the UI by default; surfaces programmatically when the endpoint fails.',
      },
    },
  },
  args: {
    status: 'error',
    label: 'Error · assistant unavailable',
  },
};
