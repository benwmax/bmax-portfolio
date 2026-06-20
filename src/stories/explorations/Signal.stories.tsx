import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { HomeV1Signal } from '../../pages/explorations/HomeV1Signal';
import type { Message } from '../../pages/explorations/data';

/*
 * Explorations / 01 · Signal
 * The least radical of three progressively-more-futuristic homepage directions.
 * The shipping homepage with the dynamism turned up: a phosphor spotlight tracks
 * the cursor across the hero dot-grid, the headline types itself in, hero stats
 * count up on scroll, panels rise in on a stagger, cards catch a sweep of light.
 * Built on the locked design system — no new tokens. Respects reduced motion.
 */

const SEED_MESSAGES: Message[] = [
  { role: 'user', text: 'How did Sabre win the $1B contract?' },
  {
    role: 'assistant',
    text: 'Ben owned the Hotel redesign and pushed a hybrid model — kept veterans on the command line while making the tool learnable for seasonal hires. Rollout finished 6 months early with zero productivity loss.',
  },
];

const meta = {
  title: 'Explorations/01 · Signal',
  component: HomeV1Signal,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'The shipping homepage, elevated. Cursor-tracked spotlight, self-typing headline, ' +
          'count-up stats, staggered reveals, hover shine on cards. Safe enough to ship, ' +
          'lively enough to notice.',
      },
    },
  },
} satisfies Meta<typeof HomeV1Signal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: { onChatSubmit: fn(), initialMessages: [] },
};

export const ConversationSeeded: Story = {
  name: 'Conversation seeded',
  args: { onChatSubmit: fn(), initialMessages: SEED_MESSAGES },
};
