'use client';

import Heading from '@/app/components/ui/Heading';
import { BackButton } from '@/app/components/ui/BackButton';
import { Button } from '@/app/components/ui/Button';
import * as PortOne from '@portone/browser-sdk/v2';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Subscribe = () => {
  const handlePayment = async () => {
    const response = await fetch(`${API_BASE_URL}/api/plans/`);
    const { paymentData } = await response.json();
    const portone = new PortOne(paymentData);
    portone.open();
  };

  return (
    <div className="h-full">
      <div className="pt-[4.7rem] pl-[4.7rem]">
        <BackButton text="Subscribe" />
      </div>
      <div className="flex flex-col justify-center items-center mt-[12.5rem]">
        <div className="border p-[3rem] w-[54rem]">
          <Heading tag="h1" className="!text-[5rem] leading-normal">
            Standard
          </Heading>
          <ul className="mt-[5rem]">
            <li className="flex justify-between">
              <span>매달 결제</span>
              <span className="text-right font-medium">
                1,750,000원/월
                <br />
                (VAT 포함)
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-[5rem] w-[50.5rem]">
          <p className="text-right mb-[0.7rem]">1,575,000원/월</p>
          <p className="flex justify-between font-medium text-[1.5rem] pb-[2.2rem] border-b">
            <span>VAT 10%</span>
            <span>157,500원/월</span>
          </p>
          <p className="flex justify-between mt-[2.2rem]">
            <span className="font-bold">결제</span>
            <span className="text-[3rem] text-right">
              <span className="font-bold">1,750,000원</span>/월
              <br />
              <span className="font-normal">(VAT 포함)</span>
            </span>
          </p>
        </div>

        <Button
          variant="green"
          type="button"
          className="w-[40rem] h-[5.5rem] text-[1.6rem] mt-[9rem]"
          onClick={handlePayment}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default Subscribe;
