'use client';

import React from 'react';
import { BackButton } from '@/app/components/ui/BackButton';
import { Button } from '../components/ui/Button';
import TextButton from '../components/ui/TextButton';
import { useState } from 'react';
import SubscriptionInactive from '../components/subscription/SubscriptionInactive';
import SubscriptionActive from '../components/subscription/SubscriptionActive';
import SubscriptionPaused from '../components/subscription/SubscriptionPaused';
import { SimpleAlert } from '../components/ui/SimpleAlert';
import { useAppSelector } from '@/libs/redux/hooks';
import Image from 'next/image';
import { RootState } from '@/store/store';

const Subscription = () => {
  const subscriptionStatus = useAppSelector((state: RootState) => state.subscriptionStatus.status);
  // 구독현황 변경 및 결제이력
  const [subscriptionStatusModal, setSubscriptionStatusModal] = useState(false);
  const [requestForWork, setrequestForWork] = useState(false);

  // 더미데이터
  const example = [
    {
      logTime: '2025-01-15 15:30',
      changeLog: '재개',
    },
    {
      logTime: '2025-02-15 15:30',
      changeLog: '일시정지',
    },
    {
      logTime: '2025-03-15 15:30',
      changeLog: '결제',
    },
  ];

  const handleStatus = () => {
    switch (subscriptionStatus) {
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
      {subscriptionStatusModal && (
        <SimpleAlert
          childrenBottom={
            <div className="w-full h-full flex flex-col">
              <div className="flex py-[1.9rem] text-[2rem] font-extrabold">
                <div className="w-3/4">
                  <p>일시</p>
                </div>
                <div className="w-1/4">
                  <p>내용</p>
                </div>
              </div>
              <div className="flex flex-col gap-[1.5rem] text-[2rem]">
                {example.map((item, index) => (
                  <>
                    <div key={index} className="flex items-center">
                      <div className="w-3/4">{item.logTime}</div>
                      <div className="w-1/4">{item.changeLog}</div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          }
          childrenTop="구독현황 변경 및 결제이력"
          onClose={() => setSubscriptionStatusModal(false)}
        />
      )}
      {requestForWork && (
        <SimpleAlert
          childrenBottom=""
          childrenTop="작업 요청하기"
          onClose={() => setrequestForWork(false)}
        />
      )}
      <div className="pt-[4.7rem] px-[4.7rem] flex justify-between">
        <BackButton text="my subscription" />
        <div className="flex items-center">
          <Button className="w-[11.9rem] h-[3.3rem] text-[1.5rem]" size="small" variant="outline">
            리뷰 작성하기
          </Button>
          <Image src="/icons/review.svg" alt="" width={176.99} height={68} />
        </div>
      </div>

      <div className="grid grid-cols-2 h-[71.2rem] mt-[2.9rem] px-[5.8rem]">
        {/* 프로필 */}
        <div className="flex flex-col gap-[9.9rem] border-r">
          <div className="mt-[5.5rem] flex flex-col items-center">
            <div className="w-[19.8rem] h-[19.8rem] bg-gray rounded-[100rem]"></div>
            <div className="mt-[2rem]">
              <p className="text-[5rem] font-extrabold italic">wassup</p>
              <div className="flex gap-[1rem]">
                <p className="text-[5rem] font-bold hover:underline hover:decoration-2">홍길동님</p>
                <button>
                  <Image src="/icons/setting.svg" alt="" width={24} height={24} />
                </button>
              </div>
            </div>

            <div className="flex gap-[2.7rem] mt-[5rem]">
              <Button
                className="w-[20.9rem] h-[6rem] border border-black font-bold text-[1.8rem]"
                size="small"
                variant="green"
                onClick={() => setrequestForWork(true)}
              >
                작업 요청하기
              </Button>

              <Button
                className="w-[20.9rem] h-[6rem] border border-black font-bold text-[1.8rem] flex justify-center items-center gap-[1.7rem]"
                size="small"
                variant="outline"
              >
                Workspace
                <Image src="/icons/workSpace.svg" alt="" width={24} height={24} />
              </Button>
            </div>

            <TextButton href="/HowToRequest" className="mt-[3.3rem] text-[1.5rem]">
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
            <button
              className="font-extrabold hover:underline"
              onClick={() => setSubscriptionStatusModal(true)}
            >
              구독현황 변경 및 결제이력
            </button>
          </div>
          {handleStatus()}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
