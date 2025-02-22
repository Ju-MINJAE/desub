'use client';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { FindPasswordSchema, FindPasswordValue } from '@/app/auth/schemas/FindPasswordSchema';
import { requestPasswordReset } from '@/api/account';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const ResetPasswordForm = () => {
  const router = useRouter();
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
      const result = await requestPasswordReset(data.email); // api 호출
      // 성공시 완료페이지로 이동
      if (result.status === 200) {
        router.push('/login/forgot/account/password/sent');
      }
    } catch (error) {
      console.error('비밀번호 리셋요청 실패:', error);
    }
  };

  const email = watch('email') || '';
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center w-[28rem] md:w-[54rem]"
    >
      <Input
        {...register('email')}
        helperText={errors.email?.message || ''}
        status={errors.email ? 'error' : 'default'}
        placeholder="e-mail address"
        type="email"
      />
      <Button
        className="text-[1.6rem] h-[5.5rem] mt-[6rem] md:mt-[14rem]"
        size="default"
        type="submit"
        variant="black"
      >
        비밀번호 재설정
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
