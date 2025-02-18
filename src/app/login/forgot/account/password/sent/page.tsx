'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import { BackButton } from '@/app/components/ui/BackButton';

const Sent = () => {
  const router = useRouter();

  const handleNavigateLogin = () => {
    router.push('/login');
  };
  const handleNavigateHome = () => {
    router.push('/');
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
        <p className="text-[2rem] text-center pb-[12rem]">
          비밀번호 초기화 및 임시 비밀번호가 이메일로 전송되었습니다. <br />
          전송된 이메일에서 임시 비밀번호를 확인 후 다시 로그인해주세요.
        </p>
        <div className="pt-[19.6rem] w-[40rem]">
          <Button
            size="full"
            type="button"
            variant="green"
            onClick={handleNavigateLogin}
            className="text-[1.6rem] h-[5.5rem] w-full"
          >
            로그인하러 가기
          </Button>
          <Button
            size="full"
            type="button"
            variant="black"
            onClick={handleNavigateHome}
            className="mt-[3.3rem] text-[1.6rem] h-[5.5rem] w-full"
          >
            홈으로 이동
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sent;
