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
    ai: {
      guidance:
        'Terminal-chrome frame for all case study screenshots and artifact images. Always use this — never a plain <img> tag for portfolio artifacts.',
      contentRules: [
        'tabLabel format: "project · artifact-type" — e.g., "usaa · A/B test pipeline", "sabre-red · hotel-workspace".',
        'caption format: "Fig. 01 — description." — numbered, em dash, period.',
        'Omit src while the actual screenshot is being sourced — the dot-grid placeholder is intentional.',
      ],
      avoid: [
        "Never use a plain <img> tag for case study artifacts.",
        "Don't use a grey box placeholder — the dot-grid treatment is the system default.",
        "Don't skip the caption — figcaption is part of the semantic structure.",
      ],
    },
  },
} satisfies Meta<typeof ImageCaption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Placeholder (no image)',
  parameters: {
    ai: {
      guidance:
        'Use while the actual screenshot is being sourced. The dot-grid placeholder with › prompt signals "image goes here" in the terminal aesthetic.',
    },
  },
  args: {
    tabLabel: 'usaa · A/B test → redesign pipeline',
    caption: 'Fig. 01 — A/B test → redesign pipeline.',
  },
};

export const SabrePlaceholder: Story = {
  name: 'Sabre — hotel workspace placeholder',
  parameters: {
    ai: {
      guidance:
        'Reference for the correct tab-label format in the Sabre case study.',
      contentRules: [
        'Tab label uses the project codename in kebab-case: "sabre-red · hotel-workspace".',
      ],
    },
  },
  args: {
    tabLabel: 'sabre-red · hotel-workspace',
    caption:
      'Fig. 01 — Graphical Hotel mode with the command interface intact; agents move between the two freely.',
  },
};
