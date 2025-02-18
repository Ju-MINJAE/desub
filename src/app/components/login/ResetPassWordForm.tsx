import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { FindPasswordSchema, FindPasswordValue } from '@/app/auth/schemas/FindPasswordSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FindPasswordValue>({
    resolver: zodResolver(FindPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FindPasswordValue) => {
    try {
      console.log('api 호출로직');
    } catch (error) {
      console.error('비밀번호전송 실패', error);
    }
  };

  const email = watch('email') || '';
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-[54rem]">
      <Input
        {...register('email')}
        helperText={errors.email?.message || ''}
        status={errors.email ? 'error' : 'default'}
        placeholder="e-mail address"
        type="email"
      />
      <Button
        className="text-[1.6rem] h-[5.5rem] !w-[40rem] mt-[14rem]"
        size="full"
        type="submit"
        variant="black"
      >
        비밀번호 재설정
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
