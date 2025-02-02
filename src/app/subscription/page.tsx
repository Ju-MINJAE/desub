'use client';

import { BackButton } from '@/app/components/ui/BackButton';
import { Button } from '../components/ui/Button';
import TextButton from '../components/ui/TextButton';
import Link from 'next/link';

const Subscription = () => {
  return (
    <div className="h-full">
      <div className="pt-[4.7rem] px-[4.7rem] flex justify-between">
        <BackButton text="my subscription" />
        <Button className="w-[11.9rem] h-[3.3rem] text-[1.5rem]" size="small" variant="outline">
          리뷰 작성하기
        </Button>
      </div>

      <div className="grid grid-cols-2 h-[71.2rem] mt-[2.9rem] px-[5.8rem]">
        <div className="flex flex-col gap-[9.9rem] justify-center border-r">
          <div className="mt-[5.5rem] flex flex-col items-center">
            <div className="w-[19.8rem] h-[19.8rem] bg-gray rounded-[100rem]"></div>
            <div className="mt-[2rem]">
              <p className="text-[5rem] font-extrabold italic">wassup</p>
              <div>
                <p className="text-[5rem] font-bold hover:underline hover:decoration-2">홍길동님</p>
              </div>
            </div>

            <div className="flex gap-[2.7rem] mt-[5rem]">
              <Button
                className="w-[20.9rem] h-[6rem] border border-black font-bold text-2xl"
                size="small"
                variant="green"
              >
                작업 요청하기
              </Button>

              <Button
                className="w-[20.9rem] h-[6rem] border border-black font-bold text-2xl"
                size="small"
                variant="outline"
              >
                Workspace
              </Button>
            </div>

            <TextButton href="주소값" className="mt-[3.3rem] text-[1.5rem]">
              how to request
            </TextButton>
          </div>

          <Link href="/" className="font-extrabold text-[1.5rem] text-neutral-500">
            logout
          </Link>
        </div>

        <div className="flex flex-col pl-[5.9rem] justify-center">
          <div className="flex justify-between mt-[0.9rem]">
            <p>Status</p>
            <button>구독현황 변경 및 결제이력</button>
          </div>
          <div className="flex w-[40.1rem] justify-between">
            <p className="text-[5rem] font-bold hover:underline hover:decoration-2">구독중</p>
            <Button
              className="w-[14.7rem] h-[6rem] font-bold text-2xl"
              size="small"
              variant="outline"
            >
              일시정지
            </Button>
          </div>
          <p className="text-[1.8rem] font-extrabold mt-[1.8rem]">~2025.06.12 / D-593일 남음</p>
          <Link href="/" className="text-[1.8rem] mt-[9.3rem] underline">
            구독취소
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
