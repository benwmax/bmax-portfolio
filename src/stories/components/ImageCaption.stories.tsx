import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageCaption } from '../../components/ImageCaption';

const meta = {
  title: 'Components/ImageCaption',
  component: ImageCaption,
  parameters: {
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
        'Never use a plain <img> tag for case study artifacts.',
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

/**
 * A stand-in screenshot as an inline SVG data URI rather than a committed PNG —
 * the point is to exercise the src/alt code path, and a real binary asset would
 * need maintaining for no added coverage.
 */
const SAMPLE_SCREENSHOT =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
       <rect width="640" height="360" fill="#141612"/>
       <rect x="32" y="32" width="240" height="14" rx="2" fill="#00e054" opacity="0.8"/>
       <rect x="32" y="66" width="440" height="8" rx="2" fill="#ccd4b0" opacity="0.35"/>
       <rect x="32" y="86" width="380" height="8" rx="2" fill="#ccd4b0" opacity="0.35"/>
       <rect x="32" y="130" width="264" height="150" rx="3" fill="#ccd4b0" opacity="0.08"/>
       <rect x="320" y="130" width="264" height="150" rx="3" fill="#ccd4b0" opacity="0.08"/>
       <rect x="32" y="304" width="120" height="24" rx="3" fill="#c08820" opacity="0.7"/>
     </svg>`,
  );

export const WithImage: Story = {
  name: 'With a real image',
  parameters: {
    docs: {
      description: {
        story:
          'The populated state. Passing `src` swaps the dot-grid placeholder for a real ' +
          '`<img>`; the window chrome and caption are unchanged, so a page looks the same ' +
          'before and after screenshots arrive. `alt` is required by the props type whenever ' +
          '`src` is set — a real screenshot must never ship as decorative (WCAG 1.1.1).',
      },
    },
    ai: {
      guidance:
        'The populated state. Always pass src and alt together — the props union enforces it. Write alt that describes what the screenshot shows, not "screenshot of the app".',
      contentRules: [
        'alt describes the content and its point, e.g. "Storybook docs page for the Button component, showing all five states".',
      ],
      avoid: [
        'Never pass src without alt — the type forbids it, and it would hide the image from screen reader users.',
        "Don't restate the caption in the alt text — they are read together, so duplicating is noise.",
      ],
    },
  },
  args: {
    tabLabel: 'portfolio rebuild · storybook',
    caption: 'Fig. 01 — The component library, documented as a public artifact.',
    src: SAMPLE_SCREENSHOT,
    alt: 'A Storybook documentation page: a green heading, two lines of prose, two component preview panels side by side, and an amber tag below them.',
  },
};

export const SabrePlaceholder: Story = {
  name: 'Sabre — hotel workspace placeholder',
  parameters: {
    ai: {
      guidance: 'Reference for the correct tab-label format in the Sabre case study.',
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

export const Futuristic: Story = {
  name: 'Futuristic V2',
  parameters: {
    theme: 'futuristic',
    docs: {
      description: {
        story:
          'The figure chrome under the Futuristic theme — the window chrome lightens to a ' +
          'clean panel, the live dot goes azure, and the placeholder background becomes the ' +
          'fine line grid (the dot-grid token swaps per theme).',
      },
    },
    ai: {
      guidance:
        'Figure chrome under the futuristic theme — token-driven, including the placeholder grid texture.',
    },
  },
  args: {
    tabLabel: 'usaa · A/B test pipeline',
    caption: 'Fig 01 — The A/B pipeline that carried research insights into production.',
  },
};
