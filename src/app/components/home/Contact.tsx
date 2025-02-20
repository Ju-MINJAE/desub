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
    setStatus('요청 중...');

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { to_email: email },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );

      console.log('이메일 전송 성공:', result.text);
      setStatus('입력하신 이메일로 desub 포트폴리오 요청이 완료되었습니다!');
      setEmail('');
    } catch (error) {
      console.error('이메일 전송 실패:', error);
      setStatus('이메일 전송에 실패했습니다. 네트워크 상태를 확인한 후 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-[6.5rem] md:pt-[7.2rem] pb-20 px-4 flex justify-center">
      <div className="w-screen">
        <h2 className="ml-[3.1rem] md:ml-[17rem] mb-[3.5rem] text-[2rem] md:text-[4rem] font-bold">
          규모가 있는 프로젝트 진행이 필요하신가요?
        </h2>
        <div className="flex justify-center md:justify-start md:ml-[18rem] mb-8 md:mb-[15.8rem]">
          <Button
            variant="black"
            className="!w-[34.1rem] !h-[7.9rem] md:!w-[79rem] md:!h-[11rem] font-bold text-[1.8rem] md:text-[5rem] text-white"
          >
            <a href="https://dbre.co.kr/" target="_blank" rel="noopener noreferrer">
              커스터마이징 프로젝트 의뢰하기
            </a>
          </Button>
        </div>

        <div className="w-full md:max-w-[122rem] mx-auto bg-white rounded-[4.6rem] px-[6rem] py-[8rem] shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="space-y-6 text-center">
              <p className="text-[1.8rem] md:text-[2rem] font-semibold">Join our journey!</p>
              <div className="md:space-y-2 md:pt-[6rem] pt-[4rem]">
                <p className="font-medium text-[1.6rem] md:text-[3rem]">
                  타임할인, 신규 서비스 등 <span className="font-semibold">desub</span>의{' '}
                  <br className="md:hidden" />
                  새로운 정보를 확인하세요!
                </p>
                <p className="font-medium text-[1.6rem] md:text-[3rem]">
                  이메일 입력 시 <span className="font-semibold">desub</span> 서비스소개서 및
                  포트폴리오를 보내드립니다.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative w-full md:w-[62.9rem] pt-[4rem] md:pt-[10rem] flex items-center gap-4"
              autoComplete="off"
            >
              <Input
                id="email"
                type="email"
                placeholder="e-mail address"
                className="h-14 pl-4 pr-12 border-b-2 border-black/10 rounded-none focus-visible:ring-0 focus-visible:border-black/30 transition-colors"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-describedby="email-status"
              />
              <button
                type="submit"
                className="p-2 sm:p-4 hover:opacity-70 transition-opacity disabled:opacity-50 focus:outline-none"
                aria-label="이메일 제출"
                disabled={isLoading}
              >
                <div className="relative w-[25px] h-[25px] md:w-[45px] md:h-[45px]">
                  <Image fill alt="email_send" src="/icons/send.svg" className="object-contain" />
                </div>
              </button>
            </form>
            {status && (
              <p
                id="email-status"
                className="mt-4 text-[1.4rem] md:text-[2rem] text-center"
                aria-live="polite"
              >
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
