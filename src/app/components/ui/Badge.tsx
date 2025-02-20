interface BadgeProps {
  label: string;
  variant:
    | 'uxui'
    | 'ecommerce'
    | 'branding'
    | 'logo'
    | 'printing'
    | 'product-design'
    | 'social-contents';
  className?: string;
}

const Badge = ({ label, variant }: BadgeProps) => {
  const getVariantStyles = (variant: BadgeProps['variant']): string => {
    switch (variant) {
      case 'uxui':
        return 'bg-black text-white';
      case 'ecommerce':
        return 'bg-red text-white';
      case 'branding':
        return 'bg-[#0A49E8] text-white';
      case 'logo':
        return 'bg-[#FFF600] text-black';
      case 'printing':
        return 'bg-[#FF8025] text-white';
      case 'product-design':
        return 'bg-primary text-black';
      case 'social-contents':
        return 'bg-[#FF009D] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <span
      className={`px-[5rem] flex items-center md:h-[9.4rem] h-[6.4rem] rounded-full md:text-[4rem] text-[2rem] font-semibold ${getVariantStyles(
        variant,
      )}`}
    >
      {label}
    </span>
  );
};

export default Badge;
