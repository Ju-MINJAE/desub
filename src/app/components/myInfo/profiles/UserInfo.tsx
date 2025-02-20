import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProfilesFormData } from '@/app/profiles/schemas/ProfilesSchema';
import { ProfilesField } from '@/types/profiles';
import { useAppSelector } from '@/hooks/redux/hooks';
import { Input } from '@/app/components/ui/Input';

interface Props {
  register: UseFormRegister<ProfilesFormData>;
  errors: FieldErrors<ProfilesFormData>;
}

const UserInfo = ({ register, errors }: Props) => {
  const userData = useAppSelector(state => state.userData);

  const USERNAME_FIELDS: ProfilesField[] = [
    {
      id: 'email',
      label: '이메일',
      type: 'email',
      value: userData?.email,
      disable: true,
    },
    {
      id: 'username',
      label: '이름',
      type: 'text',
      value: userData?.name,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-[2.6rem]">
      {USERNAME_FIELDS.map(field => (
        <div
          key={field.id as string}
          className="flex justify-between items-center w-[57.4rem] max-w-full"
        >
          <p className="text-[1.6rem] min-w-[13.9rem]">{field.label}</p>
          <div className="flex flex-col gap-[1rem] flex-1">
            <Input
              {...register(field.id)}
              className="md:h-[4.7rem] !text-[1.6rem]"
              name={field.id}
              type={field.type}
              defaultValue={field.value}
              disabled={field.disable}
              status={errors[field.id] ? 'error' : 'default'}
              helperText={errors[field.id]?.message || undefined}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserInfo;

export const revalidate = 3600;
