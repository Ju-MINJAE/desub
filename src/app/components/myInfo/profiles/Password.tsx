import { useState } from 'react';
import { PASSWORD_FIELDS } from '@/constants/PasswordInput';
import { Button } from '../../ui/Button';
import Image from 'next/image';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProfilesFormData } from '@/app/profiles/schemas/ProfilesSchema';
import { Input } from '@/app/components/ui/Input';

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
        <div className="flex w-[57.4rem]">
          <p className="text-[1.6rem] min-w-[13.9rem]">비밀번호 변경</p>
          <div className="flex flex-col gap-[1rem] w-full">
            {PASSWORD_FIELDS.map(field => (
              <div key={field.id} className="flex flex-col flex-1 relative">
                <Input
                  {...register(field.id)}
                  className="md:h-[4.7rem] !text-[1.6rem]"
                  type={inputTypes[field.id]}
                  placeholder={field.placeholder}
                  status={errors[field.id] ? 'error' : 'default'}
                  helperText={errors[field.id]?.message || undefined}
                />
                <Image
                  src={visibilityIcon[field.id]}
                  alt="비밀번호 보기"
                  width={18}
                  height={12}
                  className="absolute right-[1rem] top-[1.7rem] cursor-pointer"
                  onClick={() => handleChangeType(field.id)}
                />
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
