import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '../../components/Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Industry and method label. Amber color family — distinguishes from interactive green and signals "context" rather than "action." Space Mono with ultra-wide tracking makes short labels read as data, not copy. Tags are informational only — no click behavior.',
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Industry tag. Amber was chosen specifically to separate tags from interactive elements — green means "do something," amber means "this is what kind of work it is." Wide tracking at small size is intentional: it reads as a label, not body copy.',
      },
    },
  },
  args: {
    label: 'Fintech',
  },
};

export const MethodTag: Story = {
  name: 'Method Tag',
  parameters: {
    docs: {
      description: {
        story:
          'Method or collaboration context tag. Same component, different label. Tags can carry industry names (Fintech, Travel, Insurance) or process labels (AI Collaboration). No visual distinction between types — the label is the only signal.',
      },
    },
  },
  args: {
    label: 'AI Collaboration',
  },
};
