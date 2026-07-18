import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { HomeV3Phosphor } from '../../pages/explorations/HomeV3Phosphor';
import type { Message } from '../../pages/explorations/data';

/*
 * Explorations / 03 · Phosphor
 * The most future-leaning direction — maximum motion and depth. A live <canvas>
 * synthwave grid rushes toward a glowing horizon with phosphor particles drifting
 * up through it, parallaxing to the cursor. Kinetic hero wordmark, a floating
 * glass command bar for the assistant, 3D-tilting holographic case cards, and a
 * magnetic CTA. Under prefers-reduced-motion the canvas paints one static frame
 * and all tilt/magnet/parallax is disabled.
 */

const SEED_MESSAGES: Message[] = [
  { role: 'user', text: 'What are you looking for next?' },
  {
    role: 'assistant',
    text: 'A Design Leader or Principal role where the hard problems are real — regulated domains, expert users, AI in the product. Somewhere the bar is high and the work matters.',
  },
];

const meta = {
  title: 'Explorations/03 · Phosphor',
  component: HomeV3Phosphor,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Full immersion: animated synthwave grid canvas, kinetic hero, floating glass command ' +
          'bar, 3D-tilt holographic cards, magnetic CTA. The boldest of the three explorations. ' +
          'All motion resolves to a static, legible state under prefers-reduced-motion.',
      },
    },
  },
} satisfies Meta<typeof HomeV3Phosphor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Immersive: Story = {
  name: 'Immersive grid',
  args: { onChatSubmit: fn(), initialMessages: [] },
};

export const ConversationSeeded: Story = {
  name: 'Conversation seeded',
  args: { onChatSubmit: fn(), initialMessages: SEED_MESSAGES },
};
