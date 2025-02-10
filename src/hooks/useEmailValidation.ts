import { useState } from 'react';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { SignupFormData } from '../app/auth/schemas/SignupSchema';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useEmailValidation = (
  watch: UseFormWatch<SignupFormData>,
  setValue: UseFormSetValue<SignupFormData>,
) => {
  const email = watch('email') || '';
  const [emailMessage, setEmailMessage] = useState(''); // 이메일 가입여부 메세지
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(false); // 이메일 가입가능여부

  // 이메일 입력 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('email', e.target.value, { shouldValidate: true });
    setEmailMessage(''); // 메시지 초기화
    setIsEmailAvailable(null); // 가입 가능 여부 초기화
  };

  // 이메일 가입여부 확인 API 호출
  const checkEmailForSignup = async () => {
    if (!email.includes('@')) {
      setIsEmailAvailable(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/check-email/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok && data.available) {
        setEmailMessage(data.message);
        setIsEmailAvailable(true);
        setValue('isEmailAvailable', true, { shouldValidate: true });
      } else {
        setEmailMessage(data.message);
        setIsEmailAvailable(false);
        setValue('isEmailAvailable', false, { shouldValidate: true });
      }
    } catch (error) {
      console.error('🚨 API 요청 실패:', error);
      setIsEmailAvailable(false);
      setValue('isEmailAvailable', false, { shouldValidate: true });
    }
  };

  return {
    email,
    emailMessage,
    isEmailAvailable,
    handleEmailChange,
    checkEmailForSignup,
  };
};
