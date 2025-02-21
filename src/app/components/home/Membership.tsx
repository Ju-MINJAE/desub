'use client';

import Image from 'next/image';
import { STANDARD_PRICE } from '@/constants/price';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const Membership = () => {
  const router = useRouter();
  const [buttonText, setButtonText] = useState('check design option');
  useEffect(() => {
    const updateButtonText = () => {
      if (window.innerWidth <= 768) {
        setButtonText('Explore more options');
      } else {
        setButtonText('check design option');
      }
    };

    updateButtonText(); // 초기값 설정
    window.addEventListener('resize', updateButtonText);

    return () => {
      window.removeEventListener('resize', updateButtonText);
    };
  }, []);
  return (
    <div className="flex flex-col justify-center items-center text-center pt-[12rem] md:pt-[20rem] pb-16 md:pb-[13.3rem]">
      <h2 className="ml-[4rem] md:ml-[13.5rem] mb-10 md:mb-20 font-normal text-[1.8rem] md:text-[4rem] self-start text-left">
        Pricing
      </h2>

      <div className="w-[90%] md:w-[70%] max-w-[91.5rem] flex flex-col items-end">
        <div className="w-full pt-[4.8rem] md:pt-[7.5rem] px-[2.2rem] pb-12 md:pb-16 rounded-[4rem] border">
          <div className="w-[10rem] h-[10rem] md:w-[17.2rem] md:h-[17.2rem] mx-auto mb-[1.4rem] md:mb-[5rem] relative">
            <Image
              fill
              sizes="(min-width: 768px) 17.2rem, 10rem"
              alt="desub_membership"
              src="/images/desub_membership.png"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <h3 className="font-bold text-[3rem] md:text-[5rem] mb-0 md:mb-4 leading-[7.5rem]">
            membership
          </h3>
          <p className="font-medium text-[1.5rem] md:text-[1.8rem] mb-6">Monthly</p>

          <div className="flex flex-col items-center pt-[1.4rem] md:pt-[5.9rem] relative">
            <div className="relative">
              <div className="flex justify-end items-baseline mb-2">
                <span className="font-bold text-[3rem] md:text-[5rem]">
                  {STANDARD_PRICE.toLocaleString()}원{' '}
                </span>
                <span className="text-[1.8rem] md:text-[3rem]">/ Month</span>
              </div>
              <div className="flex justify-end absolute right-[-3px] bottom-[-10px]">
                <span className="text-[1.3rem] text-gray-500">(VAT 포함)</span>
              </div>
            </div>
          </div>

          <div className="text-left max-w-[50rem] mx-auto pt-[2.2rem] md:pt-[4rem] pb-20">
            <p className="text-[1.5rem] md:text-[1.8rem] leading-relaxed whitespace-nowrap">
              graphic design / UIUX design
              <br />
              1일 최대 1건 요청 가능
              <br />
              48시간 이내 작업물 전달
              <br />
              (작업 범위에 따라 순차적 확장 추가 작업 진행)
              <br />
              구독 취소 및 일시정지 언제든 가능
            </p>
          </div>

          <Button
            variant="green"
            className="!min-w-[29.6rem] md:min-w-[48rem] text-[1.6rem] md:text-[3rem] md:h-[8.5rem]"
            onClick={() => router.push('/pricing/subscribe')}
          >
            {buttonText}
          </Button>
          <Link href="/book" className="md:flex justify-center hidden">
            <span className="pt-[4.3rem] font-bold text-[1.5rem]">Book a call</span>
          </Link>
          <Link
            href="/book"
            className="flex pt-[5rem] items-center justify-end font-semibold text-[1.8rem] md:text-[2.5rem] md:hidden"
          >
            상담 예약하기
            <Image
              src="/icons/arrow.svg"
              alt="arrow_right"
              width={88}
              height={0}
              className="ml-[2rem] rotate-180"
            />
          </Link>
        </div>

        <div className="flex flex-col pt-[5rem]">
          <Link href="/pricing" className="flex flex-col items-end">
            <p className="font-bold text-[2rem] md:text-[5rem] leading-[4.5rem] md:leading-[7.5rem]">
              자세히 보기
            </p>
            <Image
              width={200}
              height={56}
              alt="detail_arrow"
              src="/icons/Arrow_right.svg"
              className="w-[56px] md:w-[200px] h-auto"
              sizes="(min-width: 768px) 200px, 56px"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Membership;
