import { useState, useEffect } from 'react';
import { formatPhoneNumber } from '@/utils/phone';
import { UseFormWatch, UseFormSetValue, UseFormSetError } from 'react-hook-form';
import { SignupFormData } from '../app/auth/schemas/SignupSchema';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const usePhoneAuth = (
  watch: UseFormWatch<SignupFormData>,
  setValue: UseFormSetValue<SignupFormData>,
  setError: UseFormSetError<SignupFormData>,
) => {
  const [phone, setPhone] = useState('');
  const [isPhoneAuthDisabled, setIsPhoneAuthDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 3분 타이머
  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev !== null && prev > 0 ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 휴대폰번호 인증 api 호출
  const handleRequestVerification = async () => {
    const phone = watch('phone_number'); // 입력된 전화번호 가져오기
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/request-verification/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      console.log('Response Data:', data);

      // 휴대폰번호 인증 api 성공 했을때
      if (response.ok) {
        setTimeLeft(180); // 타이머 3분 설정
      } else {
        setError('phone_number', { message: data.message || '인증번호 요청에 실패했습니다.' });
      }
    } catch (error) {
      console.error('🚨 인증번호 요청 실패:', error);
      setError('phone_number', { message: '서버 오류로 인증번호 요청에 실패했습니다.' });
    }
  };

  // 인증번호 확인 api 호출
  const handleVerifyCode = async () => {
    const phone = watch('phone_number'); // 휴대폰 번호
    const code = watch('phone_auth'); // 인증번호

    if (!code) {
      setError('phone_auth', { message: '인증번호를 입력해주세요.' });
      setSuccessMessage(null);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/verify-phone/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, code }),
      });

      const data = await response.json();
      console.log('data', data);

      // 인증번호 api 인증 성공 했을때
      if (response.ok) {
        setValue('isPhoneVerified', true, { shouldValidate: true });
        setSuccessMessage('인증이 완료되었습니다.');
        setTimeLeft(null);
      } else {
        setError('phone_auth', { message: '인증이 실패했습니다.' });
      }
    } catch (error) {
      console.error('🚨 인증번호 확인 실패:', error);
      setError('phone_auth', { message: '서버 오류로 인증번호 확인요청에 실패했습니다.' });
    }
  };

  return {
    phone,
    setPhone,
    handleVerifyCode,
    handleRequestVerification,
    isPhoneAuthDisabled,
    timeLeft,
    successMessage,
  };
};
