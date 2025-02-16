'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import { BackButton } from '@/app/components/ui/BackButton';

// 가입 이력이 없는 경우 페이지
export const AccountNotFound = () => {
  const router = useRouter();

  const handleNavigateJoin = () => {
    router.push('/join');
  };

  return (
    <div className="h-full">
      <div className="pt-[4.7rem] pl-[4.7rem]">
        <BackButton text="forgot account" />
      </div>
      <div className="flex flex-col justify-center items-center pt-[9rem]">
        <Heading tag="h1" className="mb-[4.4rem]">
          forgot account?
        </Heading>
        <Heading tag="h2" className="pb-[40.6rem] text-center">
          가입된 이력이 없습니다.
          <br />
          신규 멤버로 가입하시겠습니까?
        </Heading>
        <Button
          className="text-[3rem] h-[8.5rem] w-[54rem]"
          size="full"
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
