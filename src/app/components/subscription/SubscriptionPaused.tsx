'use client';

import { Button } from '../ui/Button';
import Image from 'next/image';
import Unsubscription from './Unsubscription';
import { useEffect, useState } from 'react';
import { formatDateShort, formatRemainingBillDate } from '@/utils/dateUtils';
import { handleCancelSubscription } from '@/utils/subscribe/handleCancelSubscription';
import { handleResumeSubscription } from '@/utils/subscribe/handleResumeSubscription';
import { SubscriptionCancelReason } from '@/types/profiles';
import useSubStatus from '@/hooks/useSubStatus';

const SubscriptionPaused = () => {
  const subscriptionData = useSubStatus();
  const plan = subscriptionData.status.plan;
  const [subscriptionInfo, setSubscriptionInfo] = useState<string>('');
  const [nextBillDate, setNextBillDate] = useState<string>('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (subscriptionData.status.sub_status === 'paused') {
          const { formattedDate, daysRemaining } = formatRemainingBillDate(
            subscriptionData.status.remaining_bill_date,
          );
          setSubscriptionInfo(`${formattedDate} / D-${daysRemaining}일 남음`);

          if (subscriptionData.status.next_bill_date) {
            setNextBillDate(formatDateShort(subscriptionData.status.next_bill_date));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (subscriptionData.status.sub_status === 'paused') {
      fetchStatus();
    }
  }, [subscriptionData]);

  const handleSubscriptionStatus = async (plan: number) => {
    if (plan !== null) {
      await handleResumeSubscription(plan);
      window.location.reload();
    }
  };

  const handleUnsubscribe = async (selectedReason: SubscriptionCancelReason) => {
    await handleCancelSubscription(plan, selectedReason);
    window.location.reload();
  };

  return (
    <div>
      <div className="flex w-[40.1rem] md:justify-between flex-col md:flex-row gap-[5px] md:gap-0">
        <p className="text-[2.5rem] md:text-[5rem] font-bold">일시정지</p>
        <Button
          className="!w-[12rem] md:w-[14.7rem] h-[4rem] md:h-[6rem] font-bold text-[1.6rem] md:text-[1.8rem] flex justify-center items-center gap-[0.6rem]"
          size="small"
          variant="outline"
          onClick={() => plan !== null && handleSubscriptionStatus(plan)}
        >
          <Image src="/icons/play-circle.svg" alt="subscription_restart" width={24} height={24} />
          구독재개
        </Button>
      </div>
      <p className="text-[1.8rem] font-bold mt-[1.8rem]">{subscriptionInfo}</p>
      <div className="mt-[9.3rem]">
        <Unsubscription onUnsubscribe={handleUnsubscribe} nextBillDate={nextBillDate} />
      </div>
    </div>
  );
};

export default SubscriptionPaused;
