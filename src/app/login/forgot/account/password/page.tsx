'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/app/components/ui/Heading';
import { BackButton } from '@/app/components/ui/BackButton';
import ResetPasswordForm from '@/app/components/login/ResetPassWordForm';

const Password = () => {
  const router = useRouter();

  return (
    <div className="h-full">
      <div className="pt-[4.7rem] pl-[4.7rem]">
        <BackButton text="forgot account" />
      </div>
      <div className="flex flex-col justify-center items-center pt-[9rem]">
        <Heading tag="h1" className="mb-[4.4rem]">
          forgot account?
        </Heading>
        <p className="text-[1.4rem] md:text-[2rem] text-center pb-[4rem] md:pb-[8rem]">
          비밀번호 재설정을 위해
          <br />
          계정(이메일)을 입력하세요.
        </p>

        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default Password;
