import type { Meta, StoryObj } from '@storybook/react';
import Badge from '@/app/components/ui/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
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
    variant: {
      control: 'select',
      options: [
        'uxui',
        'ecommerce',
        'branding',
        'logo',
        'printing',
        'product-design',
        'social-contents',
      ],
    },
    label: {
      control: 'text',
    },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UXUI: Story = {
  args: {
    label: 'UX/UI',
    variant: 'uxui',
  },
};

export const Ecommerce: Story = {
  args: {
    label: 'Ecommerce',
    variant: 'ecommerce',
  },
};

export const Branding: Story = {
  args: {
    label: 'Branding',
    variant: 'branding',
  },
};

export const Logo: Story = {
  args: {
    label: 'Logo',
    variant: 'logo',
  },
};

export const Printing: Story = {
  args: {
    label: 'Printing',
    variant: 'printing',
  },
};

export const ProductDesign: Story = {
  args: {
    label: 'Product Design',
    variant: 'product-design',
  },
};

export const SocialContents: Story = {
  args: {
    label: 'Social Contents',
    variant: 'social-contents',
  },
};
