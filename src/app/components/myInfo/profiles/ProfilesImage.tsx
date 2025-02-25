import { useState } from 'react';
import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import { UserProfileUpdateValue } from '@/app/profiles/schemas/UserProfileUpdateSchema';
import { useAppSelector } from '@/hooks/redux/hooks';
import { getProfileImage } from '@/utils/Profile';

interface ProfilesImageProps {
  register: UseFormRegister<UserProfileUpdateValue>;
  setValue: (name: keyof UserProfileUpdateValue, value: any) => void;
}

const ProfilesImage: React.FC<ProfilesImageProps> = ({ register, setValue }) => {
  const [localPreview, setLocalPreview] = useState<string | undefined>(undefined);
  const userData = useAppSelector(state => state.userData);
  const serverImage = userData?.img_url || '';

  // 파일 미리보기 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const displayedImage = localPreview || getProfileImage(serverImage);

  return (
    <label className="w-[19.8rem] h-[19.8rem] cursor-pointer">
      <div className="relative w-full h-full">
        <Image
          src={displayedImage}
          alt="프로필이미지"
          className="w-full h-full object-cover rounded-full"
          width={198}
          height={198}
          priority 
        />
      </div>
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
