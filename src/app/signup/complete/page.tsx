'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import { useEffect } from 'react';

export default function Complete() {
  const router = useRouter();

  // 3초후 홈으로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  });
  const handleNavigateHome = () => {
    router.push('/');
  };
  return (
    <div className="h-full">
      <div className="flex flex-col justify-center items-center">
        <Heading tag="h1" className="mb-[4.4rem] mt-[9rem]">
          welcome!
        </Heading>
        <div className="w-[54rem]">
          <Heading tag="h2" className="text-center">
            Desub 멤버가 되신 것을 환영합니다! <br />
            3초 후 홈화면으로 이동합니다.
          </Heading>
          <div className="pt-[50.3rem]">
            <Button
              size="full"
              type="button"
              variant="black"
              onClick={handleNavigateHome}
              className="text-[3rem] h-[8.5rem] w-full"
            >
              홈으로 이동
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
