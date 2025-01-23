import type { Meta, StoryObj } from '@storybook/react';
import TextButton from '@/app/components/ui/TextButton';

const meta: Meta<typeof TextButton> = {
  title: 'Components/TextButton',
  component: TextButton,
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
    href: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
  // storybook docs 기본값
  args: {
    href: '주소값',
    children: '회원가입',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TextButtonLink: Story = {
  args: {
    href: '주소값',
    children: '회원가입',
  },
};
