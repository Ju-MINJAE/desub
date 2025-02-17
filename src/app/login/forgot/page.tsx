'use client';

import Heading from '@/app/components/ui/Heading';
import { BackButton } from '@/app/components/ui/BackButton';
import FindAccountForm from '@/app/components/login/FindAccountForm';

const Forgot = () => {
  return (
    <div className="h-full">
      <div className="pt-[4.7rem] pl-[4.7rem]">
        <BackButton text="forgot account" />
      </div>
      <div className="flex flex-col justify-center items-center pt-[9rem]">
        <Heading tag="h1" className="mb-[4.4rem]">
          forgot account?
        </Heading>
        <p className="mb-[13.3rem] text-[2rem] leading-[5.4rem]">
          가입 시 입력한 휴대폰번호를 입력해주세요.
        </p>
        <FindAccountForm />
      </div>
    </div>
  );
};

export default Forgot;
