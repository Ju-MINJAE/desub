'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import { BackButton } from '@/app/components/ui/BackButton';
import { Input } from '@/app/components/ui/Input';

const Forgot = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/login/forgot/account');
  };
  return (
    <div className="h-full">
      <div className="pt-[4.7rem] pl-[4.7rem]">
        <BackButton text="forgot account" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Heading tag="h1" className="mb-[4.4rem]">
          forgot account?
        </Heading>
        <p className="mb-[13.3rem]">가입 시 입력한 휴대폰번호를 입력해주세요.</p>

        <form
          onSubmit={e => {
            e.preventDefault();
          }}
          className="flex flex-col items-center w-[54rem]"
        >
          <Input
            helperText=""
            placeholder="010-1234-5678"
            status="default"
            type="tel"
            className="mb-[13.2rem]"
          />
          <Button size="full" type="button" variant="black" onClick={handleNavigate}>
            계정찾기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
