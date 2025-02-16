'use client';

import type React from 'react';
import Image from 'next/image';

interface AlertProps {
  title: React.ReactNode;
  contents?: React.ReactNode;
  buttonText: string;
  textButton?: string; // 추가
  variant?: 'green' | 'black' | 'outline';
  size: 'full' | 'normal' | 'small';
  className?: string;
  onClose: () => void;
  onSubmit?: () => void;
}

export const Alert = ({
  title,
  contents,
  buttonText,
  textButton,
  variant = 'black',
  size = 'full',
  className = '',
  onClose,
  onSubmit,
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
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-60">
      <div
        className={`min-w-[45.6rem] min-h-[30.4rem] rounded-[3rem] px-[2.7rem] pt-[2.2rem] pb-[2.8rem] flex flex-col justify-between items-center bg-white ${className}`}
      >
        <Image
          className="self-end cursor-pointer mb-0"
          src="/icons/close.svg"
          alt=""
          width={40}
          height={40}
          onClick={onClose}
        />
        <div className="font-medium text-center text-[2rem]">{title}</div>
        <div className="w-full h-full font-normal text-[1.6rem]">{contents}</div>
        <button
          onClick={onSubmit}
          className={`
        ${getSizeStyles(size)} rounded-[50px]
        px-[1.375rem] py-[0.3125rem]
        ${getVariantStyles(variant)} 
      `}
          {...props}
        >
          {buttonText}
        </button>
        {textButton && (
          <button
            type="button"
            onClick={onClose}
            className="text-[1.3rem] leading-[1.6rem] font-medium underline"
          >
            {textButton}
          </button>
        )}
      </div>
    </div>
  );
};
