import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { ChatInput } from '../../components/ChatInput';

const meta = {
  title: 'Components/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Full chat widget — terminal › prompt, ASK button, StatusIndicator below. ' +
          'The field goes "active" (green border, phosphor bg) whenever it is focused, ' +
          'populated, or loading. In the loading state the field is read-only: text ' +
          'truncates before a "thinking" label, a 1px phosphor sweep crosses the bottom ' +
          'border, and ASK drops to 55% opacity. The multiline mode upgrades to a ' +
          'textarea that grows with content up to 6 lines; Cmd/Ctrl+Enter submits. ' +
          'The status indicator is always visible below — online (blinking green dot) ' +
          'or offline (static grey dot).',
      },
    },
  },
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story:
          'Empty field at rest. Border is chat-border (#2c3028) — barely visible ' +
          'against the surface. The › prompt is #00e054. Placeholder in muted #5a6050. ' +
          'ASK is enabled — submitting an empty value is a no-op (trimmed value guard). ' +
          'Click the field to trigger the focused state.',
      },
    },
  },
  args: {
    status: 'online',
  },
};

export const Focused: Story = {
  name: 'Focused / active',
  parameters: {
    docs: {
      description: {
        story:
          'Focused empty state, forced via forceFocused prop (Storybook cannot trigger ' +
          ':focus programmatically without a decorator). Border shifts to green-border ' +
          '(#0e4a1e), background drops to phosphor-tinted #0a1410, a faint double ' +
          'ring appears. A 7×14px block caret in #00ff5e blinks at the text start ' +
          'position on a 1s step-end cycle. The real browser caret renders in the ' +
          'same color when the field actually has keyboard focus.',
      },
    },
  },
  args: {
    status: 'online',
    forceFocused: true,
  },
};

export const Filled: Story = {
  name: 'Filled',
  parameters: {
    docs: {
      description: {
        story:
          'Text entered, field not focused. The active state (green border + phosphor ' +
          'bg) persists while the field is populated — it invites submit even after blur. ' +
          'No block caret (caret only shows on focused-empty). Text in primary #ccd4b0.',
      },
    },
  },
  args: {
    status: 'online',
    initialValue: 'How did Sabre win the $1B contract?',
  },
};

export const Loading: Story = {
  name: 'Loading',
  parameters: {
    docs: {
      description: {
        story:
          'Response in-flight. Field is read-only; the question text truncates with ' +
          'ellipsis before the "thinking" label (pulsing green dot + IBM Plex Mono 11px ' +
          'in tertiary). A 1px phosphor sweep crosses the bottom border at 1.4s linear. ' +
          'ASK drops to 55% opacity and is disabled. Status dot stays online — ' +
          'loading is an active state, not an error.',
      },
    },
  },
  args: {
    status: 'loading',
    initialValue: 'How did Sabre win the $1B contract?',
  },
};

export const Offline: Story = {
  name: 'Offline',
  parameters: {
    docs: {
      description: {
        story:
          'Assistant unreachable. Status dot drops to #3d4035, no blink. Label color ' +
          'matches — both sink to disabled-text so the absence reads as deliberate, ' +
          'not broken. ASK is disabled; the field stays interactive so the user can ' +
          'draft a question while waiting for the connection to restore.',
      },
    },
  },
  args: {
    status: 'offline',
  },
};

export const Multiline: Story = {
  name: 'Multiline',
  parameters: {
    docs: {
      description: {
        story:
          'Textarea mode: field grows with content up to 6 lines, then enables vertical ' +
          'scroll. The › prompt locks to the first line (top-aligned). ASK stretches to ' +
          'match the full composer height. Character counter sits bottom-right inside ' +
          'the field. Submit via Cmd+Enter (Mac) or Ctrl+Enter (Win/Linux) — plain ' +
          'Enter inserts a newline.',
      },
    },
  },
  args: {
    status: 'online',
    multiline: true,
    initialValue:
      "Walk me through how the hybrid command-line + graphical workspace was actually rolled out at Flightcentre — what did the first 90 days look like for the veteran agents, and how did you measure that productivity didn't dip during the transition?",
  },
};

export const MultilineLoading: Story = {
  name: 'Multiline + loading',
  parameters: {
    docs: {
      description: {
        story:
          'Textarea read-only in the loading state. The character counter is replaced by ' +
          'the thinking indicator in the same bottom-right slot — pulsing dot + "thinking" ' +
          'label, IBM Plex Mono 11px. Extra bottom padding on the textarea prevents the ' +
          'last line of text from colliding with the indicator. The 1px phosphor sweep ' +
          'still runs along the bottom border.',
      },
    },
  },
  args: {
    status: 'loading',
    multiline: true,
    initialValue:
      "Walk me through how the hybrid command-line + graphical workspace was actually rolled out at Flightcentre — what did the first 90 days look like for the veteran agents, and how did you measure that productivity didn't dip during the transition?",
  },
};
