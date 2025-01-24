'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import { BackButton } from '@/app/components/ui/BackButton';
import TextButton from '@/app/components/ui/TextButton';

const Account = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/login/email');
  };
  return (
    <div className="h-full">
      <div className="pt-[4.7rem] pl-[4.7rem]">
        <BackButton text="forgot account" />
      </div>
      <div className="flex flex-col justify-center items-center">
        {/* 가입이력이 있는 경우 */}
        <Heading tag="h1" className="mb-[4.4rem]">
          forgot account?
        </Heading>
        <p className="mb-[9.8rem]">이미 desub 계정이 있습니다.</p>
        <p className="mb-[20.6rem] text-[2.5rem]">de********@gm***.com</p>

        <Button size="full" type="button" variant="black" onClick={handleNavigate}>
          로그인하기
        </Button>
        <div className="mt-[2.4rem] text-right w-[51.8rem]">
          <span className="mr-[3rem] text-[1.3rem]">비밀번호를 잊으셨나요?</span>
          <TextButton href="주소값" className="self-end mt-[4.5rem]">
            비밀번호 재설정
          </TextButton>
        </div>
      </div>
    </div>
  );
};

export default Account;
