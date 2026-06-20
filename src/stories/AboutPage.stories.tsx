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
  },
} satisfies Meta<typeof AboutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
