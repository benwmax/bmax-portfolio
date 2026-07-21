import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { MobileChatSurface } from '../../components/MobileChatSurface';
import type { RefObject } from 'react';

/*
 * Mock message log for the story canvas only — MobileChatSurface deliberately
 * doesn't own log markup (see its renderLog doc comment); each real page
 * supplies its own. This mirrors the shape closely enough to preview the
 * overlay without importing a page's module.css.
 */
function mockRenderLog(ref: RefObject<HTMLDivElement | null>, className: string) {
  return (
    <div ref={ref} className={className}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
        Ask me about the Sabre, USAA, or Upfluent case studies.
      </p>
      <p style={{ color: 'var(--color-text-primary)', fontSize: '14px' }}>
        What was the hardest part of the USAA redesign?
      </p>
      <p style={{ color: 'var(--color-text-primary)', fontSize: '14px' }}>
        Getting P&C and Auto to agree on a shared component model — that took longer than any
        single screen redesign.
      </p>
    </div>
  );
}

const meta = {
  title: 'Components/MobileChatSurface',
  component: MobileChatSurface,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile390' },
    docs: {
      description: {
        component:
          'The mobile-only "Ask Ben" entry point — a floating action button that opens a ' +
          'full-screen chat overlay. Shared by the homepage and case study pages so mobile ' +
          'chat behaves identically on both; desktop keeps its inline/docked panels instead. ' +
          'Every part of this component is gated to <=760px by CSS (see ' +
          'MobileChatSurface.module.css) — these stories render at the Mobile 390 viewport so ' +
          'the FAB and overlay are actually visible; viewing them at a desktop width in the ' +
          'Storybook canvas will correctly show nothing, matching production.',
      },
    },
    ai: {
      guidance:
        'The shared mobile chat surface for Home and case study pages — never fork a second copy of this FAB/overlay pair into a page file. Two behaviors here are load-bearing and easy to regress (see decisions.md 2026-07-19): (1) FAB visibility must be driven by `fabRevealed || messages.length > 0`, not just message count alone — case study pages call revealFab() on mount so the entry point exists even before a conversation starts; (2) the homepage inline hero chat collapses to a dead, non-interactive surface once a conversation starts on mobile (it is built to slide into the desktop docked rail, which does not exist on mobile) — the first submit must hand off to this overlay via a wrapper like handleHeroSubmit, or the reply streams into a hidden panel.',
      contentRules: [
        'FAB label is fixed: "Ask Ben" with a › prompt glyph — do not reword it.',
        'The badge only appears once messageCount > 0; it mirrors the conversation\'s message count, not unread count.',
      ],
      avoid: [
        "Don't render this component above the 760px breakpoint — it's CSS-gated to mobile and will render nothing (correctly) on a desktop viewport.",
        "Don't duplicate the FAB/overlay markup in a page file — both Home and case study pages must import this one component so the mobile chat experience can't drift between pages.",
        "Don't hide the FAB while a conversation exists just because the overlay is closed — visible should stay true once fabRevealed or messages.length > 0, only open toggles the overlay.",
      ],
    },
  },
  args: {
    onOpenChange: fn(),
    onSubmit: fn(),
    chatStatus: 'online',
    renderLog: mockRenderLog,
  },
} satisfies Meta<typeof MobileChatSurface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FabHidden: Story = {
  name: 'FAB hidden (not yet revealed)',
  parameters: {
    docs: {
      description: {
        story:
          'visible=false — the entry point does not exist yet. This is the homepage\'s ' +
          'starting state before fabRevealed is set or a message is sent; the canvas is ' +
          'intentionally empty.',
      },
    },
    ai: {
      guidance:
        'Starting mobile state on the homepage, before revealFab() has been called and before any message has been sent.',
    },
  },
  args: {
    visible: false,
    open: false,
    messageCount: 0,
  },
};

export const FabVisible: Story = {
  name: 'FAB visible — no messages',
  parameters: {
    docs: {
      description: {
        story:
          'visible=true, no conversation yet — the state case study pages start in ' +
          '(revealFab() runs on mount), and the state the homepage reaches once ' +
          'fabRevealed flips true.',
      },
    },
    ai: {
      guidance: 'The entry point exists but no conversation has started — no badge shown.',
    },
  },
  args: {
    visible: true,
    open: false,
    messageCount: 0,
  },
};

export const FabWithBadge: Story = {
  name: 'FAB visible — message badge',
  parameters: {
    docs: {
      description: {
        story:
          'A conversation is underway but the overlay is closed (the visitor dismissed it, ' +
          'or navigated between Home and a case study mid-conversation). The badge count ' +
          'mirrors messages.length so the visitor can see there is a reply waiting.',
      },
    },
    ai: {
      guidance:
        'Use when messages.length > 0 and the overlay is closed — the badge is the message count, driving the aria-label ("Open chat — N messages") as well as the visible digit.',
    },
  },
  args: {
    visible: true,
    open: false,
    messageCount: 3,
  },
};

export const OverlayOpen: Story = {
  name: 'Overlay open',
  parameters: {
    docs: {
      description: {
        story:
          'The full-screen chat sheet. Always mounted (aria-hidden + inert while closed, per ' +
          'the component\'s own comment) so the log stays a stable live region rather than ' +
          'unmounting mid-stream; this story just sets open=true to preview it. The FAB is ' +
          'hidden while open so the two never overlap.',
      },
    },
    ai: {
      guidance:
        'The dialog is role="dialog" aria-modal="true" with focus returned to the FAB on close (WCAG 2.4.3) — see the useEffect tracking wasOpen in the component. Never remove the inert attribute on the closed state; it keeps the hidden log out of the tab order.',
      avoid: [
        "Don't unmount the overlay when closed — it stays mounted (hidden + inert) so the message log survives across opens.",
      ],
    },
  },
  args: {
    visible: true,
    open: true,
    messageCount: 3,
  },
};

export const Interactive: Story = {
  name: 'Interactive (FAB → overlay)',
  parameters: {
    docs: {
      description: {
        story:
          'A controlled wrapper so the FAB can actually be clicked open and closed in the ' +
          'Storybook canvas, exercising the real open/close + focus-return behavior instead ' +
          'of a fixed prop snapshot.',
      },
    },
    ai: {
      guidance:
        'Use this story to manually verify the open/close interaction and focus return during review — the other stories are fixed snapshots of each state.',
    },
  },
  render: (args) => {
    function Wrapper() {
      const [open, setOpen] = useState(false);
      return <MobileChatSurface {...args} open={open} onOpenChange={setOpen} />;
    }
    return <Wrapper />;
  },
  args: {
    visible: true,
    open: false,
    messageCount: 2,
  },
};
