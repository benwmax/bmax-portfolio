import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotFoundPage } from '../pages/NotFoundPage';

const meta = {
  title: 'Pages/404',
  component: NotFoundPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Terminal-themed 404 page — consistent with the overall aesthetic. ' +
          'Shows a fake shell session where the page request fails, with a ' +
          'plain-language fallback and a link back home. No props — fully self-contained.',
      },
    },
  },
} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
