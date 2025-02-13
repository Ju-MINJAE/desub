'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import TextButton from '@/app/components/ui/TextButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues } from '@/app/auth/schemas/loginSchema';
import { loginWithEmail } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/redux/hooks';
import { loginSuccess } from '@/store/authslice';
import { setUserSession } from '@/app/actions/serverAction';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange', //입력할때마다 즉시 유효성검사
  });

  // 로그인 api 함수 호출
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await loginWithEmail(data.email, data.password);
      if (result && result.access_token && result.refresh_token) {
        await setUserSession(result.access_token, result.refresh_token);
        dispatch(loginSuccess()); // 로그인 상태 변경
        router.push('/'); // 홈으로 이동
      } else {
      }
    } catch (error) {
      console.error('🚨 로그인 실패:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-[1.6rem] w-[40rem] mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
        <Input
          helperText={errors.email?.message || ''}
          placeholder="email address"
          status={errors.email ? 'error' : 'default'}
          type="email"
          className="!text-[2rem]"
          {...register('email')}
        />
        <Input
          helperText={errors.password?.message || ''}
          placeholder="password"
          status={errors.password ? 'error' : 'default'}
          type="password"
          className="!text-[2rem] mt-[4.5rem]"
          {...register('password')}
        />
        <TextButton href="/login/forgot" className="self-end mt-[4.5rem]">
          로그인에 문제가 있으신가요?
        </TextButton>
        <Button
          size="default"
          type="submit"
          variant="green"
          className="mt-[4.5rem]"
          disabled={!isValid}
        >
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
