import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { ChatTranscript } from '../../components/ChatTranscript';
import { ContactCard } from '../../components/ContactCard';
import type { Message } from '../../hooks/useChatSession';

// Real-shaped copy: replies are short and broken into paragraphs with blank
// lines, the way the system prompt enforces them.
const CONVERSATION: Message[] = [
  { role: 'user', text: 'What did Ben do at Sabre?' },
  {
    role: 'assistant',
    text:
      'He made a command-line booking tool learnable without slowing down the veterans who already knew it.\n\n' +
      'The work contributed to a $1B government contract win and a 23% revenue lift.',
  },
];

const CONTACT_TURN: Message[] = [
  { role: 'user', text: 'How can I get in touch with him?' },
  {
    role: 'assistant',
    text: 'The quickest way is the form below — it goes straight to his inbox.',
  },
];

const FOLLOW_UP: Message[] = [
  { role: 'user', text: 'What kind of role is he looking for?' },
  { role: 'assistant', text: 'UX Principal and Design Director roles.' },
];

// Mirrors the docked rail's log: a fixed-width column with the surface's own
// padding and gap. The component deliberately doesn't own these.
const logStyle = {
  width: 380,
  padding: 20,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 14,
  background: 'var(--color-bg-surface)',
  border: '1px solid var(--color-border-subtle)',
};

const contactCard = <ContactCard status="idle" onSubmit={fn()} onDismiss={fn()} />;

const meta = {
  title: 'Components/ChatTranscript',
  component: ChatTranscript,
  parameters: {
    docs: {
      description: {
        component:
          'The chat message log shared by every chat surface — the homepage hero panel, the ' +
          'docked rails on Home and case study pages, and the mobile overlay. Owns message ' +
          'rendering (visitor prompt, paragraph-split assistant replies, streaming cursor), the ' +
          'live-region behavior, and where the inline ContactCard sits in the conversation. ' +
          'Each surface supplies its own container className and any trailing content such as ' +
          'suggestion chips.',
      },
    },
    ai: {
      guidance:
        'Use for any list of chat messages. Pages pass messages and chatStatus from useChat(), the ContactCard element when it should show, and contactCardAfter from the session. Suggestion chips go in as children because each surface styles them differently.',
      contentRules: [
        'The greeting is the homepage opener only: "Howdy. Ask about any case study, what I\'m looking for, or how I work with AI."',
        'Assistant text is rendered through splitParagraphs — pass the raw reply, never pre-joined or pre-split text.',
      ],
      avoid: [
        "Don't render messages outside this component — two shipped bugs (2026-07-19, 2026-08-01) came from pages carrying their own copies.",
        "Don't append the ContactCard after the transcript. Pass it in with contactCardAfter so follow-up turns render below it.",
        "Don't move contactCardAfter once set — relocating the card remounts ContactCard and drops a half-typed draft.",
        "Don't render chat on About, Resume, Contact, or 404 — chat is scoped to Home and case study pages (decisions.md 2026-07-18).",
      ],
    },
  },
  args: {
    messages: CONVERSATION,
    streaming: false,
  },
  render: (args) => <ChatTranscript {...args} />,
  decorators: [
    (Story) => (
      <div style={logStyle}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatTranscript>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Conversation',
  parameters: {
    docs: {
      description: {
        story:
          'A finished exchange. Visitor messages lead with the green `›` prompt in primary text; replies sit behind a green rule in secondary text at 18px, split into paragraphs on blank lines.',
      },
    },
    ai: {
      guidance: 'The resting state of any conversation. No cursor once streaming ends.',
    },
  },
};

export const Empty: Story = {
  name: 'Empty with greeting',
  parameters: {
    docs: {
      description: {
        story:
          'The homepage hero before anyone has typed. The greeting shows only while the log is empty, with a blinking cursor so the panel reads as live. Case study pages pass no greeting — their opener is a context note that lives in the transcript.',
      },
    },
    ai: {
      guidance: 'Pass greeting on the homepage only. It disappears as soon as the first message is sent.',
    },
  },
  args: {
    messages: [],
    greeting: "Howdy. Ask about any case study, what I'm looking for, or how I work with AI.",
  },
};

export const Streaming: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A reply mid-stream. The cursor trails the last paragraph of the newest message, and the live region is switched off so screen readers announce the finished reply once instead of every chunk.',
      },
    },
    ai: {
      guidance: "Set streaming from chatStatus === 'loading'. Never leave it on after the reply completes.",
    },
  },
  args: {
    messages: [
      CONVERSATION[0],
      { role: 'assistant', text: 'He made a command-line booking tool learnable without' },
    ],
    streaming: true,
  },
};

export const WithContactCard: Story = {
  name: 'With contact card',
  parameters: {
    docs: {
      description: {
        story:
          'The contact form is a transcript entry, not a footer. It stays after the turn that surfaced it, and the follow-up question and its reply appear below it. This is the 2026-08-01 fix: the card used to render after the whole list, so later turns appeared above the form.',
      },
    },
    ai: {
      guidance:
        'contactCardAfter is the number of messages rendered before the card. It pins when the card first shows and never moves.',
    },
  },
  args: {
    messages: [...CONVERSATION, ...CONTACT_TURN, ...FOLLOW_UP],
    contactCard,
    contactCardAfter: CONVERSATION.length + CONTACT_TURN.length,
  },
};

export const Futuristic: Story = {
  name: 'Futuristic V2',
  parameters: {
    theme: 'futuristic',
    docs: {
      description: {
        story:
          'Streaming under the Futuristic theme. The blinking underscore becomes a soft pulsing dot in CSS — the markup is identical between themes.',
      },
    },
    ai: {
      guidance: 'Reference for the futuristic theme — colors, type, and the cursor shape come from CSS, no logic changes.',
    },
  },
  args: {
    messages: [
      CONVERSATION[0],
      { role: 'assistant', text: 'He made a command-line booking tool learnable without' },
    ],
    streaming: true,
  },
};
