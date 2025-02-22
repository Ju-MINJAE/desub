'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import { BackButton } from '@/app/components/ui/BackButton';
import TextButton from '@/app/components/ui/TextButton';
import Image from 'next/image';
import { loginWithGoogle } from '@/api/auth';
import { maskEmail } from '@/utils/maskEmail';

interface AccountData {
  email: string;
  provider: string;
}

// 가입 이력이 있는 경우 페이지
export const AccountFound = () => {
  const router = useRouter();
  const [account, setAccount] = useState<AccountData | null>(null);

  const handleNavigateLogin = () => {
    router.push('/login/email');
  };

  useEffect(() => {
    const data = sessionStorage.getItem('foundAccount');
    if (data) {
      setAccount(JSON.parse(data));
    }
  }, [router]);
  const maskedEmail = maskEmail(account?.email ?? ''); //  null 또는 undefined일 때 기본값 ""을 설정

  return (
    <div className="h-full">
      <div className="pt-[4.7rem] pl-[4.7rem]">
        <BackButton text="forgot account" />
      </div>
      <div className="flex flex-col justify-center items-center pt-[9rem]">
        <Heading tag="h1" className="mb-[4.4rem]">
          forgot account?
        </Heading>

        <p className="mb-[6rem] text-[1.4rem] md:text-[2rem] text-center">
          {account?.provider === 'google' ? (
            <>
              이미 <strong>&#123;google&#125;</strong> 로 가입하신 계정이 있습니다.
              <br />
              연동 계정으로 로그인 해주세요.
            </>
          ) : (
            '이미 desub 계정이 있습니다.'
          )}
        </p>
        <p className="mb-[10.6rem] text-[2rem] md:text-[3.5rem]">{maskedEmail}</p>

        {account?.provider === 'google' ? (
          <>
            <Button
              className="flex items-center justify-center text-[1.6rem] h-[5.5rem]"
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
          </>
        ) : (
          <>
            <Button
              className="text-[1.6rem] h-[5.5rem] !w-[40rem]"
              size="full"
              type="button"
              variant="black"
              onClick={handleNavigateLogin}
            >
              로그인하기
            </Button>
            <div className="mt-[2.4rem] text-right w-[40rem]">
              <span className="mr-[3rem] text-[1.3rem]">비밀번호를 잊으셨나요?</span>
              <TextButton href="/login/forgot/account/password" className="self-end mt-[4.5rem]">
                비밀번호 재설정
              </TextButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
