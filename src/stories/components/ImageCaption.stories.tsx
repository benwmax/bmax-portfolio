import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageCaption } from '../../components/ImageCaption';

const meta = {
  title: 'Components/ImageCaption',
  component: ImageCaption,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Terminal-chrome image frame — a desktop-window mock with traffic-light dots, ' +
          'a tab label, and a 16:9 content area. ' +
          'When no src is provided, a dot-grid placeholder is shown with a terminal › prompt ' +
          'indicating where the screenshot will go. ' +
          'When src is provided, the image fills the frame via object-fit: cover. ' +
          'The chrome aesthetic (border-radius: 3px, 3 dots, mono-ui tab label) ' +
          'is consistent with the terminal theme: everything in this UI is a workspace or a tool. ' +
          'Caption is mono-ui 10px tertiary — subordinate to the image, visible but not competing.',
      },
    },
  },
} satisfies Meta<typeof ImageCaption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Placeholder (no image)',
  args: {
    tabLabel: 'usaa · A/B test → redesign pipeline',
    caption: 'Fig. 01 — A/B test → redesign pipeline.',
  },
};

export const SabrePlaceholder: Story = {
  name: 'Sabre — hotel workspace placeholder',
  args: {
    tabLabel: 'sabre-red · hotel-workspace',
    caption:
      'Fig. 01 — Graphical Hotel mode with the command interface intact; agents move between the two freely.',
  },
};
