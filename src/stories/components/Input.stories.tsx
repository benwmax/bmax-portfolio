import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../../components/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Terminal text field — IBM Plex Mono body, Space Mono label, green border on focus. With `prompt`, shows the › indicator and sets caret-color to green-bright, matching the chat input widget. Focus state is CSS-only (:focus rule in the module) — click any input in these stories to see it.',
      },
    },
    ai: {
      guidance:
        'The bare terminal text field. Use for forms, not for the AI chat widget — use ChatInput for that. IBM Plex Mono body, Space Mono ALL CAPS label.',
      contentRules: [
        'Labels are ALL CAPS — e.g., "YOUR QUESTION", "EMAIL ADDRESS". The component renders them as provided; capitalize in the prop.',
        'Use prompt={true} when the field is part of a terminal-aesthetic context.',
      ],
      avoid: [
        "For chat functionality, use ChatInput — not this component.",
        "Don't use generic sans-serif labels — the Space Mono ALL CAPS label is the system default.",
      ],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story:
          'Base field — no label, no hint, no prompt. Border is chat-border (#2c3028). Click it to see the focus ring: border shifts to chat-focus-border (#0e4a1e) and background drops to the phosphor-tinted #0a1410.',
      },
    },
    ai: {
      guidance:
        'Base input with no label, no hint, no prompt. Use when label is supplied by surrounding context.',
    },
  },
  args: {
    placeholder: 'ask about my work…',
  },
};

export const WithLabel: Story = {
  name: 'With label',
  parameters: {
    docs: {
      description: {
        story:
          'Label uses Space Mono, ALL CAPS, 0.12em tracking — same treatment as nav links and button text. It reads as a terminal command header, not a form label.',
      },
    },
    ai: {
      guidance:
        'Standard form field with Space Mono ALL CAPS label. Use whenever the field needs a visible accessible label.',
    },
  },
  args: {
    label: 'Your question',
    placeholder: 'ask about my work…',
  },
};

export const Prompt: Story = {
  name: 'With prompt indicator',
  parameters: {
    docs: {
      description: {
        story:
          'The › (›) prompt indicator is the same character used in the chat widget. When present, input padding shifts right so text clears the prompt. The caret renders in green-bright (#00ff5e) — blinking, terminal-ready.',
      },
    },
    ai: {
      guidance:
        'Use prompt={true} when the input is part of a terminal-aesthetic context — the › indicator and green caret reinforce the theme.',
      avoid: [
        "Don't add a prompt to a standard form field outside the terminal context.",
      ],
    },
  },
  args: {
    prompt: true,
    placeholder: 'ask about my work…',
  },
};

export const Filled: Story = {
  name: 'Filled',
  parameters: {
    docs: {
      description: {
        story:
          'Text in primary color (#ccd4b0). The border stays at the default chat-border until the user focuses. No filled-but-unfocused border brightening — that behavior is specific to the ChatInput widget, not this bare field.',
      },
    },
    ai: {
      guidance:
        'Reference to confirm filled (but unfocused) appearance — unlike ChatInput, the bare Input does NOT brighten its border when filled.',
    },
  },
  args: {
    prompt: true,
    defaultValue: 'How did Sabre win the $1B contract?',
  },
};

export const WithHint: Story = {
  name: 'With hint',
  parameters: {
    docs: {
      description: {
        story:
          'Hint text below the field — IBM Plex Mono, 10px, tertiary color. Useful for character limits or format guidance. Wired to aria-describedby so screen readers announce it after the label.',
      },
    },
    ai: {
      guidance:
        'Use hint for format guidance or character limits. Wired to aria-describedby — screen readers announce it after the label.',
      contentRules: [
        "Hint text examples: 'Max 2000 characters', 'Letters only', 'Name as it appears on ID'.",
      ],
    },
  },
  args: {
    label: 'Your question',
    placeholder: 'ask about my work…',
    hint: 'Max 2000 characters',
  },
};

export const WithError: Story = {
  name: 'Error state',
  parameters: {
    docs: {
      description: {
        story:
          'Error state: border shifts to status-error (#e05050), hint text becomes the error message in the same red. aria-invalid is set on the input. Red is the only non-green, non-amber interactive color in the system — it registers immediately.',
      },
    },
    ai: {
      guidance:
        'Use error to show validation failure. Replaces hint, turns border red (#e05050), sets aria-invalid.',
      contentRules: [
        "Error messages should be specific: 'Please enter a question before submitting.' not 'Invalid input.'",
      ],
    },
  },
  args: {
    label: 'Your question',
    defaultValue: '',
    error: 'Please enter a question before submitting.',
  },
};

export const Loading: Story = {
  name: 'Loading / disabled',
  parameters: {
    docs: {
      description: {
        story:
          'Disabled state: 50% opacity, not-allowed cursor. Used while a response is in-flight. The ChatInput widget handles the visual loading affordance (sweep, "thinking" label); this is the raw disabled field behavior.',
      },
    },
    ai: {
      guidance:
        'Apply disabled={true} while a response is in-flight. 50% opacity, not-allowed cursor.',
      avoid: [
        "The visual loading affordance (sweep animation, 'thinking' label) is in ChatInput — this raw disabled state is a fallback only.",
      ],
    },
  },
  args: {
    prompt: true,
    defaultValue: 'How did Sabre win the $1B contract?',
    disabled: true,
  },
};

export const Multiline: Story = {
  name: 'Multiline',
  parameters: {
    docs: {
      description: {
        story:
          'Renders a <textarea> instead of <input>. Resizable vertically, min-height 4.5rem (~3 lines). Same font, border, and focus treatment as the single-line field. Used when a question is likely to run long — the ChatInput widget wraps this in its composer layout.',
      },
    },
    ai: {
      guidance:
        'Use multiline={true} for long-form text: questions, descriptions, message bodies.',
    },
  },
  args: {
    label: 'Your question',
    multiline: true,
    prompt: true,
    placeholder: 'ask about my work…',
    rows: 4,
  } as Story['args'],
};
