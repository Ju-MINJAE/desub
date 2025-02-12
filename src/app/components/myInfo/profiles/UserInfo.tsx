import { USERNAME_FIELDS } from '@/constants/profiles';
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
import { ProfilesFormData } from '@/app/profiles/schemas/ProfilesSchema';

interface Props {
  register: UseFormRegister<ProfilesFormData>;
  errors: FieldErrors<ProfilesFormData>;
}

const UserInfo = ({ register, errors }: Props) => {
  return (
    <div className="w-full flex flex-col gap-[2.6rem] ml-[2rem]">
      {USERNAME_FIELDS.map(field => (
        <div key={field.id as string} className="flex justify-between items-center">
          <p className="text-[1.6rem]">{field.label}</p>
          <div className="flex flex-col gap-[1rem]">
            <input
              {...register(field.id)}
              name={field.id}
              className="w-[43.5rem] h-[4.7rem] p-[1rem] border-b"
              type={field.type}
              defaultValue={field.value}
              disabled={field.disable}
            />
            {errors[field.id] && (
              <div className="w-full">
                <p className="text-red text-[1.6rem]">{errors[field.id]?.message}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserInfo;
