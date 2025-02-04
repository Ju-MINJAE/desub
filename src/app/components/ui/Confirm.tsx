'use client';

import type React from 'react';
import Image from 'next/image';

interface ConfirmProps {
  childrenTop: React.ReactNode;
  childrenBottom: React.ReactNode;
  buttonText1: string;
  buttonText2: string;
  variant1?: 'green' | 'black' | 'outline';
  variant2?: 'green' | 'black' | 'outline';
  className?: string;
  onClose?: () => void;
}

export const Confirm = ({
  childrenTop,
  childrenBottom,
  buttonText1,
  buttonText2,
  variant1 = 'outline',
  variant2 = 'green',
  className = '',
  onClose,
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
      <div className="w-[45.6rem] h-[30.4rem] rounded-[3rem] px-[2.7rem] pt-[2.2rem] pb-[2.8rem] flex flex-col justify-between items-center bg-white">
        <Image
          className="self-end cursor-pointer"
          src="/icons/close.svg"
          alt=""
          width={40}
          height={40}
          onClick={onClose}
        />
        <div className="w-full gap-[7.2rem] flex flex-col justify-center items-center text-center">
          <div className="block gap-[1.6rem]">
            <div className="font-medium text-[2rem]">{childrenTop}</div>
            <div className="font-normal text-[1.6rem]">{childrenBottom}</div>
          </div>
          <div className="flex gap-[0.5rem]">
            <button
              className={`
            rounded-[50px]
            px-[1.375rem] py-[0.3125rem]
            w-[20rem] h-[5rem] text-[1.8rem]
            ${getVariantStyles1(variant1)}
            ${className}
          `}
              {...props}
            >
              {buttonText1}
            </button>
            <button
              className={`
            rounded-[50px]
            px-[1.375rem] py-[0.3125rem]
            w-[20rem] h-[5rem] text-[1.8rem]
            ${getVariantStyles2(variant2)}
            ${className}
          `}
              {...props}
            >
              {buttonText2}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
