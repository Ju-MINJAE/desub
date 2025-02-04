import { Button } from '../ui/Button';
import Link from 'next/link';
import { useAppDispatch } from '@/libs/redux/hooks';
import { setSubscriptionStatus } from '../../../store/subscriptionStatusSlice';
import { Alert } from '../ui/Alert';
import { useState } from 'react';
import Image from 'next/image';

const Unsubscribed = () => {
  const dispatch = useAppDispatch();
  const [subscriptionModal, setSubscriptionModal] = useState(false);

  const handleSubscriptionStatus = () => {
    dispatch(setSubscriptionStatus('paused'));
  };

  return (
    <div>
      <div className="flex w-[40.1rem] justify-between">
        {subscriptionModal && (
          <Alert
            buttonText="구독취소"
            childrenBottom="This is a green alert message."
            childrenTop="Green Alert Top"
            size="normal"
            variant="green"
            onClose={() => setSubscriptionModal(false)}
            className="w-[109.2rem] h-[98.7rem]"
          />
        )}
        <p className="text-[5rem] font-bold hover:underline hover:decoration-2">구독중</p>
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
      <p className="text-[1.8rem] font-extrabold mt-[1.8rem]">~2025.06.12 / D-593일 남음</p>
      <div className="mt-[9.3rem]">
        <button onClick={() => setSubscriptionModal(true)} className="text-[1.8rem] underline">
          구독취소
        </button>
      </div>
    </div>
  );
};

export default Unsubscribed;
