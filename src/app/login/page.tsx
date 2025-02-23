'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import TextButton from '@/app/components/ui/TextButton';
import Image from 'next/image';
import { loginWithGoogle } from '@/api/auth';

const Login = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/login/email');
  };

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

          <div className="flex flex-col justify-center items-center mb-[4rem] md:mb-[6.7rem]">
            <Button
              className="mb-[2.9rem] flex items-center justify-center"
              size="default"
              type="button"
              variant="outline"
              onClick={loginWithGoogle}
            >
              <span className="mr-[1rem]">
                <Image src="/images/google.png" alt="로그인" width={20} height={20} />
              </span>
              Google Login
            </Button>
            <Button size="default" type="button" variant="outline" onClick={handleNavigate}>
              E-mail Login
            </Button>
          </div>

          <TextButton href="/signup">회원가입</TextButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
