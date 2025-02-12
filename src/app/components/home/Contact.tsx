'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('전송 중...');

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { to_email: email },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );

      console.log('이메일 전송 성공:', result.text);
      setStatus('이메일이 성공적으로 전송되었습니다!');
      setEmail('');
    } catch (error) {
      console.error('이메일 전송 실패:', error);
      setStatus('이메일 전송에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
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
            className="w-[79rem] !h-[11rem] bg-black font-bold text-[5rem] text-white"
          >
            <a href="https://dbre.co.kr/" target="_blank" rel="noopener noreferrer">
              커스터마이징 프로젝트 의뢰하기
            </a>
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

            <form
              onSubmit={handleSubmit}
              className="relative pt-[10rem] flex items-center gap-4"
              autoComplete="off"
            >
              <label htmlFor="email" className="sr-only">
                이메일 주소
              </label>
              <Input
                id="email"
                type="email"
                placeholder="e-mail address"
                className="w-[80rem] h-14 pl-4 pr-12 text-[2rem] border-b-2 border-black/10 rounded-none focus-visible:ring-0 focus-visible:border-black/30 transition-colors"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-describedby="email-status"
              />
              <button
                type="submit"
                className="p-4 hover:opacity-70 transition-opacity disabled:opacity-50"
                aria-label="이메일 제출"
                disabled={isLoading}
              >
                <Image src="/icons/send.svg" alt="" width={45} height={45} />
              </button>
            </form>
            {status && (
              <p id="email-status" className="mt-4 text-[2rem] text-center" aria-live="polite">
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
