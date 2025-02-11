'use client';

import React from 'react';
import { BackButton } from '@/app/components/ui/BackButton';
import ProfilesForm from '../components/myInfo/ProfilesForm';

const MyInfo = () => {
  return (
    <div className="h-full">
      <BackButton className="pt-[4.7rem] px-[4.7rem]" text="my info" />
      <ProfilesForm />
    </div>
  );
};

export default MyInfo;
