import { useState } from 'react';
import Image from 'next/image';

const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      console.log(reader);
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-[9.5rem]">
      <label className="w-[19.8rem] h-[19.8rem] cursor-pointer">
        {profileImage ? (
          <img
            src={profileImage}
            alt="프로필이미지"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full bg-gray flex justify-center items-center rounded-full">
            <Image src="/icons/add.svg" alt="" width={40} height={40} />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden rounded-full"
        />
      </label>
      <p>내 정보</p>
    </div>
  );
};

export default Profile;
