import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { ChatHome } from '../pages/ChatHome';
import type { Message } from '../hooks/useChatSession';
import { TOPICS } from '../chat/topics';

/*
 * Pages / Homepage
 *
 * The production homepage since 2026-10-30: a full-screen chat. The grid
 * homepage it replaced is under Pages / Archive.
 *
 * Starter chips play pre-built tours offline, so they work in Storybook; typed
 * questions are intercepted by onChatSubmit (there is no /api here).
 */

/** A finished Sabre tour, built from the real topic so the story can't drift from the site. */
const sabreTour: Message[] = [
  { role: 'user', text: TOPICS.sabre.prompt },
  ...TOPICS.sabre.beats.map(
    (b): Message => ({ role: 'assistant', text: b.text ?? '', widgets: b.widgets }),
  ),
];

const meta = {
  title: 'Pages/Homepage',
  component: ChatHome,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The chat-first homepage. First screen: name and role, the headline, a centered input, ' +
          'four starter questions, and an expander for twelve more. Once a conversation starts the ' +
          'input moves to the bottom and replies render with widgets (see Chat / Widgets).',
      },
    },
    ai: {
      guidance:
        'The production homepage (src/pages/ChatHome.tsx). Never rebuild a homepage layout; edit this page. Tours live in src/chat/topics.ts, widgets in src/chat/widgets/.',
      contentRules: [
        "Starter order is STARTER_TOPICS in topics.ts: best work, design for experts, AI in the design process, what he's looking for.",
        'The thrust is UX design skill; AI supports it (Ben, 2026-10-29). Keep AI out of the headline.',
        'Tours: two or three short beats, one main widget. The full case study is opt-in.',
      ],
      avoid: [
        "Don't add a work grid back to the first screen — the first screen is deliberately sparse.",
        "Don't let the input scroll with the starter chips when the list is expanded.",
        "Don't render MobileChatSurface here — this page is already full-screen at every width.",
      ],
    },
  },
  args: {
    onChatSubmit: fn(),
    initialMessages: [],
  },
} satisfies Meta<typeof ChatHome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstScreen: Story = {
  name: 'First screen',
  parameters: {
    docs: {
      description: {
        story:
          'What a visitor sees on arrival. Click a starter chip to play its tour — the input slides to the bottom.',
      },
    },
    ai: {
      guidance:
        'The idle state: byline, headline, centered input, four starters, more-questions expander.',
    },
  },
};

export const Conversation: Story = {
  name: 'Conversation (Sabre tour)',
  args: { initialMessages: sabreTour },
  parameters: {
    docs: {
      description: {
        story:
          'After the Sabre starter: project cover, the key-decision sketch, and results, with the input docked at the bottom.',
      },
    },
    ai: {
      guidance: 'The started state. Each tour beat is a message; widgets render under its text.',
    },
  },
};

export const Phone: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
    docs: {
      description: {
        story:
          'On phones the input sits in the upper third and the starters stack full-width as pills.',
      },
    },
    ai: { guidance: 'Phone layout. The nav uses the compact theme switch below 560px.' },
  },
};

export const Futuristic: Story = {
  name: 'Futuristic V2',
  parameters: {
    theme: 'futuristic',
    ai: { guidance: 'The first screen under the Futuristic theme — token-driven.' },
  },
};

export const ConversationFuturistic: Story = {
  name: 'Futuristic V2 — Conversation',
  args: { initialMessages: sabreTour },
  parameters: {
    theme: 'futuristic',
    ai: { guidance: 'The started state under the Futuristic theme.' },
  },
};
