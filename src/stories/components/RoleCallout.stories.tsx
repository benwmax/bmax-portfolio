import type { Meta, StoryObj } from '@storybook/react-vite';
import { RoleCallout, RoleCallouts } from '../../components/RoleCallout';

const meta = {
  title: 'Components/RoleCallout',
  component: RoleCallout,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Role ownership row — 132px fixed label column in mono-ui uppercase, ' +
          'flowing content column in sans serif. ' +
          'Used in the "Role" section of a case study to make explicit what was owned, ' +
          'what was not, and what the key in-the-room moments were. ' +
          'Rows are separated by 1px subtle borders; the list has a closing bottom border. ' +
          'The label/content split is intentional: labels read as a spec sheet, ' +
          'content reads as a story — the contrast between them creates hierarchy without headings.',
      },
    },
  },
} satisfies Meta<typeof RoleCallout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Single row',
  args: {
    label: 'Owned',
    content:
      'Lead designer on P&C insurance. I sat between the team and our Director — defining project strategy, running workshops, leading stakeholder meetings, and making the work happen.',
  },
};

export const List: Story = {
  name: 'Role section — USAA',
  args: {
    label: 'Owned',
    content: 'Role content.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Three rows composed with the RoleCallouts wrapper. ' +
          'Each row answers a different question: what was owned, what was not, what was the key moment.',
      },
    },
  },
  render: () => (
    <RoleCallouts>
      <RoleCallout
        label="Owned"
        content="Lead designer on P&C insurance. I sat between the team and our Director — defining project strategy, running workshops, leading stakeholder meetings, mentoring junior designers, and making the work happen."
      />
      <RoleCallout
        label="Director layer"
        content="My Director handled the org layer. I handled everything in the room."
      />
      <RoleCallout
        label="In the room"
        content="Ran a design sprint with cross-functional stakeholders to align on KPIs, size up the competition, and get testable directions on the table fast."
      />
    </RoleCallouts>
  ),
};

export const LeadershipStory: Story = {
  name: 'Leadership departure story — Sagent',
  args: {
    label: 'Started as',
    content: 'Role content.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When a role includes unexpected scope expansion, the label slot can call it out directly.',
      },
    },
  },
  render: () => (
    <RoleCallouts>
      <RoleCallout
        label="Started as"
        content="IC designer, one of four. Lead designer on mortgage origination workflows."
      />
      <RoleCallout
        label="Became"
        content="Co-lead on the full product when the Design Director left unexpectedly six months in. No backfill. Two junior designers to mentor."
      />
      <RoleCallout
        label="In the room"
        content="Led strategic planning across 12 business teams. Built and ran the design sprint program that aligned product, engineering, and operations."
      />
    </RoleCallouts>
  ),
};
