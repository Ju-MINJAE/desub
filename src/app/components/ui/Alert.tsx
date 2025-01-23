import type React from 'react';
import Image from 'next/image';

interface AlertProps {
  childrenTop: React.ReactNode;
  childrenBottom: React.ReactNode;
  buttonText: string;
  variant?: 'green' | 'black' | 'outline';
  size?: 'full' | 'normal' | 'small';
  className?: string;
}

export const Alert = ({
  childrenTop,
  childrenBottom,
  buttonText,
  variant = 'black',
  size = 'full',
  className = '',
  ...props
}: AlertProps) => {
  const getVariantStyles = (variant?: AlertProps['variant']) => {
    switch (variant) {
      case 'green':
        return 'bg-primary text-black';
      case 'black':
        return 'bg-black text-white';
      default:
        return 'bg-white text-black border-solid border-[1px] border-black';
    }
  };

  const getSizeStyles = (size?: AlertProps['size']) => {
    switch (size) {
      case 'full':
        return 'w-[100%] h-[5rem] text-[1.8rem]';
      case 'small':
        return 'w-[20rem] h-[5rem] text-[1.8rem]';
      case 'normal':
        return 'w-[32.8rem] h-[5rem] text-[1.8rem]';
      default:
        return 'w-[100%] h-[5rem] text-[1.8rem]';
    }
  };

  return (
    <div className="border border-black w-[45.6rem] h-[30.4rem] rounded-[3rem] px-[2.7rem] pt-[2.2rem] pb-[2.8rem] flex flex-col justify-between items-center">
      <img className="self-end" src="/icons/close.svg" alt="" width={40} height={40} />
      <div className="w-full gap-[7.2rem] flex flex-col justify-center items-center text-center">
        <div className="block gap-[1.6rem]">
          <div className="font-medium text-[2rem]">{childrenTop}</div>
          <div className="font-normal text-[1.6rem]">{childrenBottom}</div>
        </div>
        <button
          className={`
            ${getSizeStyles(size)} rounded-[50px]
            px-[1.375rem] py-[0.3125rem]
            ${getVariantStyles(variant)}
            ${className}
          `}
          {...props}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
