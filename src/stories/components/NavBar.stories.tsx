import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavBar } from '../../components/NavBar';

const DEFAULT_LINKS = [
  { label: 'Work',   href: '/work' },
  { label: 'About',  href: '/about' },
  { label: 'Resume', href: '/resume' },
];

const meta = {
  title: 'Components/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Site header. Wordmark left, navigation links right. Space Mono throughout — the nav is UI chrome, not prose. Active link identified with aria-current="page", which is both the semantic signal for screen readers and the CSS hook for the green accent treatment.',
      },
    },
  },
  args: {
    wordmark: 'BM_',
    links: DEFAULT_LINKS,
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithActiveLink: Story = {
  name: 'With Active Link',
  parameters: {
    docs: {
      description: {
        story:
          'Default nav state — one link is current. The trailing underscore in the wordmark is a terminal cursor convention: it signals that something is being actively built, which is true. The active link gets green accent; inactive links stay muted.',
      },
    },
  },
  args: {
    activeHref: '/work',
  },
};

export const NoActiveLink: Story = {
  name: 'No Active Link',
  parameters: {
    docs: {
      description: {
        story:
          'No route match — 404 or root before a route resolves. All links render at the default (inactive) weight. The wordmark still links home; only the nav links lose their active state.',
      },
    },
  },
  args: {
    activeHref: undefined,
  },
};
