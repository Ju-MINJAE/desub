'use client';

import { useEffect, useState } from 'react';
import { calculateRemainingDays, formatDate, formatDateShort } from '@/utils/dateUtils';
import { handleCancelSubscription } from '@/utils/subscribe/handleCancelSubscription';
import { SubscriptionCancelReason } from '@/types/profiles';
import { handlePauseSubscription } from '@/utils/subscribe/handlePauseSubscription';
import useSubStatus from '@/hooks/useSubStatus';
import { Button } from '../ui/Button';
import Image from 'next/image';
import Unsubscription from './Unsubscription';
import { useAppDispatch } from '@/hooks/redux/hooks';
import { clearUserData, setUserData } from '@/store/userDataSlice';
import { fetchUserData } from '@/api/userData';

const SubscriptionActive = () => {
  const subscriptionData = useSubStatus();
  const plan = subscriptionData.status.plan;
  const [subscriptionInfo, setSubscriptionInfo] = useState<string>('');
  const [nextBillDate, setNextBillDate] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (subscriptionData.status.sub_status === 'active') {
          const formattedEndDate = formatDateShort(subscriptionData.status.end_date);
          // const daysRemaining = calculateRemainingDays(subscriptionData.status.end_date);
          // setSubscriptionInfo(`~${formattedEndDate} / D-${daysRemaining}일 남음`);
          setSubscriptionInfo(`~${formattedEndDate}`);

          if (subscriptionData.status.next_bill_date) {
            setNextBillDate(formatDate(subscriptionData.status.next_bill_date));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatus();
  }, [subscriptionData]);

  const handleSubscriptionStatus = async (plan: number) => {
    await handlePauseSubscription(plan);
    window.location.reload();
  };

  const handleUnsubscribe = async (selectedReason: SubscriptionCancelReason) => {
    const unsubscribeResponse = await handleCancelSubscription(plan, selectedReason);

    if (unsubscribeResponse.message === '구독 취소 완료, 환불 대기 상태로 변경됨') {
      dispatch(clearUserData());
      // 구취하면 로컬의 유저정보(구독현황) 변경
      const newUserData = await fetchUserData();
      dispatch(setUserData(newUserData));
    }
    window.location.reload();
  };

  return (
    <div>
      <div className="flex w-[40.1rem] md:justify-between flex-col md:flex-row gap-[5px] md:gap-0">
        <p className="text-[2.5rem] md:text-[5rem] font-bold">구독중</p>
        <Button
          className="!w-[12rem] md:!w-[14.7rem] h-[4rem] md:h-[6rem] font-bold text-[1.6rem] md:text-[1.8rem] flex justify-center items-center gap-[0.6rem]"
          size="small"
          variant="outline"
          onClick={() => plan !== null && handleSubscriptionStatus(plan)}
        >
          <Image src="/icons/pause-circle.svg" alt="subscription_pause" width={24} height={24} />
          일시정지
        </Button>
      </div>
      <p className="text-[1.8rem] font-bold mt-[1.8rem]">{subscriptionInfo}</p>
      <div className="mt-[9.3rem]">
        <Unsubscription onUnsubscribe={handleUnsubscribe} nextBillDate={nextBillDate} />
      </div>
    </div>
  );
};

export default SubscriptionActive;
