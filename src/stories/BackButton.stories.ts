import type { Meta, StoryObj } from '@storybook/react';
import { BackButton } from '@/app/components/ui/BackButton';

const meta: Meta<typeof BackButton> = {
  title: 'Components/BackButton',
  component: BackButton,
  // decorators: [withNextRouter],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
    nextRouter: {
      path: '/some-path',
      asPath: '/some-path',
      query: {},
    },
    docs: {
      source: {
        type: 'auto',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '뒤로 가기',
    className: 'text-gray-800',
  },
};

export const WithoutText: Story = {
  args: {
    text: undefined,
    className: 'text-gray-800',
  },
};
