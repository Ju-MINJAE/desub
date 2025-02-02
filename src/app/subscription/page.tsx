'use client';

import { BackButton } from '@/app/components/ui/BackButton';
import { Button } from '../components/ui/Button';
import TextButton from '../components/ui/TextButton';
import { useState } from 'react';
import SubscriptionInactive from '../components/subscription/SubscriptionInactive';
import SubscriptionActive from '../components/subscription/SubscriptionActive';
import SubscriptionPaused from '../components/subscription/SubscriptionPaused';
import { Alert } from '../components/ui/Alert';

const Subscription = () => {
  const [subscriptionBtnStatus, setSubscriptionBtnStatus] = useState('unsubscribed');
  const [subscriptionDetails, setSubscriptionDetails] = useState(false);

  const handleStatus = () => {
    switch (subscriptionBtnStatus) {
      case 'unsubscribed':
        return <SubscriptionInactive />;
      case 'subscribed':
        return <SubscriptionActive />;
      case 'paused':
        return <SubscriptionPaused />;
      default:
        return <SubscriptionInactive />;
    }
  };

  return (
    <div className="h-full">
      {subscriptionDetails && (
        <Alert
          buttonText="Click Me"
          childrenBottom="This is a green alert message."
          childrenTop="Green Alert Top"
          size="full"
          variant="green"
        />
      )}
      <div className="pt-[4.7rem] px-[4.7rem] flex justify-between">
        <BackButton text="my subscription" />
        <Button className="w-[11.9rem] h-[3.3rem] text-[1.5rem]" size="small" variant="outline">
          리뷰 작성하기
        </Button>
      </div>

      <div className="grid grid-cols-2 h-[71.2rem] mt-[2.9rem] px-[5.8rem]">
        {/* 프로필 */}
        <div className="flex flex-col gap-[9.9rem] border-r">
          <div className="mt-[5.5rem] flex flex-col items-center">
            <div className="w-[19.8rem] h-[19.8rem] bg-gray rounded-[100rem]"></div>
            <div className="mt-[2rem]">
              <p className="text-[5rem] font-extrabold italic">wassup</p>
              <div>
                <p className="text-[5rem] font-bold hover:underline hover:decoration-2">홍길동님</p>
              </div>
            </div>

            <div className="flex gap-[2.7rem] mt-[5rem]">
              <Button
                className="w-[20.9rem] h-[6rem] border border-black font-bold text-[1.8rem]"
                size="small"
                variant="green"
              >
                작업 요청하기
              </Button>

              <Button
                className="w-[20.9rem] h-[6rem] border border-black font-bold text-[1.8rem]"
                size="small"
                variant="outline"
              >
                Workspace
              </Button>
            </div>

            <TextButton href="주소값" className="mt-[3.3rem] text-[1.5rem]">
              how to request
            </TextButton>
          </div>

          <button className="font-extrabold text-[1.5rem] self-start text-neutral-500">
            logout
          </button>
        </div>

        {/* 구독현황 */}
        <div className="flex flex-col pl-[5.9rem] justify-center">
          <div className="flex justify-between mt-[0.9rem]">
            <p>Status</p>
            <button onClick={() => setSubscriptionDetails(true)}>구독현황 변경 및 결제이력</button>
          </div>
          {handleStatus()}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
