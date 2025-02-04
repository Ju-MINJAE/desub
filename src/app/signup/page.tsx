'use client';

import { useForm } from 'react-hook-form';
import Heading from '../components/ui/Heading';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import TextButton from '@/app/components/ui/TextButton';
import { formatTime } from '@/utils/time';
import { SignUpSchema, SignupFormData } from '../auth/schemas/SignupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePhoneAuth } from '@/hooks/usePhoneAuth';
import { useEmailValidation } from '@/hooks/useEmailValidation';
import { useCheckboxValidation } from '@/hooks/useCheckboxValidation';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    setError,
    control,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      password_confirm: '',
      username: '',
      phone_number: '',
      phone_auth: '',
      isPhoneVerified: false,
      isEmailAvailable: false,
      terms: false,
      privacy: false,
      marketing: false,
    },
  });
  // 휴대폰 인증 훅
  const {
    phone,
    setPhone,
    handlePhoneAuthChange,
    handlePhoneChange,
    handlePhoneAuthClick,
    handleVerifyCode,
    isPhoneAuthDisabled,
    timeLeft,
    successMessage,
  } = usePhoneAuth(watch, setValue, setError);

  // 이메일 관련 훅 적용
  const { email, emailMessage, isEmailAvailable, handleEmailChange, checkEmailForSignup } =
    useEmailValidation(watch, setValue);
  //  체크박스 검증 훅 적용
  const { checkboxes, handleCheckboxChange } = useCheckboxValidation(
    watch,
    setValue,
    trigger,
    errors,
  );

  const allFormValues = watch();
  console.log('현재 폼 값들:', allFormValues);
  console.log('현재 에러들:', errors);
  const onSubmit = (data: SignupFormData) => {
    console.log('회원가입 데이터:', data);
  };

  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="w-full max-w-[98rem] flex flex-col items-center">
        <Heading tag="h1" className="mt-[9rem] mb-[13rem]">
          join
        </Heading>

        <form className="w-full space-y-[8rem]" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
            <label htmlFor="email" className="text-[3rem]">
              e-mail address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="e-mail address"
              value={email}
              status={errors.email ? 'error' : isEmailAvailable ? 'success' : 'default'}
              helperText={errors.email?.message || emailMessage || '이메일을 입력해주세요.'}
              {...register('email', {
                onChange: handleEmailChange,
              })}
            />
            <Button
              type="button"
              variant="outline"
              className="!w-[14rem] h-[5rem] text-[2rem]"
              onClick={checkEmailForSignup}
              disabled={!email.includes('@')}
            >
              가입여부 확인
            </Button>
          </div>

          <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
            <label htmlFor="password" className="text-[3rem]">
              password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              status={errors.password ? 'error' : 'default'}
              helperText={
                errors.password?.message || '영문대/소문자, 숫자, 특수문자 1개 이상 포함 10자 이상'
              }
              {...register('password', {
                onChange: e => {
                  setValue('password', e.target.value, { shouldValidate: true });
                },
              })}
            />
          </div>

          <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
            <label htmlFor="confirm-password" className="text-[3rem]">
              confirm password
            </label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="confirm password"
              status={errors.password_confirm ? 'error' : 'default'}
              helperText={errors.password_confirm?.message}
              {...register('password_confirm', {
                onChange: e => {
                  setValue('password_confirm', e.target.value, { shouldValidate: true });
                },
              })}
            />
          </div>

          <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
            <label htmlFor="name" className="text-[3rem]">
              name
            </label>
            <Input
              id="username"
              type="text"
              placeholder="홍길동"
              status={errors.username ? 'error' : 'default'}
              helperText={errors.username?.message}
              {...register('username', {
                onChange: e => {
                  setValue('username', e.target.value, { shouldValidate: true });
                },
              })}
            />
          </div>

          <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
            <label htmlFor="phone" className="text-[3rem]">
              phone
            </label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              placeholder="010-1234-5678"
              status={errors.phone_number ? 'error' : 'default'}
              helperText={errors.phone_number?.message}
              {...register('phone_number', {
                onChange: handlePhoneChange,
              })}
            />
            <Button
              type="button"
              className="!w-[14rem] h-[5rem] text-[2rem]"
              onClick={handlePhoneAuthClick}
              disabled={isPhoneAuthDisabled}
            >
              휴대폰 인증
            </Button>
          </div>

          {isPhoneAuthDisabled && (
            <div className="pl-[32rem] !mt-[3rem] grid grid-cols-[54rem_14rem] gap-x-8">
              <Input
                id="phone_auth"
                type="text"
                placeholder="인증번호 입력"
                status={errors.phone_auth ? 'error' : successMessage ? 'success' : 'default'}
                helperText={
                  errors.phone_auth?.message ||
                  successMessage ||
                  `인증번호를 입력해주세요. ${formatTime(timeLeft)}`
                }
                {...register('phone_auth', {
                  onChange: handlePhoneAuthChange,
                })}
              />
              <Button
                type="button"
                variant="outline"
                className="!w-[14rem] h-[5rem] text-[2rem] mt-[2.2rem]"
                onClick={handleVerifyCode}
              >
                인증 확인
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-10">
            <label className="flex items-center space-x-[2.3rem]">
              <input
                type="checkbox"
                className="peer hidden"
                checked={checkboxes.all}
                onChange={() => handleCheckboxChange('all')}
              />
              <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
              <span className="font-bold text-[3rem]">전체 동의</span>
            </label>
            <label className="flex items-center space-x-[2.3rem] mt-[7.4rem]">
              <input
                type="checkbox"
                className="peer hidden"
                checked={checkboxes.terms}
                onChange={() => handleCheckboxChange('terms')}
              />
              <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
              <span className="text-[3rem]">
                <TextButton href="/signup/terms" className="text-[3rem] !font-bold">
                  이용약관
                </TextButton>
                에 동의합니다.(필수)
              </span>
            </label>
            <label className="flex items-center space-x-[2.3rem]">
              <input
                type="checkbox"
                className="peer hidden"
                checked={checkboxes.privacy}
                onChange={() => handleCheckboxChange('privacy')}
              />
              <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
              <span className="text-[3rem]">
                <TextButton href="/signup/privacy-policy" className="text-[3rem] !font-bold">
                  개인정보처리방침
                </TextButton>
                에 동의합니다.(필수)
              </span>
            </label>

            <label className="flex items-center space-x-[2.3rem]">
              <input
                type="checkbox"
                className="peer hidden"
                checked={checkboxes.marketing}
                onChange={() => handleCheckboxChange('marketing')}
              />
              <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
              <span className="text-[3rem]">마케팅 수신에 동의합니다.(선택)</span>
            </label>
            {errors.terms && (
              <p className="text-red text-[1.5rem] mt-2 ml-[2.3rem]">{errors.terms.message}</p>
            )}
          </div>

          <div className="flex items-center justify-center mt-[14.4rem]">
            <Button
              variant="green"
              type="submit"
              className="w-[54rem] h-[6.6rem] text-[2.5rem]"
              disabled={!isValid}
            >
              join
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
