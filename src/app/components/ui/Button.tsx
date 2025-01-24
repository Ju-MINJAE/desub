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
  disabled = false,
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
        return 'w-[51.8rem] h-[5.5rem] text-[1.6rem]';
      case 'small':
        return disabled // small button disable 속성 추가
          ? 'w-[15.3rem] h-[3.3rem] text-[1.3rem] disabled:bg-lightgray disabled:text-darkgray disabled:cursor-not-allowed'
          : 'w-[15.3rem] h-[3.3rem] text-[1.3rem]';
      default:
        return 'w-[40rem] h-[5.5rem]';
    }
  };

  return (
    <button
      disabled={disabled}
      className={`
      ${getSizeStyles()} rounded-[80px]
      ${getVariantStyles()}
      ${className}
  `}
      {...props}
    >
      {children}
    </button>
  );
};
