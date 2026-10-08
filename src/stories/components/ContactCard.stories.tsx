import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { ContactCard } from '../../components/ContactCard';

const meta = {
  title: 'Components/ContactCard',
  component: ContactCard,
  parameters: {
    docs: {
      description: {
        component:
          'Structured contact form rendered inline in the chat log — Name/Email/Message ' +
          'built from the bare Input and Button primitives, plus a hidden honeypot field. ' +
          'Appears when the visitor\'s message matches a "get in touch" intent (detected ' +
          'client-side in useChatSession, see src/hooks/useChatSession.ts), independent of ' +
          'the assistant\'s own reply. Submits to /api/contact, which emails Ben directly ' +
          'via Resend.',
      },
    },
    ai: {
      guidance:
        'Renders inline in the chat message log (Home and case study pages only) when contact intent is detected. A structured form, not a conversational back-and-forth — Name is optional, Email and Message are required. Always pairs with a "Not now" dismiss, since the client-side intent detection can false-positive.',
      contentRules: [
        'Header label is ALL CAPS: "SEND BEN A MESSAGE".',
        'The Send button reads "SEND" idle, "SENDING…" while in flight — never a spinner icon.',
        'Confirmation copy after a successful send: "Sent — Ben typically replies within 48 hours." — matches the reply-time promise on the static Contact page.',
      ],
      avoid: [
        "Don't render this on the static Contact page — that page is intentionally form-free (mailto: + clipboard only). This component is chat-only.",
        "Don't remove the honeypot field or the elapsedMs anti-bot signal — both are load-bearing for /api/contact's spam prevention, not decorative.",
        "Don't skip the dismiss action — regex-based intent detection can trigger on phrasing that wasn't actually asking to get in touch.",
      ],
    },
  },
  args: {
    onSubmit: fn(),
    onDismiss: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  name: 'Idle',
  parameters: {
    docs: {
      description: {
        story:
          'Default state — empty form, ready for input. Email and Message are required (client-side validation shows inline errors on submit); Name is optional.',
      },
    },
    ai: {
      guidance: 'Starting state when contact intent is first detected. No fields pre-filled.',
    },
  },
  args: {
    status: 'idle',
  },
};

export const Sending: Story = {
  name: 'Sending',
  parameters: {
    docs: {
      description: {
        story:
          'Submitted and awaiting the /api/contact response. All fields disable, the Send button reads "SENDING…". No separate spinner — the button label is the loading affordance, matching ChatInput\'s pattern of not layering on a spinner icon.',
      },
    },
    ai: {
      guidance: 'Apply while the /api/contact request is in flight. Fields and buttons disable; label changes to "SENDING…".',
    },
  },
  args: {
    status: 'sending',
  },
};

export const Sent: Story = {
  name: 'Sent / confirmation',
  parameters: {
    docs: {
      description: {
        story:
          'Success state — the form is replaced entirely by a confirmation line with a green checkmark. Copy matches the reply-time promise already shown on the static Contact page.',
      },
    },
    ai: {
      guidance: 'Terminal success state. The form fields are gone entirely, not just disabled — there\'s nothing left to do.',
    },
  },
  args: {
    status: 'sent',
  },
};

export const Error: Story = {
  name: 'Error',
  parameters: {
    docs: {
      description: {
        story:
          'A server-side failure (rate limit, upstream error) — the form stays filled so the visitor doesn\'t lose what they wrote, with the server\'s error text shown above the fields in status-error red.',
      },
    },
    ai: {
      guidance: 'Use when /api/contact returns a non-2xx response. Pass its error message through as errorText — never invent a generic one, the server message is already visitor-appropriate.',
      contentRules: [
        'errorText comes verbatim from the API response — do not rewrite or summarize it.',
      ],
    },
  },
  args: {
    status: 'error',
    errorText: 'Too many messages sent. Maximum 3 per hour — try emailing ben@viewbens.work directly.',
  },
};

export const Futuristic: Story = {
  name: 'Futuristic V2',
  parameters: {
    theme: 'futuristic',
    docs: {
      description: {
        story: 'Idle state under the Futuristic theme — token-driven, no component changes between themes.',
      },
    },
    ai: {
      guidance: 'Reference for the futuristic theme — colors and type come from tokens, no logic changes.',
    },
  },
  args: {
    status: 'idle',
  },
};
