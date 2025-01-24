type BadgeType = {
  id: number;
  label: string;
  variant:
    | 'uxui'
    | 'ecommerce'
    | 'branding'
    | 'logo'
    | 'printing'
    | 'product-design'
    | 'social-contents';
};

export const badges: BadgeType[] = [
  {
    id: 1,
    label: 'UX/UI',
    variant: 'uxui',
  },
  {
    id: 2,
    label: 'E-commerce',
    variant: 'ecommerce',
  },
  {
    id: 3,
    label: 'Branding',
    variant: 'branding',
  },
  {
    id: 4,
    label: 'Logo',
    variant: 'logo',
  },
  {
    id: 5,
    label: 'Printing',
    variant: 'printing',
  },
  {
    id: 6,
    label: 'Product Design',
    variant: 'product-design',
  },
  {
    id: 7,
    label: 'Social Contents',
    variant: 'social-contents',
  },
];
