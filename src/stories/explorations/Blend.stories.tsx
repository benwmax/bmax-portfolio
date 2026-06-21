import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { HomeV4Blend } from '../../pages/explorations/HomeV4Blend';
import type { Message } from '../../pages/explorations/data';

/*
 * Explorations / 04 · Blend
 * A synthesis of the three prior explorations, using elements Ben selected from each:
 * — Boot sequence from 02 · Boot, shortened to 3 lines and ~1.5 s total
 * — Scroll indicator from 03 · Phosphor, pinned to the bottom of the hero viewport
 * — Green scanline from 01 · Signal, promoted to a fixed full-viewport-width sweep
 *   that passes through the entire page rather than clipping at the hero edge
 * — "Available for Design Leader roles" badge from 01 · Signal, without the blinking dot
 * — CaseStudyCard library component in a 4-column reveal grid (not tilt cards or records)
 */

const SEED_MESSAGES: Message[] = [
  { role: 'user', text: 'What did you do at Sagent?' },
  {
    role: 'assistant',
    text: 'Led UX for a mortgage servicing platform with no design director in place — built team process from scratch, ran cross-functional research, and shipped a redesigned servicer portal that cut onboarding time by 6 months.',
  },
];

const meta = {
  title: 'Explorations/04 · Blend',
  component: HomeV4Blend,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'A synthesis of Signal, Boot, and Phosphor. Fast boot sequence (3 lines, ~1.5 s), ' +
          'full-viewport scanline, Phosphor scroll cue, Signal status badge without the blinking ' +
          'dot, and the CaseStudyCard library component in the reveal grid. Reload to replay boot.',
      },
    },
  },
} satisfies Meta<typeof HomeV4Blend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullBoot: Story = {
  name: 'Full boot sequence',
  args: { onChatSubmit: fn(), initialMessages: [], skipBoot: false },
};

export const Assembled: Story = {
  name: 'Assembled (skip intro)',
  parameters: {
    docs: {
      description: {
        story: 'Boot skipped — shows the assembled layout immediately for review.',
      },
    },
  },
  args: { onChatSubmit: fn(), initialMessages: [], skipBoot: true },
};

export const ConversationSeeded: Story = {
  name: 'Conversation seeded',
  args: { onChatSubmit: fn(), initialMessages: SEED_MESSAGES, skipBoot: true },
};
