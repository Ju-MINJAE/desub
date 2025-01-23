import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@/app/components/ui/Alert';

const meta: Meta<typeof Alert> = {
  title: 'Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'auto',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    buttonText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    childrenTop: 'This is the top content',
    childrenBottom: 'This is the bottom content',
    buttonText: 'Click Me', // 버튼 텍스트 설정
  },
};
