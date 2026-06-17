import type { Meta, StoryObj } from '@storybook/react-vite';
import { CaseStudyCard } from '../../components/CaseStudyCard';

const meta = {
  title: 'Components/CaseStudyCard',
  component: CaseStudyCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Navigation card to an individual case study. The number (01–05) is a display element, not a heading — it signals that the order is deliberate. The amber tag identifies industry or method. The whole card is a single link; no secondary actions compete with the click target.',
      },
    },
  },
} satisfies Meta<typeof CaseStudyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The lead case study. First because it is current work, shows AI fluency, and demonstrates the kind of Principal-level meta-thinking the target roles require. "01" is the most prominent number on the page — it should feel earned.',
      },
    },
  },
  args: {
    number: '01',
    title: 'Portfolio Rebuild with Claude',
    description:
      'Directing an AI collaborator to build a design portfolio — and making that process the lead case study.',
    tag: 'AI Collaboration',
    href: '/work/portfolio-rebuild',
  },
};

export const MidList: Story = {
  name: 'Mid-list Card',
  parameters: {
    docs: {
      description: {
        story:
          'A card from mid-list. Same structure, different number. The amber tag carries industry context — "Fintech" tells a recruiter at a glance what regulated domain the work lives in, before they click.',
      },
    },
  },
  args: {
    number: '03',
    title: 'Sagent',
    description:
      'Design leadership on a mortgage servicing platform — building the team, the system, and the product simultaneously.',
    tag: 'Fintech',
    href: '/work/sagent',
  },
};
