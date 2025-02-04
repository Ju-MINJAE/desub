import { Button } from '../ui/Button';
import Link from 'next/link';
// import { useDispatch } from 'react-redux';
import { useAppDispatch } from '@/libs/redux/hooks';
import { setSubscriptionStatus } from '../../../store/subscriptionStatusSlice';
import { Alert } from '../ui/Alert';
import { useState } from 'react';

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
            buttonText="Click Me"
            childrenBottom="This is a green alert message."
            childrenTop="Green Alert Top"
            size="full"
            variant="green"
            onClose={() => setSubscriptionModal(false)}
          />
        )}
        <p className="text-[5rem] font-bold hover:underline hover:decoration-2">구독중</p>
        <Button
          className="w-[14.7rem] h-[6rem] font-bold text-2xl"
          size="small"
          variant="outline"
          onClick={handleSubscriptionStatus}
        >
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
