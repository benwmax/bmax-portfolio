import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResumePage } from '../pages/ResumePage';

const meta = {
  title: 'Pages/Resume',
  component: ResumePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Designed resume page — not a wall of text, not a PDF dump. ' +
          'Experience is listed most-recent-first with role, company, dates, sector tag, ' +
          'and two outcome bullets per role. Skills are laid out in a four-column grid. ' +
          'All content is statically embedded; update in ResumePage.tsx as dates and copy are confirmed.',
      },
    },
    ai: {
      guidance:
        'The designed resume — most-recent-first with role, company, dates, sector tag, and two outcome bullets per role. All content is static; update ResumePage.tsx directly.',
      contentRules: [
        'Nine roles total, most-recent-first.',
        'Each role has: role title, company, date range, sector Tag, and two outcome bullets.',
        'Date column is 140px wide — do not shrink it; longer date strings need the space.',
      ],
      avoid: [
        "Don't add a PDF download button without checking with Ben first.",
        "Don't compress role entries to fewer than two outcome bullets.",
      ],
    },
  },
} satisfies Meta<typeof ResumePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    ai: {
      guidance:
        'The complete resume page. No props needed — all content is static. Reference this story to preview any copy updates made in ResumePage.tsx.',
      avoid: [
        "Don't generate placeholder resume content — all nine roles have real content.",
        "Don't reorder roles to chronological-ascending — most-recent-first is the design intent.",
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
          'The resume under the Futuristic theme — token-driven light sci-fi treatment, no ' +
          'page-specific overrides.',
      },
    },
    ai: {
      guidance:
        'Resume page under the futuristic theme. If something looks wrong here, fix tokens.css — the page has no theme-specific code.',
    },
  },
};
