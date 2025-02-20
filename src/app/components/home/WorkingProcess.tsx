'use client';

import Link from 'next/link';
import Image from 'next/image';

const RotatingWorkingProcess = () => {
  return (
    <div className="bg-white shadow-2xl rounded-[4.6rem] px-[5%] py-[2.7rem] md:py-[5rem] w-full md:w-[98.4rem] h-auto relative overflow-hidden">
      <div className="flex items-center mb-[7.4rem]">
        <div className="w-[2.4rem] h-[2.4rem] rounded-full bg-red mr-[1.4rem]" />
        <span className="text-[1.3rem] md:text-[1.8rem] font-semibold">Working process</span>
      </div>

      <div className="space-y-[2.1rem] md:space-y-[5.9rem] text-center relative">
        <h3 className="text-[1.8rem] md:text-[2.5rem]">간략한 상담 및 문의</h3>
        <h3 className="text-[1.8rem] md:text-[2.5rem]">구독 결제</h3>
        <h3 className="text-[1.8rem] md:text-[2.5rem]">최적화된 업무 요청</h3>
        <h3 className="text-[1.8rem] md:text-[2.5rem]">작업물 전달</h3>
        <h3 className="text-[1.8rem] md:text-[2.5rem]">피드백 적용 및 완료</h3>
      </div>

      <div className="flex justify-end md:pt-[11.3rem] pt-[7.4rem]">
        <Link
          href="#"
          className="inline-flex items-center font-semibold text-[1.8rem] md:text-[2.5rem]"
        >
          Book a call
          <Image
            src="/icons/arrow.svg"
            alt="arrow_right"
            width={88}
            height={0}
            className="ml-[2rem] rotate-180"
          />
        </Link>
      </div>
    </div>
  );
};

export default RotatingWorkingProcess;
