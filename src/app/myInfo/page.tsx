'use client';

import React from 'react';
import { BackButton } from '@/app/components/ui/BackButton';
import Profile from '../components/myInfo/Profile';
import PaymentInfo from '../components/myInfo/PaymentInfo';

const MyInfo = () => {
  return (
    <div className="h-full">
      <BackButton className="pt-[4.7rem] px-[4.7rem]" text="my info" />
      <div className="flex flex-col items-center pt-[5.3rem] gap-[8rem]">
        <Profile />
        <hr className="w-[70rem] border-lightgray" />
        <PaymentInfo />
      </div>
    </div>
  );
};

export default MyInfo;
