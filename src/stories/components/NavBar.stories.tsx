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
          'Site header — wordmark left; About, Resume, Contact, and Design system ↗ right. Transparent: sits ' +
          'directly on --color-bg-page with only a 1px border-subtle rule at the ' +
          'bottom. No shadow, no fill, no backdrop-blur. ' +
          'The trailing underscore in BM_ is a terminal cursor convention — weight 700, ' +
          'phosphor green #00e054. It is static — it stopped blinking 2026-10-29 because a ' +
          'blink on every page competes with the content. ' +
          'Active state is determined by passing activePath; in production wire this to ' +
          'your router pathname. The active link gets green-accent color; no fill, no underline. ' +
          'Design system opens the public Storybook in a new tab (added 2026-10-30); on phones its ' +
          'label shortens to "System" and the theme toggle becomes a single switch so the row fits at 360px.',
      },
    },
    ai: {
      guidance:
        'Site header — present on every page. Fixed links: About, Resume, Contact, plus the external Design system link. The homepage is reached by the wordmark. Always wire activePath to the current router pathname.',
      contentRules: [
        'Nav links are fixed: About (/about), Resume (/resume), Contact (/contact), Design system (system.viewbens.work, new tab). Do not add custom links.',
        'The BM_ wordmark with its static underscore is the identity mark — do not modify it.',
        'Active link gets green-accent color + aria-current="page". No underline, no fill.',
      ],
      avoid: [
        "Don't add a mobile hamburger — four links fit at 360px with the short label and compact theme switch.",
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
          'All links render at their default color. ' +
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

export const ResumeActive: Story = {
  name: 'Resume active',
  parameters: {
    docs: {
      description: {
        story:
          'Resume page state. The matching link shifts to green-accent and receives ' +
          'aria-current="page". No underline, no fill, no background change — ' +
          'color alone carries the active signal. (The homepage has no nav link of ' +
          'its own; the wordmark is the way home.)',
      },
    },
    ai: {
      guidance: "Resume page state. Pass activePath='/resume'.",
    },
  },
  args: {
    activePath: '/resume',
  },
};

export const Phone: Story = {
  name: 'Phone (390px)',
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
    docs: {
      description: {
        story:
          'Below 640px "Design system" shortens to "System ↗"; below 560px the theme toggle ' +
          'becomes a single ◐ switch. Together they keep the wordmark, four links, and the ' +
          'switch on one row down to 360px (2026-10-30).',
      },
    },
    ai: {
      guidance: 'Reference for the phone layout. Keep everything on one row — no hamburger.',
    },
  },
  args: { activePath: '/about' },
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
          'The header under the Futuristic theme. The terminal underscore becomes an ' +
          'azure diamond (BM◆ — same markup, reshaped in CSS), the wordmark bolds in ' +
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
  args: { activePath: '/about' },
};
