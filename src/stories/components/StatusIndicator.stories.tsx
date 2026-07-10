import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusIndicator } from '../../components/StatusIndicator';

const meta = {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  parameters: {
    docs: {
      description: {
        component:
          'Availability signal below the chat input — 7px dot, IBM Plex Mono 10px, wide-tracked uppercase tertiary text. The online dot uses green-bright (#00ff5e), the same color as the cursor blink and input caret. Offline drops everything to disabled-text so absence reads as intentional, not broken.',
      },
    },
    ai: {
      guidance:
        'Availability signal for the AI chat assistant. Renders below ChatInput — never inside it. Online = green-bright blinking. Offline = text-disabled, no blink. Warning and Error are reserved states.',
      contentRules: [
        'Labels are always uppercase.',
        "Standard online label: 'ONLINE · assistant ready'.",
        "Standard offline label: 'OFFLINE · responses unavailable'.",
      ],
      avoid: [
        "Don't render StatusIndicator inside the ChatInput component — it goes below.",
        "Don't use 'offline' for loading/in-flight state — loading is still 'online'.",
      ],
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
    ai: {
      guidance:
        'Place below the ChatInput when the AI assistant is reachable. This is the default starting state.',
      contentRules: [
        "blink defaults to true when status='online' — do not override.",
      ],
      avoid: [
        "Don't set blink={false} for online state — the blink is the readiness signal.",
      ],
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
    ai: {
      guidance:
        'Use when the API endpoint is unreachable or the backend is down.',
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
    ai: {
      guidance:
        'Reserved for degraded-but-functional states (rate limit approaching, slow response). Not in the default chat widget — activate programmatically only.',
      avoid: [
        "Don't use warning as a default or placeholder state.",
        "Don't use warning for actual errors — use error state.",
      ],
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
    ai: {
      guidance:
        'Reserved for actual failures: API unreachable, auth error. Surfaces programmatically, never by default.',
      contentRules: [
        "Label: 'ERROR · assistant unavailable' or similar.",
      ],
      avoid: [
        "Don't use error state for degraded performance — that's 'warning'.",
      ],
    },
  },
  args: {
    status: 'error',
    label: 'Error · assistant unavailable',
  },
};
