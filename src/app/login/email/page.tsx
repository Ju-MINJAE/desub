'use client';
import Heading from '@/app/components/ui/Heading';
import LoginForm from '@/app/components/login/LoginForm';
import TextButton from '@/app/components/ui/TextButton';
import Image from 'next/image';

const Email = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-full md:min-h-screen">
      <div className="w-full md:w-1/2 md:order-2 mb-[8rem] md:mb-0">
        <div className="relative w-full h-[22.3rem] md:h-full">
          <Image
            src="/images/login_intro.png"
            alt="desub_login"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-8 md:p-0 md:order-1">
        <div>
          <Heading tag="h1" className="mb-[5rem] md:mb-[16.8rem]">
            login
          </Heading>

          <LoginForm />
          <div className="flex justify-center">
            <TextButton href="/signup">회원가입</TextButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;
