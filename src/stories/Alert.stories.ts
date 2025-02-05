import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@/app/components/ui/Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
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
    variant: {
      control: 'radio',
      options: ['green', 'black', 'outline'],
    },
    size: {
      control: 'radio',
      options: ['full', 'normal', 'small'],
    },
    childrenTop: { control: 'text' },
    childrenBottom: { control: 'text' },
    buttonText: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GreenAlert: Story = {
  args: {
    childrenTop: 'Green Alert Top',
    childrenBottom: 'This is a green alert message.',
    buttonText: 'Click Me',
    variant: 'green',
    size: 'full',
  },
};

export const BlackAlert: Story = {
  args: {
    childrenTop: 'Black Alert Top',
    childrenBottom: 'This is a black alert message.',
    buttonText: 'Click Me',
    variant: 'black',
    size: 'full',
  },
};

export const OutlineAlert: Story = {
  args: {
    childrenTop: 'Outline Alert Top',
    childrenBottom: 'This is an outline alert message.',
    buttonText: 'Click Me',
    variant: 'outline',
    size: 'small',
  },
};

export const SmallAlert: Story = {
  args: {
    childrenTop: 'Small Alert Top',
    childrenBottom: 'This is a small alert message.',
    buttonText: 'Click Me',
    variant: 'outline',
    size: 'small',
  },
};
