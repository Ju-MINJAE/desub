'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/app/components/ui/Heading';
import { BackButton } from '@/app/components/ui/BackButton';
import FindAccountForm from '@/app/components/login/FindAccountForm';

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
        <Heading tag="h2" className="mb-[13.3rem]">
          가입 시 입력한 휴대폰번호를 입력해주세요.
        </Heading>

        <FindAccountForm />
      </div>
    </div>
  );
};

export default Forgot;
