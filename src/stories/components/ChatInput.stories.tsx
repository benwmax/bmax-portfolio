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
          'AI chat widget input. A terminal-style prompt (›) precedes the input field — it signals this is a command interface, not a search box. The submit button reads "ASK" in Space Mono. Status text below the form handles loading and error feedback; no toast, no modal, no spinner.',
      },
    },
  },
  args: {
    onSubmit: fn(),
    placeholder: 'Ask about my work…',
  },
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Idle state — ready for input. Submit is disabled until text is entered; that logic lives in the component, not the story. The › prompt indicator is aria-hidden (decorative) but sets the terminal register for sighted visitors.',
      },
    },
  },
  args: {
    status: 'idle',
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'In-flight state: input and submit are disabled while a response is streaming. Status text is the only feedback — "Thinking…" matches the conversational tone of the rest of the site. Minimalism here is intentional; the visitor is already watching the text area.',
      },
    },
  },
  args: {
    status: 'loading',
    statusText: 'Thinking…',
  },
};

export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Rate limit or network error. Input re-enables so the visitor can retry without reloading. The status message is written in the site\'s voice — not a generic "Something went wrong." Rate limit is the realistic failure mode given the per-IP cap on the edge function.',
      },
    },
  },
  args: {
    status: 'error',
    statusText: 'Rate limit reached. Try again in a moment.',
  },
};
