import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeToggle } from '../../components/ThemeToggle';

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    docs: {
      description: {
        component:
          'Retro / Futuristic segmented control — lives at the top right of every page, ' +
          'the right edge of the NavBar. A labeled two-option radiogroup rather than an ' +
          'unlabeled icon switch: the theme names are the feature, and seeing both options ' +
          'invites the flip. State lives on <html data-theme> (see useTheme), not a React ' +
          'provider, so this component is fully self-contained and works standalone here ' +
          'exactly as it does in production — click an option below to actually switch ' +
          'this story\'s theme.',
      },
    },
    ai: {
      guidance:
        'The Retro/Futuristic theme switch. Fixed home is the top-right of the NavBar — do not relocate it. It is a real radiogroup (role="radiogroup", each option role="radio"), not a toggle switch, because there are exactly two named states and both should be visible at once.',
      contentRules: [
        'Only two options ever: "Retro" and "Futuristic" (abbreviated RET/FUT under 560px). Do not add a third theme without checking with Ben.',
        'Labels are the full theme names, not icons — the names are the feature.',
      ],
      avoid: [
        "Don't wrap this in a provider — theme state lives on document.documentElement.dataset.theme, read/written directly by useTheme.",
        "Don't move it out of the NavBar's top-right corner — that's its fixed home in every page template.",
        'Retro is always the default; only "futuristic" is ever written to the attribute or localStorage.',
      ],
    },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default — Retro active',
  parameters: {
    docs: {
      description: {
        story:
          'Retro is the default and starting state on every page load — no saved ' +
          'preference, or a saved preference of "retro". The Retro segment shows the ' +
          'active treatment (green-accent text, deepest-green fill).',
      },
    },
    ai: {
      guidance: 'The starting state for a first-time visitor, or anyone without a saved theme preference.',
    },
  },
};

export const Futuristic: Story = {
  name: 'Futuristic active',
  parameters: {
    theme: 'futuristic',
    docs: {
      description: {
        story:
          'After switching (or on a return visit with "futuristic" saved to localStorage). ' +
          'The control itself restyles per theme — sharp terminal chrome with a hairline ' +
          'divider in retro; a rounded pill with a solid green-filled active segment in ' +
          'futuristic — so the toggle previews the aesthetic it switches into.',
      },
    },
    ai: {
      guidance:
        'The futuristic active state. The pill shape and filled active segment are theme-driven CSS (ThemeToggle.module.css), not a separate component variant.',
    },
  },
};

export const NarrowViewport: Story = {
  name: 'Narrow viewport (<560px) — abbreviated labels',
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
    docs: {
      description: {
        story:
          'Below 560px the full "Retro"/"Futuristic" labels swap to "RET"/"FUT" so the ' +
          'NavBar still fits its three nav links at a 390px viewport. The swap is CSS-only ' +
          '(both labels render at all times; one is display:none) — screen readers still ' +
          'get the full theme name via the visually-hidden span.',
      },
    },
    ai: {
      guidance:
        'Reference for the 390px NavBar layout — confirms the toggle fits alongside the three nav links once labels abbreviate below 560px.',
      contentRules: ['Abbreviations are fixed: RET / FUT. Do not invent shorter or different abbreviations.'],
    },
  },
};
