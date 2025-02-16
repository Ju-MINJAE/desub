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
        <div className="w-[54rem]">
          <Heading tag="h2" className="mb-[13.3rem] text-center">
            비밀번호 초기화 및 임시 비밀번호가 이메일로 전송되었습니다. <br />
            전송된 이메일에서 임시 비밀번호를 확인 후 다시 로그인해주세요.
          </Heading>
          <div className="pt-[19.6rem]">
            <Button
              size="full"
              type="button"
              variant="green"
              onClick={handleNavigateLogin}
              className="text-[3rem] h-[8.5rem] w-full"
            >
              로그인하러 가기
            </Button>
            <Button
              size="full"
              type="button"
              variant="black"
              onClick={handleNavigateHome}
              className="mt-[3.3rem] text-[3rem] h-[8.5rem] w-full"
            >
              홈으로 이동
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sent;
