'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfilesFormData, ProfilesSchema } from '../profiles/schemas/ProfilesSchema';
import { BackButton } from '@/app/components/ui/BackButton';
import ProfilesImage from '../components/myInfo/profiles/ProfilesImage';
import UserInfo from '../components/myInfo/profiles/UserInfo';
import Password from '../components/myInfo/profiles/Password';
import PaymentInfo from '../components/myInfo/PaymentInfo';
import { Button } from '../components/ui/Button';

const MyInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfilesFormData>({
    resolver: zodResolver(ProfilesSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: object) => {
    console.log('폼 데이터:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <BackButton className="pt-[4.7rem] px-[4.7rem]" text="my info" />
      <div className="w-full flex flex-col gap-[9.5rem] items-center">
        <ProfilesImage />
        <div className="flex flex-col justify-between gap-[7rem]">
          <p className="text-[2rem] font-extrabold">내 정보</p>
          <UserInfo register={register} errors={errors} />
          <Password />
        </div>
        <hr className="w-[70rem] border-lightgray" />
        <div className="flex flex-col gap-[5rem]">
          <p className="text-[2rem] font-extrabold">결제정보</p>
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
