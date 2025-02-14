'use client';

import { useRouter } from 'next/navigation';
import { Button } from './components/ui/Button';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-[15rem] md:pt-[23.5rem]">
      <h1 className="font-bold text-[8.5rem] md:text-[12.8rem]">Oops!</h1>
      <p className="pt-[2rem] md:pt-[3.6rem] font-bold text-[2.4rem] leading-[3.6rem]">
        404 page not found
      </p>
      <p className="px-20 pt-[2rem] md:pt-[3.6rem] pb-[4rem] md:pb-[9rem] text-[1.5rem] leading-[2.25rem]">
        찾고 있는 페이지가 삭제되었거나, 이름이 변경되었거나, 일시적으로 사용할 수 없습니다.
      </p>
      <Button
        variant="outline"
        size={isDesktop ? 'default' : 'small'}
        onClick={() => router.push('/')}
      >
        홈으로 이동
      </Button>
    </div>
  );
}
