import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavBar } from '../../components/NavBar';

const meta = {
  title: 'Components/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Site header — wordmark left, three nav links right. Transparent: sits ' +
          'directly on --color-bg-page with only a 1px border-subtle rule at the ' +
          'bottom. No shadow, no fill, no backdrop-blur. ' +
          'The trailing underscore in BM_ is a terminal cursor convention — weight 700, ' +
          'phosphor green #00e054, 1.1s step-end blink. It signals the site is actively ' +
          'being built, which is true. The blink respects prefers-reduced-motion. ' +
          'Active state is determined by passing activePath; in production wire this to ' +
          'your router pathname. The active link gets green-accent color; no fill, no underline.',
      },
    },
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default — no active route',
  parameters: {
    docs: {
      description: {
        story:
          'No pathname match — used on a 404 or before the router has resolved. ' +
          'All three links render at their default disabled-text color (#3d4035). ' +
          'The wordmark still links home; only the nav links lose their active treatment.',
      },
    },
  },
  args: {
    activePath: '',
  },
};

export const WorkActive: Story = {
  name: 'Work active',
  parameters: {
    docs: {
      description: {
        story:
          'Production state on the homepage. Work resolves to /work, which matches ' +
          'the active link — it shifts to green-accent (#00e054) and receives ' +
          'aria-current="page". No underline, no fill, no background change — ' +
          'color alone carries the active signal.',
      },
    },
  },
  args: {
    activePath: '/work',
  },
};

export const AboutActive: Story = {
  name: 'About active',
  parameters: {
    docs: {
      description: {
        story:
          'About page state. Same active treatment — green-accent link, ' +
          'aria-current="page", all other links remain at disabled-text.',
      },
    },
  },
  args: {
    activePath: '/about',
  },
};
