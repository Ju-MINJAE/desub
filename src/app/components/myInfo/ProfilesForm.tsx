import { useForm } from 'react-hook-form';
import { ProfilesFormData, ProfilesSchema } from '@/app/profiles/schemas/ProfilesSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Profiles from './Profiles';
import PaymentInfo from './PaymentInfo';

const ProfilesForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfilesFormData>({
    resolver: zodResolver(ProfilesSchema),
    mode: 'onBlur',
  });

  const onSubmit = () => {
    console.log(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[10rem] items-center">
      <Profiles />
      <hr className="w-[70rem] border-lightgray" />
      <PaymentInfo />
    </form>
  );
};

export default ProfilesForm;
