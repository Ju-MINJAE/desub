import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/app/components/ui/Input';

const meta: Meta<typeof Input> = {
  title: 'Example/Input',
  component: Input,
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
    status: {
      control: 'radio',
      options: ['default', 'error', 'success'],
    },
    type: {
      control: 'radio',
      options: ['text', 'password', 'email', 'tell'],
    },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    className: { control: 'text' },
  },
  // storybook docs 기본값
  args: {
    placeholder: '홍길동',
    type: 'text',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '홍길동',
    helperText: '',
    status: 'default',
  },
};

export const Error: Story = {
  args: {
    placeholder: 'email-address',
    helperText: '이미 가입된 이메일입니다.',
    status: 'error',
  },
};

export const Success: Story = {
  args: {
    placeholder: 'email-address',
    helperText: '가입 가능한 이메일입니다.',
    status: 'success',
  },
};
