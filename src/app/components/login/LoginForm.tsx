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
    const result = await loginWithEmail(data.email, data.password);

    // 성공시
    if (result.success) {
      const { access_token, refresh_token } = result; // 반환값(토큰들)
      await setUserSession(access_token, refresh_token);
      dispatch(loginSuccess()); // 로그인 상태 true로 변경
      router.push('/'); // 로그인 성공시 홈으로 이동
    } else {
      console.error('로그인 실패:', result.error);
      alert('로그인실패'); // 로그인실패시 서버에서 문구받아서 적용해야함 (비번틀렸을때)
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
