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
    ai: {
      guidance:
        'Full AI chat widget — terminal prompt, ASK button, and StatusIndicator in one component. Use for the AI assistant on both the homepage and case study pages. Not a generic form input — use the bare Input component for that.',
      contentRules: [
        "Default placeholder: 'ask about my work…' — lowercase, trailing ellipsis, no period.",
        "status='online' is the starting state.",
        "Set showStatus={false} when the surrounding panel already carries its own StatusIndicator.",
      ],
      avoid: [
        "Don't use ChatInput as a generic form input — use the bare Input component instead.",
        "forceFocused is Storybook-only — never wire it to application state.",
        "Don't use multiline for the compact homepage hero panel — single-line only there.",
      ],
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
    ai: {
      guidance:
        'Use as the base pattern for an idle chat surface — no messages yet, assistant ready.',
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
    ai: {
      guidance:
        'Reference to preview the focused state: green border, phosphor bg, block caret. In production this triggers on real :focus.',
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
    ai: {
      guidance:
        'The active state (green border + phosphor bg) persists while the field has text, even after blur. Reference this story to confirm that behavior.',
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
    ai: {
      guidance:
        "Apply status='loading' while an API request is in-flight. The field goes read-only and the sweep animation runs.",
      avoid: [
        "Don't show a separate loading spinner — the ChatInput sweep animation is the loading affordance.",
        "Don't clear the field while loading — the user's question stays visible.",
      ],
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
    ai: {
      guidance:
        "Apply status='offline' when the API endpoint is unreachable. ASK disables; the field stays interactive for drafting.",
      contentRules: [
        'The field stays interactive so the user can draft a question while waiting.',
      ],
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
    ai: {
      guidance:
        'Use multiline={true} when the composer is the main input surface — the full case study right rail or an expanded chat panel. Grows to 6 lines, then scrolls.',
      contentRules: [
        'Cmd+Enter (Mac) or Ctrl+Enter (Win/Linux) submits. Plain Enter inserts a newline.',
      ],
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
    ai: {
      guidance:
        'Reference to confirm the loading state in the multiline composer — the char counter slot is replaced by the thinking indicator.',
    },
  },
  args: {
    status: 'loading',
    multiline: true,
    initialValue:
      "Walk me through how the hybrid command-line + graphical workspace was actually rolled out at Flightcentre — what did the first 90 days look like for the veteran agents, and how did you measure that productivity didn't dip during the transition?",
  },
};
