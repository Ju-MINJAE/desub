'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function RotatingWorkingProcess() {
  return (
    <div className="bg-white shadow-2xl rounded-[4.6rem] px-[5%] py-[5rem] w-[70%] max-w-[120rem] mx-auto h-auto relative overflow-hidden">
      <div className="flex items-center gap-3 mb-16">
        <div className="w-[2.4rem] h-[2.4rem] rounded-full bg-red-500" />
        <span className="text-[1.8rem] md:text-[2.2rem] font-semibold">Working process</span>
      </div>

      <div className="space-y-[5.9rem] mb-24 text-center relative">
        <h2 className="text-[2rem]">간략한 상담 및 문의</h2>
        <h2 className="text-[2rem]">구독 결제</h2>

        <div className="relative mx-[10%]">
          <div className="relative z-10 space-y-[5.9rem] border-2 border-dashed border-[#C0C0C0] rounded-[17rem] p-8">
            <h3 className="text-[2rem]">최적화된 업무 요청</h3>
            <h3 className="text-[2rem]">작업물 전달</h3>
            <h3 className="text-[2rem]">피드백 적용 및 완료</h3>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href="#"
          className="inline-flex items-center font-semibold text-[2rem] md:text-[2.5rem]"
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
}
