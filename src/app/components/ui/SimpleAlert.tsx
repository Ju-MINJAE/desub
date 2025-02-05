'use client';

import type React from 'react';
import Image from 'next/image';

interface SimpleAlertProps {
  childrenTop: React.ReactNode;
  childrenBottom?: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export const SimpleAlert = ({
  childrenTop,
  childrenBottom,
  className = '',
  onClose,
}: SimpleAlertProps) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-60">
      <div
        className={`w-[64rem] h-[46.8rem] rounded-[5.7rem] px-[4.7rem] py-[5.5rem] flex flex-col bg-white gap-[7.9rem] ${className}`}
      >
        <div className="flex justify-between items-center">
          <div className="text-[3rem] font-extrabold">{childrenTop}</div>
          <Image
            className="self-end cursor-pointer"
            src="/icons/close.svg"
            alt=""
            width={40}
            height={40}
            onClick={onClose}
          />
        </div>
        <div className="h-full flex justify-center items-center">{childrenBottom}</div>
      </div>
    </div>
  );
};
