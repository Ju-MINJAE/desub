'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import { BackButton } from '@/app/components/ui/BackButton';

// 가입 이력이 없는 경우 페이지
export const AccountNotFound = () => {
  const router = useRouter();

  const handleNavigateJoin = () => {
    router.push('/signup');
  };

  return (
    <div className="h-full">
      <div className="pt-[4.7rem] pl-[4.7rem]">
        <BackButton text="forgot account" />
      </div>

      <div className="flex flex-col justify-center items-center pt-[9rem]">
        <Heading tag="h1" className="mb-[4rem] md:mb-[7rem]">
          forgot account?
        </Heading>
        <p className="text-[1.4rem] md:text-[2rem] text-center pb-[10rem] md:pb-[25rem]">
          가입된 이력이 없습니다.
          <br />
          신규 멤버로 가입하시겠습니까?
        </p>

        <Button
          className="text-[1.6rem] h-[5.5rem]"
          size="default"
          type="button"
          variant="black"
          onClick={handleNavigateJoin}
        >
          Join
        </Button>
      </div>
    </div>
  );
};
