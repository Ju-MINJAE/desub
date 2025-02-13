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
    <div className="flex h-[104.2rem]">
      <div className="w-1/2 flex flex-col justify-center items-center text-center">
        <div>
          <Heading tag="h1" className="mb-[16.8rem]">
            login
          </Heading>

          <div className="flex flex-col justify-center items-center mb-[6.7rem]">
            <Button
              className="mb-[2.9rem] flex items-center justify-center"
              size="default"
              type="button"
              variant="outline"
              onClick={loginWithGoogle}
            >
              <span className="mr-[1rem]">
                <Image src="/icons/google.png" alt="로그인" width={20} height={20} />
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

export default Login;
