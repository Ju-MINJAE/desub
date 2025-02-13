'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { GoogleSignupSchema, GoogleSignupValues } from '@/app/auth/schemas/GoogleSignupSchema';
import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { saveGoogleUserPhone } from '@/api/auth';
import { setUserSession } from '@/app/actions/serverAction';
import { loginSuccess } from '@/store/authslice';
import { useAppDispatch } from '@/hooks/redux/hooks';
import { formatPhoneNumber } from '@/utils/phone';
import { usePhoneAuth } from '@/hooks/usePhoneAuth';
import { formatTime } from '@/utils/time';

export default function Social() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isAuthFieldVisible, setIsAuthFieldVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    setError,
  } = useForm<GoogleSignupValues>({
    resolver: zodResolver(GoogleSignupSchema),
    mode: 'onChange',
  });

  // 폼제출
  const onSubmit = async (data: GoogleSignupValues) => {
    console.log(data, 'data');

    const result = await saveGoogleUserPhone(data.phone_number); // 구글 사용자 phone api 호출

    // 회원가입 완료시
    if (result && result.access_token && result.refresh_token) {
      setUserSession(result.access_token, result.refresh_token);
      dispatch(loginSuccess());
      router.push('/signup/complete'); // 회원가입 완료 페이지로 이동
    } else {
      throw new Error('🚨 서버 응답이 올바르지 않음');
    }
  };

  // const { handleRequestVerification, handleVerifyCode, timeLeft, successMessage } = usePhoneAuth(
  //   watch,
  //   setValue,
  //   setError,
  // );
  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="w-full max-w-[98rem] flex flex-col items-center">
        <Heading tag="h1" className="mt-[9rem] mb-[13rem]">
          join
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
          <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
            <label className="text-[3rem]">phone</label>
            <Input
              type="tel"
              placeholder="010-1234-5678"
              {...register('phone_number')}
              helperText={errors.phone_number?.message || ''}
              status={errors.phone_number ? 'error' : 'default'}
              onChange={e => {
                const formatted = formatPhoneNumber(e.target.value);
                e.target.value = formatted;
              }}
            />
            <Button
              type="button"
              variant="outline"
              className="!w-[14rem] h-[5rem] text-[2rem]"
              onClick={() => setIsAuthFieldVisible(true)}
            >
              휴대폰 인증
            </Button>
          </div>

          {isAuthFieldVisible && (
            <div className="!mt-[3rem] pl-[32rem] grid grid-cols-[54rem_14rem] gap-x-8">
              <Input
                type="text"
                placeholder="인증번호 입력"
                {...register('phone_auth')}
                helperText={errors.phone_auth?.message || ''}
                status={errors.phone_auth ? 'error' : 'default'}
              />
              <Button
                type="submit"
                variant="outline"
                className="!w-[14rem] h-[5rem] text-[2rem]"
                disabled={!isValid}
              >
                인증 확인
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
