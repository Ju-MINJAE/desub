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
import { USERNAME_FIELDS } from '@/constants/profiles';

const MyInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfilesFormData>({
    resolver: zodResolver(ProfilesSchema),
    mode: 'onBlur',
    defaultValues: {
      username: USERNAME_FIELDS.find(field => field.id === 'username')?.value,
      email: USERNAME_FIELDS.find(field => field.id === 'email')?.value,
    },
  });

  const onSubmit = (data: object) => {
    console.log('폼 데이터:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <BackButton className="pt-[4.7rem] px-[4.7rem]" text="my info" />
      <div className="w-full flex flex-col gap-[9.5rem] items-center">
        <ProfilesImage />
        <div className="w-[35%] flex flex-col justify-between gap-[7rem]">
          <p className="text-[2rem] font-extrabold">내 정보</p>
          <UserInfo register={register} errors={errors} />
          <Password register={register} errors={errors} />
        </div>
        <hr className="w-[70rem] border-lightgray" />
        <PaymentInfo />
        <button type="submit" className="mt-4 p-3 bg-blue-500 text-white rounded">
          저장하기
        </button>
      </div>
    </form>
  );
};

export default MyInfo;
