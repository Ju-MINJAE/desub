'use client';

import React from 'react';
import ProfilesImage from './ProfilesImage';
import UserInfo from './UserInfo';
import { UseFormRegister, FieldErrors, UseFormTrigger } from 'react-hook-form';
import { UserProfileUpdateValue } from '@/app/profiles/schemas/UserProfileUpdateSchema';

interface ProfileDetailsProps {
  register: UseFormRegister<UserProfileUpdateValue>;
  errors: FieldErrors<UserProfileUpdateValue>;
  setValue: (name: keyof UserProfileUpdateValue, value: any) => void;
  trigger: UseFormTrigger<UserProfileUpdateValue>;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ register, errors, setValue,trigger }) => {
  return (
    <div className="flex flex-col items-center gap-[5rem]">
      <ProfilesImage register={register} setValue={setValue} />
      <p className="text-[2rem] font-extrabold">내 정보</p>
      <UserInfo register={register} errors={errors} setValue={setValue} trigger={trigger} />
    </div>
  );
};

export default ProfileDetails;
