'use client';
import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import TextButton from '@/app/components/ui/TextButton';
import Image from 'next/image';

const Email = () => {
  return (
    <div className="flex justify-center items-center pb-[8.4rem] min-h-screen">
      <div className="w-1/2 h-screen flex flex-col justify-center">
        <Heading tag="h1" className="mb-[9.7rem] text-center">
          login
        </Heading>

        <div className="flex flex-col justify-center items-center mb-[1.6rem] w-[40rem] mx-auto">
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
            className="flex flex-col items-center w-full"
          >
            <Input
              helperText=""
              placeholder="email address"
              status="default"
              type="email"
              className="!text-[2rem]"
            />
            <Input
              helperText="비밀번호를 다시 확인해주세요."
              placeholder="password"
              status="default"
              type="password"
              className="!text-[2rem] mt-[4.5rem]"
            />
            <TextButton href="주소값" className="self-end mt-[4.5rem]">
              로그인에 문제가 있으신가요?
            </TextButton>
            <Button size="default" type="button" variant="green" className="mt-[4.5rem]">
              login
            </Button>
          </form>
        </div>
        <div className="flex justify-center">
          <TextButton href="주소값">회원가입</TextButton>
        </div>
      </div>

      <div className="relative w-1/2 h-[100vh]">
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
