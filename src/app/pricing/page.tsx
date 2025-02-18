'use client';

import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import TextButton from '@/app/components/ui/TextButton';
import { useRouter } from 'next/navigation';
import { priceText } from '@/constants/price';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const Pricing = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const router = useRouter();

  const handleTooltipToggle = () => {
    setIsTooltipOpen(prev => !prev);
  };

  const handleNavigateSubscribe = () => {
    router.push('/pricing/subscribe');
  };

  return (
    <div className="flex flex-col justify-center items-center text-center pt-[12.2rem] pb-[13.3rem]">
      <Heading tag="h1" className="mb-[1.6rem] md:mb-[9.9rem]">
        are you ready to
        <br /> join us?
      </Heading>
      <Heading tag="h2" className="mb-[4.8rem] !font-bold">
        당신이 준비할 것은 단 하나, 아이디어 입니다.
      </Heading>

      <div className="relative">
        <div className="max-w-[33rem] md:max-w-[79rem] pt-[5.8rem] md:pt-[4.1rem] px-[2rem] md:px-[10rem] pb-[3.8rem] rounded-[4rem] border">
          <p className="text-[4rem] md:text-[5rem] font-bold leading-[6rem] md:leading-[7.5rem]">
            standard
          </p>
          <p className="text-[1.8rem] font-medium mb-[1.5rem] md:mb-[7.2rem]">monthly</p>
          <div className="flex flex-col items-end mb-[2.3rem]">
            <p className="w-full">
              <strong className="text-[3rem] md:text-[5rem] font-bold">
                {priceText.toLocaleString()}원
              </strong>
              <span className="text-[1.6rem] md:text-[3rem] font-light month"> / Month</span>
            </p>
            <p className="hidden md:block text-[1.5rem] mt-1">(VAT 포함)</p>
          </div>

          <div className="text-left mb-[1.5rem]">
            <p className="text-[1.5rem] mb-[2.5rem]">Free 1 week trial</p>
            <ul className="text-[1.8rem] md:text-[2rem]">
              <li>1일 최대 1건 요청 가능</li>
              <li>48시간 이내 작업물 전달</li>
              <li>(작업 범위에 따라 순차적 확장 추가 작업 진행)</li>
              <li>수정 무제한</li>
              <li>구독 취소 및 일시정지 언제든 가능</li>
            </ul>
          </div>

          <ul className="text-left text-[1.8rem] md:text-[2.5rem] mb-[9.2rem]">
            <li className="flex items-center">
              <Image
                src="/icons/check.svg"
                alt="Check"
                width={14}
                height={9}
                className="mr-[1.5rem] md:w-[20px] md:h-[13px]"
              />
              UIUX
            </li>
            <li className="flex items-center">
              <Image
                src="/icons/check.svg"
                alt="Check"
                width={14}
                height={9}
                className="mr-[1.5rem] md:w-[20px] md:h-[13px]"
              />
              E-commerce
            </li>
            <li className="flex items-center">
              <Image
                src="/icons/check.svg"
                alt="Check"
                width={14}
                height={9}
                className="mr-[1.5rem] md:w-[20px] md:h-[13px]"
              />
              Branding
            </li>
            <li className="flex items-center">
              <Image
                src="/icons/check.svg"
                alt="Check"
                width={14}
                height={9}
                className="mr-[1.5rem] md:w-[20px] md:h-[13px]"
              />
              Printing
            </li>
            <li className="flex items-center">
              <Image
                src="/icons/check.svg"
                alt="Check"
                width={14}
                height={9}
                className="mr-[1.5rem] md:w-[20px] md:h-[13px]"
              />
              Social contents
            </li>
            <li className="flex items-center">
              <Image
                src="/icons/check.svg"
                alt="Check"
                width={14}
                height={9}
                className="mr-[1.5rem] md:w-[20px] md:h-[13px]"
              />
              Product design
            </li>
            <li className="flex items-center">
              <Image
                src="/icons/check.svg"
                alt="Check"
                width={14}
                height={9}
                className="mr-[1.5rem] md:w-[20px] md:h-[13px]"
              />
              3D contents
            </li>
            <li className="flex items-start">
              <Image
                src="/icons/check.svg"
                alt="Check"
                width={14}
                height={9}
                className="mr-[1.5rem] md:w-[20px] md:h-[13px] mt-[1rem]"
              />
              <span className="flex flex-wrap items-center">
                All design assets from
                <span className="relative inline-flex items-center ml-2">
                  <span
                    className="font-bold underline cursor-pointer"
                    onClick={handleTooltipToggle}
                  >
                    dshop
                  </span>
                  <Image
                    src="/icons/tooltip.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="absolute -top-2 -right-5"
                  />
                  {isTooltipOpen && (
                    <div className="fixed md:absolute top-1/2 left-1/2 md:-top-52 md:-left-28 transform -translate-x-1/2 -translate-y-1/2 md:translate-x-2 md:translate-y-0 bg-black rounded-[2.3rem] text-white text-[1.5rem] px-[3.6rem] py-[3rem] min-w-[37.8rem] z-40">
                      dshop은 dbre의 design asset을 구매 가능한 온라인몰입니다. <br />
                      <Link
                        href="https://www.dbre.co.kr/dshop"
                        className="underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        dshop 바로가기
                      </Link>
                    </div>
                  )}
                </span>
              </span>
            </li>
          </ul>

          <Button
            onClick={handleNavigateSubscribe}
            size="default"
            type="button"
            variant="green"
            className="text-[1.6rem]"
          >
            check-in
          </Button>
        </div>

        <div className="float-end pt-[2.6rem]">
          <TextButton href="/pricing/terms" className="text-[1.3rem]">
            일시정지/구독취소/환불 규정 확인하기
          </TextButton>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
