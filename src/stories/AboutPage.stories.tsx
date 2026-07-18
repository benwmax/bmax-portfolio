import type { Meta, StoryObj } from '@storybook/react-vite';
import { AboutPage } from '../pages/AboutPage';

const meta = {
  title: 'Pages/About',
  component: AboutPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "About page — four sections: approach, leadership, career arc, and what I'm looking for. " +
          'The career arc lists all six roles chronologically, with Market Rebellion included as a ' +
          'brief mention (not a standalone case study). No props — all content is statically ' +
          'embedded. Content should be updated in AboutPage.tsx as copy is finalized.',
      },
    },
    ai: {
      guidance:
        'The About page is a static content page — four sections in a fixed order. All content lives in AboutPage.tsx directly. No props to pass.',
      contentRules: [
        "Four sections in order: approach, leadership, career arc, what I'm looking for.",
        'Career arc runs from 2014 (Aperia Solutions) to present — nine roles listed chronologically.',
        'Market Rebellion is included as a brief career arc mention only — not a standalone case study.',
        'Location: Dallas, Texas. Not remote-only.',
      ],
      avoid: [
        "Don't add interactivity to the About page.",
        "Don't make Market Rebellion a featured case study.",
        "Don't add a fifth section without checking with Ben.",
        "Don't change the location to remote or elsewhere without checking with Ben.",
      ],
    },
  },
} satisfies Meta<typeof AboutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    ai: {
      guidance:
        'The complete About page. No props needed — all content is static. Reference this story to preview any copy updates made in AboutPage.tsx.',
      contentRules: [
        'Tone: confident and specific. First person, active voice. No corporate filler.',
      ],
      avoid: [
        "Don't generate placeholder or lorem ipsum copy for the About page — all sections have real content.",
      ],
    },
  },
};

export const Futuristic: Story = {
  name: 'Futuristic V2',
  parameters: {
    theme: 'futuristic',
    docs: {
      description: {
        story:
          'The About page under the Futuristic theme — token-driven light sci-fi treatment, ' +
          'no page-specific overrides.',
      },
    },
    ai: {
      guidance:
        'About page under the futuristic theme. If something looks wrong here, fix tokens.css — the page has no theme-specific code.',
    },
  },
};
