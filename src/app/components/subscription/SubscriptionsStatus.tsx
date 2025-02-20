'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { getUserSession } from '@/app/actions/serverAction';
import { useEffect, useState } from 'react';
import { statusSubscriptions, SubscriptionStatus } from '@/api/subscription';

const SubscriptionsStatus = () => {
  const router = useRouter();
  const [status, setStatus] = useState<SubscriptionStatus>('loading');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { accessToken } = await getUserSession();
        if (!accessToken) return;

        const response = await statusSubscriptions(accessToken);

        if (Array.isArray(response) && response.length > 0) {
          setStatus(response[0].sub_status);
        } else if ('error' in response) {
          setStatus('error');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    };

    fetchStatus();
  }, []);

  const statusText = {
    loading: '로딩 중...',
    active: '구독중',
    unsubscribed: '미구독',
    cancelled: '미구독',
    paused: '일시정지',
    error: '오류 발생',
  }[status];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[40.1rem] flex justify-between">
        <p className="text-[5rem] font-bold">{statusText}</p>
      </div>
      {status === 'unsubscribed' ||
        (status === 'cancelled' && (
          <Button
            className="w-[20.9rem] h-[6rem] border border-black font-bold text-[1.8rem] mt-[6.7rem]"
            size="small"
            variant="green"
            onClick={() => router.push('/pricing')}
          >
            구독하기
          </Button>
        ))}
    </div>
  );
};

export default SubscriptionsStatus;
