'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface BackButtonProps {
  text?: string;
  className?: string;
}

export function BackButton({ text, className = '' }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`flex flex-col items-start p-1 focus:outline-none   ${className}`}
      aria-label={text || '뒤로 가기'}
    >
      <Image src="/icons/arrow.svg" alt="BackButton" width={81} height={0} />
      {text && <span className="font-bold mt-6">{text}</span>}
    </button>
  );
}
