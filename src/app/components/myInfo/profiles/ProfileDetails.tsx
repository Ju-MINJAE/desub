'use client';

import React from 'react';
import ProfilesImage from './ProfilesImage';
import UserInfo from './UserInfo';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { UserProfileUpdateValue } from '@/app/profiles/schemas/UserProfileUpdateSchema';

interface ProfileDetailsProps {
  register: UseFormRegister<UserProfileUpdateValue>;
  errors: FieldErrors<UserProfileUpdateValue>;
  setValue: (name: keyof UserProfileUpdateValue, value: any) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ register, errors, setValue }) => {
  return (
    <div className="flex flex-col items-center gap-[5rem]">
      <ProfilesImage register={register} setValue={setValue} />
      <p className="text-[2rem] font-extrabold">내 정보</p>
      <UserInfo register={register} errors={errors} />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
    </div>
  );
};

export default ProfileDetails;
