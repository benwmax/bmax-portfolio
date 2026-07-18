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
    ai: {
      guidance:
        'Site header — present on every page. Three fixed nav links: Work, About, Contact. Always wire activePath to the current router pathname.',
      contentRules: [
        'Nav links are fixed: Work (/work), About (/about), Contact (/contact). Do not add custom links.',
        'The BM_ wordmark with blinking underscore is the identity mark — do not modify it.',
        'Active link gets green-accent color + aria-current="page". No underline, no fill.',
      ],
      avoid: [
        "Don't add a mobile hamburger — three links fit at 390px without collapsing.",
        "Don't leave activePath undefined in production — always wire it to the router pathname.",
        "Don't add extra nav links or dropdown menus.",
      ],
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
    ai: {
      guidance:
        'Use this pattern for 404 pages or before the router has resolved — all links at rest, none active.',
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
    ai: {
      guidance:
        "The homepage production state. Pass activePath='/work' to mark the Work link active.",
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
    ai: {
      guidance: "About page state. Pass activePath='/about'.",
    },
  },
  args: {
    activePath: '/about',
  },
};

export const Futuristic: Story = {
  name: 'Futuristic V2',
  parameters: {
    theme: 'futuristic',
    docs: {
      description: {
        story:
          'The header under the Futuristic theme. The blinking terminal underscore becomes a ' +
          'static azure diamond (BM◆ — same markup, reshaped in CSS), the wordmark bolds in ' +
          'Space Grotesk, and the solid bar becomes a translucent frosted panel. The ' +
          'Retro/Futuristic toggle at the right edge is live in every story — it drives the ' +
          'same [data-theme] attribute the site uses.',
      },
    },
    ai: {
      guidance:
        'Header under the futuristic theme. The wordmark cursor swap is CSS-only (NavBar.module.css) — the BM_ markup and aria-label are identical in both themes.',
      avoid: [
        "Don't change the wordmark markup per theme — the underscore span is restyled, never replaced.",
        "Don't move the ThemeToggle out of the NavBar — top right is its fixed home.",
      ],
    },
  },
  args: { activePath: '/work' },
};
