import type { Meta, StoryObj } from '@storybook/react';
import { SimpleAlert } from '@/app/components/ui/SimpleAlert';

const meta: Meta<typeof SimpleAlert> = {
  title: 'Components/SimpleAlert',
  component: SimpleAlert,
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        type: 'auto',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    childrenTop: { control: 'text' },
    childrenBottom: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GreenAlert: Story = {
  args: {
    childrenTop: 'Title',
    childrenBottom: 'This is a simple alert.',
  },
};
