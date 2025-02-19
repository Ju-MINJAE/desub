'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { useAppDispatch } from '@/hooks/redux/hooks';
import { setSubscriptionStatus } from '../../../store/subscriptionStatusSlice';
import Image from 'next/image';
import { format, differenceInDays } from 'date-fns';
import { getUserSession } from '@/app/actions/serverAction';
import { statusSubscriptions } from '@/api/subscription';
import Unsubscription from './Unsubscription';

const SubscriptionActive = () => {
  const dispatch = useAppDispatch();
  const [subscriptionInfo, setSubscriptionInfo] = useState<string>('');
  const [nextBillDate, setNextBillDate] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubscriptionStatus = () => {
    dispatch(setSubscriptionStatus('paused'));
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { accessToken } = await getUserSession();
        if (!accessToken) return;
        const response = await statusSubscriptions(accessToken);

        if (response.status === 'subscribed' && response.data && response.data.length > 0) {
          const subscription = response.data[0];
          const endDate = new Date(subscription.end_date);
          const now = new Date();
          const daysRemaining = differenceInDays(endDate, now);

          const formattedEndDate = format(endDate, 'yyyy.MM.dd');
          setSubscriptionInfo(`~${formattedEndDate} / D-${daysRemaining}일 남음`);

          if (subscription.next_bill_date) {
            const nextBillDate = new Date(subscription.next_bill_date);
            setNextBillDate(format(nextBillDate, 'yyyy년 MM월 dd일'));
          }
        }
      } catch (err) {
        console.error(err);
        setError('구독 상태를 가져오는 데 실패했습니다.');
      }
    };

    fetchStatus();
  }, []);

  const handleUnsubscribe = () => {
    // 구독 취소 로직
    console.log('구독 취소 로직');
  };

  return (
    <div>
      <div className="flex w-[40.1rem] justify-between">
        <p className="text-[5rem] font-bold">구독중</p>
        <Button
          className="w-[14.7rem] h-[6rem] font-bold text-[1.8rem] flex justify-center items-center gap-[0.6rem]"
          size="small"
          variant="outline"
          onClick={handleSubscriptionStatus}
        >
          <Image src="/icons/pause-circle.svg" alt="" width={24} height={24} />
          일시정지
        </Button>
      </div>
      <p className="text-[1.8rem] font-bold mt-[1.8rem]">{subscriptionInfo}</p>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-[9.3rem]">
        <Unsubscription onUnsubscribe={handleUnsubscribe} nextBillDate={nextBillDate} />
      </div>
    </div>
  );
};

export default SubscriptionActive;
