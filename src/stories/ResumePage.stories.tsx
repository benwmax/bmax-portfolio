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
        'Skills grid: four columns.',
        'Update content by editing ResumePage.tsx directly — no props.',
      ],
      avoid: [
        "Don't add a PDF download button without checking with Ben first.",
        "Don't compress role entries to fewer than two outcome bullets.",
        "Don't change the date column width — 140px was set to fix overflow on longer date strings.",
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
      contentRules: [
        'Nine roles, most-recent-first. Career arc starts May 2014 (Aperia Solutions).',
        'Two outcome bullets per role — specific, active voice, no vague qualifiers.',
      ],
      avoid: [
        "Don't generate placeholder resume content — all nine roles have real content.",
        "Don't reorder roles to chronological-ascending — most-recent-first is the design intent.",
      ],
    },
  },
};
