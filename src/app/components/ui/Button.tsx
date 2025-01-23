import type React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
        return 'w-[32.375rem] h-[3.4375rem] text-[1ren]';
      case 'small':
        return 'w-[9.5625rem] h-[2.0625rem] text-[0.8125rem]';
      default:
        return 'w-[25rem] h-[3.4375rem]';
    }
  };

  return (
    <button
      className={`
        ${getSizeStyles()} rounded-[50px]
        px-[1.375rem]  py-[0.3125rem]
        ${getVariantStyles()}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
