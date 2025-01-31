import type { Meta, StoryObj } from '@storybook/react';
import { Confirm } from '@/app/components/ui/Confirm';

const meta: Meta<typeof Confirm> = {
  title: 'Components/Confirm',
  component: Confirm,
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
    variant1: {
      control: 'radio',
      options: ['green', 'black', 'outline'],
    },
    variant2: {
      control: 'radio',
      options: ['green', 'black', 'outline'],
    },
    childrenTop: { control: 'text' },
    childrenBottom: { control: 'text' },
    buttonText1: { control: 'text' },
    buttonText2: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OutlineAlert: Story = {
  args: {
    childrenTop: 'Outline Alert Top',
    childrenBottom: 'This is an outline alert message.',
    buttonText1: 'Click Me',
    buttonText2: 'Click Me',
    variant1: 'outline',
    variant2: 'green',
  },
};

export const SmallAlert: Story = {
  args: {
    childrenTop: 'Small Alert Top',
    childrenBottom: 'This is a small alert message.',
    buttonText1: 'Click Me',
    buttonText2: 'Click Me',
    variant1: 'outline',
    variant2: 'black',
  },
};
