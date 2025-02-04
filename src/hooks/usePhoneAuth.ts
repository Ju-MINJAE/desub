import { useState, useEffect } from 'react';
import { formatPhoneNumber } from '@/utils/phone';
import { UseFormWatch, UseFormSetValue, UseFormSetError } from 'react-hook-form';
import { SignupFormData } from '../app/auth/schemas/SignupSchema';

export const usePhoneAuth = (
  watch: UseFormWatch<SignupFormData>,
  setValue: UseFormSetValue<SignupFormData>,
  setError: UseFormSetError<SignupFormData>,
) => {
  const [phone, setPhone] = useState('');
  const [isPhoneAuthDisabled, setIsPhoneAuthDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handlePhoneAuthClick = () => {
    setIsPhoneAuthDisabled(true);
    setTimeLeft(239);
    setSuccessMessage(null);

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

  // 휴대폰번호 입력 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
    setValue('phone_number', formattedPhone, { shouldValidate: true });
  };

  // 인증번호 입력 핸들러
  const handlePhoneAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('phone_auth', e.target.value, { shouldValidate: true });
  };

  // 인증번호 검증 핸들러
  const handleVerifyCode = () => {
    const code = watch('phone_auth');
    if (!code) {
      setError('phone_auth', { message: '인증번호를 입력해주세요.' });
      return;
    }

    // 🔽 실제 API 호출 자리
    if (code === '123456') {
      setValue('isPhoneVerified', true, { shouldValidate: true });
      setSuccessMessage('인증이 완료되었습니다');
      setTimeLeft(null);
    } else {
      setError('phone_auth', { message: '인증번호가 올바르지 않습니다.' });
    }
  };

  return {
    phone,
    setPhone,
    handlePhoneChange,
    handlePhoneAuthClick,
    handleVerifyCode,
    handlePhoneAuthChange,
    isPhoneAuthDisabled,
    timeLeft,
    successMessage,
  };
};
