import type { Meta, StoryObj } from '@storybook/react';
import Heading from '@/app/components/ui/Heading';

const meta: Meta<typeof Heading> = {
  title: 'Example/Heading',
  component: Heading,
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
    tag: {
      control: 'radio',
      options: ['h1', 'h2', 'h3'],
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
    children: '홍길동',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    children: 'h1 Title',
    tag: 'h1',
  },
};

export const H2: Story = {
  args: {
    children: 'h2 Sub title 30px',
    tag: 'h2',
  },
};

export const H3: Story = {
  args: {
    children: 'h3 Sub title 20px',
    tag: 'h3',
  },
};
