import type React from 'react';
import Image from 'next/image';
import { Button } from './Button';

interface AlertProps {
  childrenTop: React.ReactNode; // 상단 내용
  childrenBottom: React.ReactNode; // 하단 내용
  buttonText: string; // 버튼 텍스트
}

export const Alert = ({ childrenTop, childrenBottom, buttonText }: AlertProps) => {
  return (
    <div className="border border-black w-[45.6rem] h-[30.4rem] rounded-[3rem] px-[2.7rem] pt-[2.2rem] pb-[2.8rem] flex flex-col justify-between items-center">
      <Image className="self-end" src="/icons/close.svg" alt="" width={40} height={40} />
      <div className="gap-[7.2rem] flex flex-col justify-center text-center">
        <div>
          <div>{childrenTop}</div>
          <div>{childrenBottom}</div>
        </div>
        <Button>{buttonText}</Button>
      </div>
    </div>
  );
};
