'use client';
import Heading from '@/app/components/ui/Heading';
import LoginForm from '@/app/components/login/LoginForm';
import TextButton from '@/app/components/ui/TextButton';
import Image from 'next/image';

const Email = () => {
  return (
    <div className="flex h-[104.2rem]">
      <div className="w-1/2 flex flex-col justify-center">
        <Heading tag="h1" className="mb-[9.7rem] text-center">
          login
        </Heading>

        <LoginForm />
        <div className="flex justify-center">
          <TextButton href="주소값">회원가입</TextButton>
        </div>
      </div>

      <div className="relative w-1/2">
        <Image
          src="/login_intro.png"
          alt="로그인"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Email;
