import { Button } from '../ui/Button';
import Link from 'next/link';
// import { useDispatch } from 'react-redux';
import { useAppDispatch } from '@/libs/redux/hooks';
import { setSubscriptionStatus } from '../../../store/subscriptionStatusSlice';

const Unsubscribed = () => {
  const dispatch = useAppDispatch();

  const handleSubscriptionStatus = () => {
    dispatch(setSubscriptionStatus('paused'));
  };

  return (
    <div>
      <div className="flex w-[40.1rem] justify-between">
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
        <Link href="/" className="text-[1.8rem] underline">
          구독취소
        </Link>
      </div>
    </div>
  );
};

export default Unsubscribed;
