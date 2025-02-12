import { useState } from 'react';
import { PASSWORD_FIELDS } from '@/constants/profiles';
import { Button } from '../../ui/Button';
import Image from 'next/image';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProfilesFormData } from '@/app/profiles/schemas/ProfilesSchema';

interface Props {
  register: UseFormRegister<ProfilesFormData>;
  errors: FieldErrors<ProfilesFormData>;
}

const Password = ({ register, errors }: Props) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [inputTypes, setInputTypes] = useState(
    PASSWORD_FIELDS.reduce<Record<string, string>>((acc, field) => {
      acc[field.id] = 'password';
      return acc;
    }, {}),
  );
  const [visibilityIcon, setVisibilityIcon] = useState(
    PASSWORD_FIELDS.reduce<Record<string, string>>((acc, field) => {
      acc[field.id] = '/icons/visibility.svg';
      return acc;
    }, {}),
  );

  const handleChangeType = (id: string) => {
    setInputTypes(prevState => ({
      ...prevState,
      [id]: prevState[id] === 'password' ? 'text' : 'password',
    }));
    setVisibilityIcon(prevState => ({
      ...prevState,
      [id]:
        prevState[id] === '/icons/visibility.svg'
          ? '/icons/invisibility.svg'
          : '/icons/visibility.svg',
    }));
  };

  return (
    <>
      {showPasswordInput ? (
        <div className="w-full flex justify-between ml-[2rem]">
          <p className="text-[1.6rem]">비밀번호 변경</p>
          <div className="flex flex-col gap-[2.8rem]">
            {PASSWORD_FIELDS.map(field => (
              <div
                key={field.id}
                className="flex flex-col w-[43.5rem] h-[4.7rem] gap-[1rem] relative"
              >
                <input
                  {...register(field.id)}
                  className="w-full p-[1rem] pr-[4rem] border-b"
                  type={inputTypes[field.id]}
                  placeholder={field.placeholder}
                />
                <Image
                  src={visibilityIcon[field.id]} //히얼
                  alt="비밀번호 보기"
                  width={18}
                  height={12}
                  className="absolute right-[1rem] top-[1.7rem] cursor-pointer"
                  onClick={() => handleChangeType(field.id)}
                />
                {errors[field.id] && (
                  <div className="w-full">
                    <p className="text-red text-[1.6rem]">{errors[field.id]?.message}</p>
                  </div>
                )}
              </div>
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
          비밀번호 변경
        </Button>
      )}
    </>
  );
};

export default Password;
