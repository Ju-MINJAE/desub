import { useState } from 'react';
import { USERNAME_FIELDS, PASSWORD_FIELDS } from '@/constants/profiles';
import Image from 'next/image';
import { Button } from '../ui/Button';

const Profiles = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

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
    <div className="w-full flex flex-col gap-[9.5rem] items-center">
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
      <div className="w-[35%] flex flex-col justify-between gap-[7rem]">
        <p className="text-[2rem] font-extrabold">내 정보</p>
        <div className="w-full flex flex-col gap-[2.6rem]">
          {USERNAME_FIELDS.map(field => (
            <div key={field.id as string} className="flex justify-between items-center">
              <p className="text-[1.6rem]">{field.label}</p>
              <input
                className="w-[43.5rem] h-[4.7rem] p-[1rem] border-b"
                type={field.type}
                value={field.value}
                disabled={field.disable}
              />
            </div>
          ))}
        </div>
        {showPasswordInput ? (
          <div className="w-full flex justify-between">
            <p className="text-[1.6rem]">비밀번호 변경</p>
            <div className="flex flex-col gap-[2.6rem]">
              {PASSWORD_FIELDS.map(field => (
                <input
                  className="w-[43.5rem] h-[4.7rem] p-[1rem] border-b"
                  type={field.type}
                  placeholder={field.placeholder}
                />
              ))}
            </div>
          </div>
        ) : (
          <Button
            size="small"
            type="button"
            variant="outline"
            className="w-[16.2rem] h-[5.5rem] bg-white text-[1.6rem]"
            onClick={() => setShowPasswordInput(true)}
          >
            Button
          </Button>
        )}
      </div>
    </div>
  );
};

export default Profiles;
