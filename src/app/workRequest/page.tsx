'use client';

import React from 'react';
import { BackButton } from '@/app/components/ui/BackButton';
import { useState } from 'react';
import Image from 'next/image';
import WorkForm from '../components/workRequest/WorkForm';
import { useAppSelector } from '@/hooks/redux/hooks';
import { WORK_FORM_CONFIG, WORK_LIST } from '@/constants/workRequest';

const WorkRequest = () => {
  const [selectedForm, setSelectedForm] = useState('업무 종류를 선택하세요.');
  const [showFormList, setShowFormList] = useState(false);
  const userData = useAppSelector(state => state.userData);
  const userSubscriptionStatus = userData.sub_status;

  const handleWorkSelect = (item: string) => {
    setSelectedForm(item);
    setShowFormList(false);
  };

  const isDisabled = ['refund_pending', 'none', 'cancelled'].includes(userSubscriptionStatus);

  return (
    <div className="h-full">
      <BackButton className="pt-[4.7rem] px-[4.7rem]" text="작업 요청하기" />
      <div className="flex flex-col items-center pt-[9.2rem] gap-[6rem] px-[13.1rem]">
        <p className="text-[5rem] font-bold">작업요청하기</p>
        <div className="flex flex-col w-[43.7rem] text-[1.6rem] relative">
          <div
            className="flex w-full h-[4.7rem] justify-between px-[1.7rem] py-[1.2rem] cursor-pointer"
            onClick={() => setShowFormList(prev => !prev)}
          >
            <p>{selectedForm}</p>
            <Image
              src="/icons/caret.svg"
              className={showFormList ? '' : 'rotate-180'}
              alt="caret"
              width={24}
              height={24}
            />
          </div>
          {showFormList && !isDisabled && (
            <div className="border absolute top-full">
              {WORK_LIST.map(item => (
                <div
                  key={item}
                  className="bg-white w-[43.7rem] h-[4.7rem] px-[1.7rem] py-[1.2rem] cursor-pointer hover:bg-[#F9F9F9] active:bg-[#F9F9F9]"
                  onClick={() => handleWorkSelect(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {isDisabled && (
          <p className="font-semibold text-[1.4rem] md:text-[2rem]">
            구독이 필요한 서비스입니다. 구독을 활성화해 주세요.
          </p>
        )}

        {selectedForm === '업무 종류를 선택하세요.' ? null : (
          <div className="w-full bg-lightgray px-[6rem] py-[3rem] flex">
            <WorkForm formConfig={WORK_FORM_CONFIG[selectedForm]} formName={selectedForm} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkRequest;
