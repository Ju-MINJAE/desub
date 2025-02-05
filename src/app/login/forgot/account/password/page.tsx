'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/app/components/ui/Heading';
import { BackButton } from '@/app/components/ui/BackButton';
import ResetPasswordForm from '@/app/components/login/ResetPassWordForm';

const Password = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/login/forgot/account/password/sent');
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
        <Heading tag="h2" className="mb-[13.3rem] text-center">
          비밀번호 재설정을 위해
          <br />
          계정(이메일)을 입력하세요.
        </Heading>

        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default Password;
