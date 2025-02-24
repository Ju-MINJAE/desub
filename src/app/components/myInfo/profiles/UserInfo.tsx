import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { useAppSelector } from '@/hooks/redux/hooks';
import { Input } from '@/app/components/ui/Input';
import { UserProfileUpdateValue } from '@/app/profiles/schemas/UserProfileUpdateSchema';

interface Props {
  register: UseFormRegister<UserProfileUpdateValue>;
  errors: FieldErrors<UserProfileUpdateValue>;
}

const UserInfo = ({ register, errors }: Props) => {
  const userData = useAppSelector(state => state.userData);

  return (
    <div className="w-full md:w-[57.4rem] flex flex-col gap-[2.6rem] flex-grow-0">
      {/* 이메일 (읽기 전용) */}
      <div className="flex justify-between items-center w-full">
        <p className="text-[1.6rem] min-w-[13.9rem]">이메일</p>
        <Input
          className="md:h-[4.7rem] !text-[1.6rem]"
          type="email"
          value={userData?.email}
          disabled
        />
      </div>

      {/* 이름 */}
      <div className="flex justify-between items-center w-full">
        <p className="text-[1.6rem] min-w-[13.9rem]">이름</p>
        <div className="flex flex-col gap-[1rem] w-full">
          <Input
            {...register('name')}
            className="md:h-[4.7rem] !text-[1.6rem]"
            type="text"
            defaultValue={userData?.name}
            status={errors.name ? 'error' : 'default'}
            helperText={errors.name?.message || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

export const revalidate = 3600;
