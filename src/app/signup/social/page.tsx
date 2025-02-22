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
import { getUserSession } from '@/app/actions/serverAction';
import { Alert } from '@/app/components/ui/Alert';
import AgreementItem from '@/app/components/signup/AgreementItem';

export default function Social() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isAuthFieldVisible, setIsAuthFieldVisible] = useState(false);

  const handleClosePopup = () => {
    setIsLoginPromptOpen(false);
  };
  const handleNavigateLogin = () => {
    router.push('/login/email'); // 로그인 페이지로 이동
  };

  const handleNavigateFindAccount = () => {
    router.push('/login/forgot'); // 계정찾기 페이지로 이동
  };
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
    console.log(data);
    const session = await getUserSession();
    const accessToken = session?.accessToken ?? ''; // 기본값 설정
    const refreshToken = session?.refreshToken ?? ''; // 기본값 설정

    setUserSession(accessToken, refreshToken); // 토큰저장
    if (!accessToken) {
      throw new Error('🚨 유효한 액세스 토큰이 없습니다.');
    }
    const marketingConsent = data.marketing ?? false; // 기본값 false
    const result = await saveGoogleUserPhone(data.phone_number, marketingConsent, accessToken); // 구글 사용자 phone api 호출

    // 회원가입 완료시
    if (result.status === 200) {
      dispatch(loginSuccess()); // login true
      router.push('/signup/complete'); // 회원가입 완료 페이지로 이동
    } else {
      throw new Error('🚨 전화번호 저장 실패: 서버 응답이 예상과 다릅니다.');
    }
  };

  const {
    handleRequestVerification,
    handleVerifyCode,
    timeLeft,
    successMessage,
    isRequested,
    isLoginPromptOpen,
    setIsLoginPromptOpen,
  } = usePhoneAuth(watch, setValue, setError);

  const handleButtonClick = () => {
    handleRequestVerification(); // 휴대폰번호 인증 api
    setIsAuthFieldVisible(true);
    setTimeout(() => {
      setIsAuthFieldVisible(false);
    }, 240000);
  };
  const phoneNumber = watch('phone_number') || ''; // 입력 값 실시간 감지
  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="w-full max-w-[98rem] flex flex-col items-center">
        <Heading tag="h1" className="mt-[9rem] mb-[13rem]">
          google login
        </Heading>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center max-w-[70rem]"
        >
          <div className="grid grid-cols-[54rem_14rem] gap-x-8 items-center">
            <Input
              type="tel"
              placeholder="010-1234-5678"
              {...register('phone_number')}
              helperText={errors.phone_number?.message || successMessage || ''}
              status={errors.phone_number ? 'error' : successMessage ? 'success' : 'default'}
              value={formatPhoneNumber(phoneNumber)} // 실시간으로 포맷 적용
            />
            <Button
              type="button"
              variant="outline"
              className="!w-[14rem] h-[5rem] text-[2rem]"
              onClick={handleButtonClick}
              disabled={Boolean(successMessage)}
            >
              {isRequested ? '인증 재발송' : '휴대폰 인증'}
            </Button>
          </div>
          {isAuthFieldVisible && !successMessage && (
            <div className="grid grid-cols-[54rem_14rem] gap-x-8 items-center mt-[3rem]">
              <Input
                type="text"
                placeholder="인증번호 입력"
                {...register('phone_auth')}
                status={errors.phone_auth ? 'error' : successMessage ? 'success' : 'default'}
                helperText={
                  errors.phone_auth?.message ||
                  successMessage ||
                  (timeLeft ? `인증번호를 입력해주세요. ${formatTime(timeLeft)}` : '')
                }
              />
              <Button
                type="button"
                variant="outline"
                className="!w-[14rem] h-[5rem] text-[2rem]"
                onClick={handleVerifyCode}
              >
                인증 확인
              </Button>
            </div>
          )}
          <div className="mt-[5rem] grid grid-cols-[70rem] self-baseline items-center ml-[-1.7rem]">
            <AgreementItem
              id="marketing"
              text="[선택] 마케팅 수신에 동의합니다."
              required={false}
              checked={watch('marketing') ?? false}
              onChange={checked => setValue('marketing', checked, { shouldValidate: true })}
            />
          </div>
          <div className="flex items-center justify-center mt-[14.4rem]">
            <Button
              variant="black"
              type="submit"
              className="w-[40rem] h-[5.5rem] text-[1.6rem]"
              disabled={!isValid}
            >
              확인
            </Button>
          </div>
        </form>
        {isLoginPromptOpen && (
          <Alert
            buttonText="로그인 하기"
            textButton="계정 찾기"
            size="full"
            title={
              <>
                입력된 정보로 가입된 이력이 있습니다.
                <br />
                로그인 또는 계정찾기를 진행해주세요.
              </>
            }
            variant="green"
            onClose={() => handleClosePopup()}
            onSubmit={() => handleNavigateLogin()}
            onTextButtonClick={() => handleNavigateFindAccount()}
          />
        )}
      </div>
    </div>
  );
}
