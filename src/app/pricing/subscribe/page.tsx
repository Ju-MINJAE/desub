'use client';

import Heading from '@/app/components/ui/Heading';
import { BackButton } from '@/app/components/ui/BackButton';
import { Button } from '@/app/components/ui/Button';
import { EXCEPT_VAT_PRICE, STANDARD_PRICE, VAT_PRICE } from '@/constants/price';
import { useAppSelector } from '@/hooks/redux/hooks';
import { saveBillingKey, searchPlanId, subscribe } from '@/api/payment';
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID!;
const CHANNEL_KEY = process.env.NEXT_PUBLIC_CHANNEL_KEY!;
import { getUserSession } from '@/app/actions/serverAction';

import * as PortOne from '@portone/browser-sdk/v2';

const Subscribe = () => {
  const userData = useAppSelector(state => state.userData);
  const planData = useAppSelector(state => state.plan);

  // 여기서는 그냥 플랜 아이디만 필요
  console.log(planData);
  const handlePayment = async () => {
    try {
      if (!userData) {
        console.log('로그인 후 진행해주세요.');
        return;
      }
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

      // 빌링키 발급
      await saveBillingKey(issueResponse?.billingKey as string, accessToken);
      // 상품 아이디 조회
      const planData = await searchPlanId();
      const planId = planData.id;
      console.log(planData);
      if (typeof planId !== 'number') {
        console.log('구독 결제할 수 있는 상품이 없습니다.');
        return;
      }
      // 구독 결제 요청
      const subscribeResponse = await subscribe(planId, accessToken);
      console.log(subscribeResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full">
      <div className="pt-[4.7rem] pl-[4.7rem]">
        <BackButton text="Subscribe" />
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
