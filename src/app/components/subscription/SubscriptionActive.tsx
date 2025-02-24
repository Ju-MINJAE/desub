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

const SubscriptionActive = () => {
  const subscriptionData = useSubStatus();
  const plan = subscriptionData.status.plan;
  const [subscriptionInfo, setSubscriptionInfo] = useState<string>('');
  const [nextBillDate, setNextBillDate] = useState<string>('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (subscriptionData.status.sub_status === 'active') {
          const formattedEndDate = formatDateShort(subscriptionData.status.end_date);
          const daysRemaining = calculateRemainingDays(subscriptionData.status.end_date);
          setSubscriptionInfo(`~${formattedEndDate} / D-${daysRemaining}일 남음`);

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

  const handleUnsubscribe = async (plan: number, selectedReason: SubscriptionCancelReason) => {
    await handleCancelSubscription(plan, selectedReason);
    window.location.reload();
  };

  return (
    <div>
      <div className="flex w-[40.1rem] justify-between">
        <p className="text-[5rem] font-bold">구독중</p>
        <Button
          className="w-[14.7rem] h-[6rem] font-bold text-[1.8rem] flex justify-center items-center gap-[0.6rem]"
          size="small"
          variant="outline"
          onClick={() => plan !== null && handleSubscriptionStatus(plan)}
        >
          <Image src="/icons/pause-circle.svg" alt="" width={24} height={24} />
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
