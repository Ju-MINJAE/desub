'use client';

import type React from 'react';
import Image from 'next/image';

interface ConfirmProps {
  title: React.ReactNode;
  contents?: React.ReactNode;
  buttonText1: string;
  buttonText2: string;
  variant1: 'green' | 'black' | 'outline';
  variant2: 'green' | 'black' | 'outline';
  className?: string;
  titleClassName?: string;
  onClose: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export const Confirm = ({
  title,
  contents,
  buttonText1,
  buttonText2,
  variant1 = 'outline',
  variant2 = 'green',
  className = '',
  titleClassName = '',
  onClose,
  onSubmit,
  onCancel,
  ...props
}: ConfirmProps) => {
  const getVariantStyles1 = (variant1?: ConfirmProps['variant1']) => {
    switch (variant1) {
      case 'green':
        return 'bg-primary text-black';
      case 'black':
        return 'bg-black text-white';
      default:
        return 'bg-white text-black border-solid border-[1px] border-black';
    }
  };

  const getVariantStyles2 = (variant2?: ConfirmProps['variant2']) => {
    switch (variant2) {
      case 'green':
        return 'bg-primary text-black';
      case 'black':
        return 'bg-black text-white';
      default:
        return 'bg-white text-black border-solid border-[1px] border-black';
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-60">
      <div
        className={`min-w-[30rem] md:min-w-[45.6rem] h-[30.4rem] rounded-[3rem] px-[2.7rem] pt-[2.2rem] pb-[2.8rem] flex flex-col justify-between items-center bg-white ${className}`}
      >
        <Image
          className="self-end cursor-pointer"
          src="/icons/close.svg"
          alt="Confirm_close"
          width={40}
          height={40}
          onClick={onClose}
        />
        <div
          className={`w-full gap-[7.2rem] flex flex-col justify-center items-center text-center ${titleClassName}`}
        >
          <div className="block gap-[1.6rem]">
            <div className="font-medium text-[2rem]">{title}</div>
            <div className="font-normal text-[1.6rem]">{contents}</div>
          </div>
        </div>
        <div className="flex gap-[5%] w-full">
          <button
            onClick={onCancel}
            className={`
            rounded-[50px]
            px-[1.375rem] py-[0.3125rem]
           w-full h-[5rem] text-[1.8rem]
            ${getVariantStyles1(variant1)}
          `}
            {...props}
          >
            {buttonText1}
          </button>
          <button
            onClick={onSubmit}
            className={`
            rounded-[50px]
            px-[1.375rem] py-[0.3125rem]
           w-full h-[5rem] text-[1.8rem]
            ${getVariantStyles2(variant2)}
          `}
            {...props}
          >
            {buttonText2}
          </button>
        </div>
      </div>
    </div>
  );
};
