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
  },
} satisfies Meta<typeof ResumePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
