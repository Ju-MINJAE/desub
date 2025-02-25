'use client';

import { useState } from 'react';
import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import { useAppSelector } from '@/hooks/redux/hooks';
import { saveBillingKey, searchPlanId, subscribe } from '@/api/payment';
import { getUserSession } from '@/app/actions/serverAction';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID!;
const CHANNEL_KEY = process.env.NEXT_PUBLIC_CHANNEL_KEY!;
import { Alert } from '@/app/components/ui/Alert';

import * as PortOne from '@portone/browser-sdk/v2';

const Subscribe = () => {
  const userData = useAppSelector(state => state.userData);
  const planData = useAppSelector(state => state.plan);
  const router = useRouter();
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  const [mobileAlert, setMobileAlert] = useState(false);

  const handlePayment = async () => {
    try {
      // 모바일 환경
      if (isMobile) {
        setMobileAlert(true);
      }

      // pc 환경
      if (!isMobile) {
        if (!userData) {
          console.log('로그인 후 진행해주세요.');
          return;
        }
        console.log(userData);
        // 빌링키 발급
        const issueResponse = await PortOne.requestIssueBillingKey({
          storeId: STORE_ID,
          channelKey: CHANNEL_KEY,
          billingKeyMethod: 'CARD',
          issueId: `ISSUE${Date.now()}`,
          customer: {
            fullName: userData?.name,
          },
        });

        if (!issueResponse?.billingKey) {
          console.log('로그인 후 진행해주세요.');
          return;
        }

        const { accessToken } = await getUserSession();
        if (!accessToken) return;

        // // 빌링키 저장
        await saveBillingKey(issueResponse?.billingKey as string, accessToken);
        // // 상품 아이디 조회
        const planData = await searchPlanId();
        const planId = planData.id;

        if (typeof planId !== 'number') {
          console.log('구독 결제할 수 있는 상품이 없습니다.');
          return;
        }
        // // 구독 결제 요청
        const subscribeResponse = await subscribe(planId, accessToken);
        console.log('?', subscribeResponse);
        router.push(
          `/pricing/paymentCompleteRedirect?data=${encodeURIComponent(
            JSON.stringify(subscribeResponse),
          )}`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePopup = () => {
    setMobileAlert(prev => !prev);
  };

  return (
    <div className="h-full">
      {mobileAlert && (
        <Alert
          buttonText="결제하기"
          size="full"
          title="결제는 pc에서 진행해주시기 바랍니다."
          variant="green"
          onClose={() => handleClosePopup()}
          onSubmit={() => handleClosePopup()}
        />
      )}
      <div className="pt-[4.7rem] pl-[4.7rem]">
        <button
          onClick={() => router.push('/pricing')}
          className="flex flex-col items-start p-1 focus:outline-none"
        >
          <Image src="/icons/arrow.svg" alt="BackButton" width={81} height={0} />
          <span className="font-bold mt-6">Subscribe</span>
        </button>
      </div>

      <div className="flex flex-col justify-center items-center mt-[6rem] md:mt-[10rem]">
        <div className="w-[35.5rem] md:w-[54rem] p-[3rem] border">
          <Heading tag="h1" className="!text-[4rem] md:!text-[5rem] leading-normal">
            {planData.plan_name}
          </Heading>
          <ul className="mt-[5rem]">
            <li className="flex justify-between">
              <span className="text-[1.6rem]">매달 결제</span>
              <span className="text-right font-medium">
                {planData.price.toLocaleString()}/월
                <br />
                (VAT 포함)
              </span>
            </li>
          </ul>
        </div>

        <div className="w-[31.1rem] md:w-[50.5rem] mt-[5rem]">
          <p className="mb-[0.7rem] text-right">
            {Math.ceil(planData.price / 1.1).toLocaleString()}원/월
          </p>
          <p className="flex justify-between font-medium text-[1.5rem] pb-[2.2rem] border-b">
            <span className="font-normal">VAT 10%</span>
            <span>{Math.ceil(planData.price - planData.price / 1.1).toLocaleString()}원/월</span>
          </p>
          <p className="flex justify-between mt-[2.2rem]">
            <span className="font-bold">결제</span>
            <span className="text-[2.5rem] md:text-[3rem] text-right">
              <span className="font-bold">{planData.price.toLocaleString()}원</span>
              /월
              <br />
              <span className="font-normal text-[1.6rem]">(VAT 포함)</span>
            </span>
          </p>
        </div>

        <Button
          variant="green"
          size="default"
          type="button"
          className="text-[1.6rem] mt-[6rem] md:mt-[9rem]"
          onClick={handlePayment}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default Subscribe;
