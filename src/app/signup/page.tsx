'use client';

import { useForm, useWatch } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Heading from '../components/ui/Heading';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import TextButton from '@/app/components/ui/TextButton';
import { formatTime } from '@/utils/time';
import { formatPhoneNumber } from '@/utils/phone';
import { SignUpSchema, SignupFormData } from '../auth/schemas/SignupSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
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

  const [isPhoneAuthDisabled, setIsPhoneAuthDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [phone, setPhone] = useState('');
  // 이메일
  const email = watch('email') || '';
  const [emailMessage, setEmailMessage] = useState(''); // 이메일 가입여부 메세지
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(false); // 이메일 가입가능여부 저장

  const [checkboxes, setCheckboxes] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });
  console.log(isValid);
  const handleCheckboxChange = (name: keyof typeof checkboxes) => {
    if (name === 'all') {
      const newValue = !checkboxes.all;
      setCheckboxes({
        all: newValue,
        terms: newValue,
        privacy: newValue,
        marketing: newValue,
      });
      // 폼 값도 함께 업데이트
      setValue('terms', newValue, { shouldValidate: true });
      setValue('privacy', newValue, { shouldValidate: true });
      setValue('marketing', newValue, { shouldValidate: true });
    } else {
      const newCheckboxes = {
        ...checkboxes,
        [name]: !checkboxes[name],
      };
      setCheckboxes({
        ...newCheckboxes,
        all: newCheckboxes.terms && newCheckboxes.privacy && newCheckboxes.marketing,
      });
      setValue(name, !checkboxes[name], { shouldValidate: true });
    }
  };
  const handlePhoneAuthClick = () => {
    setIsPhoneAuthDisabled(true);
    setTimeLeft(239);

    setTimeout(() => {
      setIsPhoneAuthDisabled(false);
      setTimeLeft(null);
    }, 239000);
  };

  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev !== null && prev > 0 ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const onSubmit = (data: SignupFormData) => {
    console.log('회원가입 데이터:', data);
  };

  // 이메일 가입여부 확인 api 호출
  // const checkEmailForSignup = async () => {
  //   if (!email.includes('@')) return;
  //   try {
  //     // const response = await fetch(`/api/check-email?email=${email}`);
  //     // const data = await response.json();
  //     // setEmailMessage(data.message);
  //     // setIsEmailAvailable(data.available); // 가입 가능 여부 저장
  //   } catch (error) {
  //     // setIsEmailAvailable(false);
  //     console.error(error);
  //   }
  // };
  const checkEmailForSignup = async () => {
    if (!email.includes('@')) return;
    try {
      // API 호출 시뮬레이션
      const isAvailable = true;
      setEmailMessage(isAvailable ? '사용 가능한 이메일입니다.' : '이미 사용중인 이메일입니다.');
      setIsEmailAvailable(isAvailable);
      setValue('isEmailAvailable', isAvailable, { shouldValidate: true }); // 폼 상태 업데이트 추가
    } catch (error) {
      setIsEmailAvailable(false);
      setValue('isEmailAvailable', false, { shouldValidate: true });
      console.error(error);
    }
  };
  // 휴대폰 인증
  const handleVerifyCode = async () => {
    const code = watch('phone_auth'); // ✅ 입력된 인증번호 가져오기
    if (!code) {
      setError('phone_auth', { message: '인증번호를 입력해주세요.' });
      return;
    }

    // 🔽 실제 API 호출 자리
    /*
    try {
      const response = await fetch('/api/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: watch('phone_number'), code }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setValue('isPhoneVerified', true); // ✅ 인증 성공 시 값 업데이트
      } else {
        setError('phone_auth', { message: '인증번호가 올바르지 않습니다.' });
      }
    } catch (error) {
      console.error('휴대폰 인증 실패:', error);
      setError('phone_auth', { message: '인증 중 오류가 발생했습니다.' });
    }
    */

    // ✅ API 호출 없이 테스트용 코드 (인증번호가 '123456'이면 성공, 아니면 실패)

    if (code === '123456') {
      console.log(code);
      setValue('isPhoneVerified', true, { shouldValidate: true }); // ✅ 인증 성공 처리
    } else {
      console.log(code);
      setError('phone_auth', { message: '인증번호가 올바르지 않습니다.' }); // ✅ 인증 실패 메시지 표시
    }
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
              status={errors.email ? 'error' : isEmailAvailable ? 'success' : 'default'} // ✅ 에러가 있으면 'error', 없으면 'success' 또는 'default'
              helperText={errors.email?.message || emailMessage || '이메일을 입력해주세요.'} // ✅ 오류 메시지가 우선, 없으면 API 응답 메시지, 그마저도 없으면 기본값
              {...register('email', {
                onChange: e => {
                  setValue('email', e.target.value, { shouldValidate: true });
                  setEmailMessage(''); // 유효성 메시지 초기화
                  setIsEmailAvailable(null); // 이메일 사용 가능 여부 초기화
                },
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
                onChange: e => {
                  setPhone(formatPhoneNumber(e.target.value)); // 상태 업데이트
                  setValue('phone_number', formatPhoneNumber(e.target.value), {
                    shouldValidate: true,
                  }); // 폼 상태 업데이트
                },
              })}
            />
            <Button
              type="button"
              variant="outline"
              className="!w-[14rem] h-[5rem] text-[2rem]"
              disabled={isPhoneAuthDisabled}
              onClick={handlePhoneAuthClick}
            >
              휴대폰 인증
            </Button>
          </div>

          {isPhoneAuthDisabled && (
            <div className="pl-[32rem] !mt-[3rem] grid grid-cols-[54rem_14rem] gap-x-8">
              <Input
                id="phone_auth"
                type="number"
                placeholder="인증번호 입력"
                status={errors.phone_auth ? 'error' : 'default'}
                helperText={
                  errors.phone_auth?.message || `인증번호를 입력해주세요. ${formatTime(timeLeft)}`
                }
                {...register('phone_auth', {
                  onChange: e => {
                    setValue('phone_auth', e.target.value, { shouldValidate: true });
                  },
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
            {errors.terms && <p className="text-red text-[1.5rem] mt-2">{errors.terms.message}</p>}
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
            {errors.privacy && (
              <p className="text-red text-[1.5rem] mt-2">{errors.privacy.message}</p>
            )}

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
