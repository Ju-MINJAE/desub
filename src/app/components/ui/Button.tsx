import type React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'black' | 'outline';
  size?: 'default' | 'full' | 'small';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'outline',
  size = 'default',
  className = '',
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'green':
        return 'bg-primary text-black';
      case 'black':
        return 'bg-black text-white';
      default:
        return 'bg-white text-black border-solid border-[1px] border-black';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'full':
        return 'w-[518px] h-[55px] text-[16px]';
      case 'small':
        return 'w-[153px] h-[33px] text-[13px]';
      default:
        return 'w-[400px] h-[55px]';
    }
  };

  return (
    <button
      className={`
        ${getSizeStyles()} rounded-[50px]
        px-[22px]  py-[5px]
        ${getVariantStyles()}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
