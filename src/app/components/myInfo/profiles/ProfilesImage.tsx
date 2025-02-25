import { useEffect, useState } from 'react';
import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import { UserProfileUpdateValue } from '@/app/profiles/schemas/UserProfileUpdateSchema';
import { useAppSelector } from '@/hooks/redux/hooks';

interface ProfilesImageProps {
  register: UseFormRegister<UserProfileUpdateValue>;
  setValue: (name: keyof UserProfileUpdateValue, value: any) => void;
}

const ProfilesImage: React.FC<ProfilesImageProps> = ({ register, setValue }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const userData = useAppSelector(state => state.userData);
  const profileUrl = userData?.img_url || '';

  // 파일 미리보기
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (profileUrl) {
      setProfileImage(profileUrl);
    }
  }, [profileUrl]);

  return (
    <label className="w-[19.8rem] h-[19.8rem] cursor-pointer">
      {profileImage ? (
        <img
          src={profileUrl}
          alt="프로필이미지"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <div className="w-full h-full bg-gray flex justify-center items-center rounded-full">
          <Image src="/icons/profile.svg" alt="desub_myInfo_Profile" width={198} height={198} />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        {...register('image')}
        onChange={handleImageChange}
        className="hidden rounded-full"
      />
    </label>
  );
};

export default ProfilesImage;
