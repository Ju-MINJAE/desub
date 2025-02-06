import { useState } from 'react';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { SignupFormData } from '../app/auth/schemas/SignupSchema';

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
    if (!email.includes('@')) return;
    try {
      // API 호출 시뮬레이션
      const isAvailable = true;
      setEmailMessage(isAvailable ? '사용 가능한 이메일입니다.' : '이미 사용중인 이메일입니다.');
      setIsEmailAvailable(isAvailable);
      setValue('isEmailAvailable', isAvailable, { shouldValidate: true });
    } catch (error) {
      setIsEmailAvailable(false);
      setValue('isEmailAvailable', false, { shouldValidate: true });
      console.error(error);
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
