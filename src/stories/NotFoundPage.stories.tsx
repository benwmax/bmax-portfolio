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
    ai: {
      guidance:
        'Terminal-themed 404 page. Fully self-contained — no props. Shows a fake shell session where the page request fails, then links home.',
      contentRules: [
        'The only CTA is a link back to the homepage.',
      ],
      avoid: [
        "Don't add a search bar or site map to the 404 page — link back home only.",
        "Don't replace the terminal-themed visual with a generic error illustration.",
      ],
    },
  },
} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    ai: {
      guidance:
        'The complete 404 page. No props needed. Reference this story to confirm the terminal aesthetic is intact after any token or style changes.',
      avoid: [
        "Don't alter the fake shell session copy — it's intentionally styled as a terminal command failure.",
      ],
    },
  },
};
