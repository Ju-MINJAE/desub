'use client';

import Image from 'next/image';
import { priceText } from '@/constants/price';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Membership = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center text-center pt-[12rem] md:pt-[20rem] pb-16 md:pb-[13.3rem]">
      <h2 className="ml-[4rem] md:ml-[13.5rem] mb-10 md:mb-20 font-normal text-[1.8rem] md:text-[4rem] self-start text-left">
        Pricing
      </h2>

      <div className="w-[90%] md:w-[70%] max-w-[91.5rem] flex flex-col items-end">
        <div className="w-full pt-[8.6rem] px-4 md:px-8 pb-12 md:pb-16 rounded-[4rem] border mb-8">
          <div className="w-[10rem] h-[10rem] md:w-[17.2rem] md:h-[17.2rem] mx-auto mb-[1.4rem] md:mb-[5rem]">
            <Image
              width={172}
              height={172}
              objectFit="contain"
              alt="desub_membership"
              src="/images/desub_membership.png"
            />
          </div>
          <h3 className="font-bold text-[3rem] md:text-[5rem] mb-0 md:mb-4 leading-[7.5rem]">
            membership
          </h3>
          <p className="font-medium text-[1.5rem] md:text-[1.8rem] mb-6">Monthly</p>

          <div className="flex flex-col items-center pt-[1.4rem] md:pt-[5.9rem]">
            <div className="inline-block">
              <div className="flex justify-end items-baseline mb-2">
                <span className="font-bold text-[3rem] md:text-[5rem]">
                  {priceText.toLocaleString()}원{' '}
                </span>
                <span className="text-[1.5rem] md:text-[3rem]">/ Month</span>
              </div>
              <div className="flex justify-end">
                <span className="text-[1.6rem] text-gray-500">(VAT 포함)</span>
              </div>
            </div>
          </div>

          <div className="text-left max-w-[50rem] mx-auto pt-[1.2rem] md:pt-[4rem] px-24 pb-20">
            <p className="text-[1.5rem] md:text-[1.8rem] leading-relaxed">
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
            className="max-w-[29rem] md:max-w-[40rem] text-[1.6rem] md:text-[2.5rem]"
            onClick={() => router.push('/pricing/subscribe')}
          >
            check design option
          </Button>
          <Link href="/book">
            <p className="pt-[4.3rem] font-bold text-[1.5rem]">Book a call</p>
          </Link>
        </div>

        <div className="flex flex-col items-end pt-[5rem]">
          <Link href="/pricing">
            <p className="font-bold text-[2rem] md:text-[5rem] leading-[7.5rem]">자세히 보기</p>
            <Image
              width={200}
              height={0}
              alt="detail_arrow"
              src="/icons/Arrow_right.svg"
              className="w-[56px] md:w-[200px] h-auto"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Membership;
