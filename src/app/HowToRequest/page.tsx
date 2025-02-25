'use client';

import React from 'react';
import { BackButton } from '@/app/components/ui/BackButton';
import Heading from '../components/ui/Heading';

const HowToRequest = () => {
  return (
    <div className="h-full">
      <BackButton className="pt-[4.7rem] px-[4.7rem]" text="How to request" />
      <div className="flex flex-col justify-center items-center pt-[9.2rem]">
        <Heading tag="h1">how to request</Heading>
        <div>작업 요청 방법 안내입니다.</div>
      </div>
    </div>
  );
};

export default HowToRequest;
