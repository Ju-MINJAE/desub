import { useState } from 'react';
import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import { UserProfileUpdateValue } from '@/app/profiles/schemas/UserProfileUpdateSchema';
import { useAppSelector } from '@/hooks/redux/hooks';

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

  // localPreview가 있으면 그것을, 없으면 서버 이미지를 사용
  const displayedImage = localPreview || serverImage || undefined;

  return (
    <label className="w-[19.8rem] h-[19.8rem] cursor-pointer">
      {displayedImage ? (
        <img
          src={displayedImage}
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
