'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import Image from 'next/image';

const Contact = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <div className="pt-[7.2rem] pb-20 px-4 flex justify-center">
      <div className="w-full">
        <h2 className="text-[4rem] font-bold ml-[17rem] mb-[3.5rem]">
          규모가 있는 프로젝트 진행이 필요하신가요?
        </h2>
        <div className="relative ml-[18rem] mb-32">
          <Button
            variant="black"
            className="w-[79rem] h-[11rem] bg-black font-bold text-[5rem] text-white"
          >
            커스터마이징 프로젝트 의뢰하기
          </Button>
        </div>

        <div className="w-[120rem] mx-auto bg-white rounded-[32px] p-12 shadow-2xl">
          <div className="max-w-[80%] mx-auto space-y-8 flex flex-col items-center">
            <div className="space-y-6 text-center">
              <h1 className="text-[2rem] font-semibold mt-[7rem]">Join our journey!</h1>
              <div className="space-y-2 pt-[6rem]">
                <p className="font-medium text-[3rem]">
                  타임할인, 신규 서비스 등 desub의 새로운 정보를 확인하세요!
                </p>
                <p className="font-medium text-[3rem]">
                  이메일 입력 시 desub의 서비스소개서 및 포트폴리오를 보내드립니다.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="relative pt-[10rem] flex items-center gap-4">
              <Input
                type="email"
                placeholder="e-mail address"
                className="w-[80rem] h-14 pl-4 pr-12 text-[2rem] border-b-2 border-black/10 rounded-none focus-visible:ring-0 focus-visible:border-black/30 transition-colors"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="p-4 hover:opacity-70 transition-opacity"
                aria-label="Submit email"
              >
                <Image src="/icons/send.svg" alt="send_icon" width={45} height={45} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
