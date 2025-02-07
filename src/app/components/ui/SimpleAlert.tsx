'use client';

import type React from 'react';
import Image from 'next/image';

interface SimpleAlertProps {
  title: React.ReactNode;
  contents?: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export const SimpleAlert = ({ title, contents, className = '', onClose }: SimpleAlertProps) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-60">
      <div
        className={`w-[45.6rem] h-[30.4rem] rounded-[3rem] p-[2.7rem] flex flex-col bg-white gap-[4rem] ${className}`}
      >
        <div className="flex justify-between items-center">
          <div className="text-[2rem] font-medium">{title}</div>
          <Image
            className="self-end cursor-pointer"
            src="/icons/close.svg"
            alt=""
            width={40}
            height={40}
            onClick={onClose}
          />
        </div>
        <div className="h-full flex justify-center items-center">{contents}</div>
      </div>
    </div>
  );
};
