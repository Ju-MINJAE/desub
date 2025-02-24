'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UserProfileUpdateValue,
  UserProfileUpdateSchema,
} from '@/app/profiles/schemas/UserProfileUpdateSchema';
import { BackButton } from '@/app/components/ui/BackButton';
import Password from '../components/myInfo/profiles/Password';
import PaymentInfo from '../components/myInfo/PaymentInfo';
import ProfileDetails from '../components/myInfo/profiles/ProfileDetails';
import { Button } from '../components/ui/Button';

const MyInfo = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfileUpdateValue>({
    resolver: zodResolver(UserProfileUpdateSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: object) => {
    console.log('폼 데이터:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <BackButton className="pt-[4.7rem] px-[4.7rem]" text="my info" />
      <div className="w-full flex flex-col gap-[9.5rem] items-center">
        <ProfileDetails register={register} errors={errors} setValue={setValue} />
        <div className="flex w-full md:w-[57.4rem] md:justify-start justify-center">
          <Password />
        </div>
        <div className="flex flex-col gap-[5rem]">
          <PaymentInfo />
        </div>
        <Button type="submit" variant="black">
          변경사항 저장
        </Button>
      </div>
    </form>
  );
};

export default MyInfo;
