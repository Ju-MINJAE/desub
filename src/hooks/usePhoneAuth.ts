// usePhoneAuth.ts
import { useState, useEffect } from 'react';
import { UseFormWatch, UseFormSetValue, UseFormSetError, Path } from 'react-hook-form';

interface PhoneFormFields {
  phone_number: string;
  phone_auth?: string;
  isPhoneVerified?: boolean;
}

export const usePhoneAuth = <T extends PhoneFormFields>(
  watch: UseFormWatch<T>,
  setValue: UseFormSetValue<T>,
  setError: UseFormSetError<T>,
) => {
  const [isPhoneAuthDisabled, setIsPhoneAuthDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isRequested, setIsRequested] = useState(false);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev !== null && prev > 0 ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleRequestVerification = async () => {
    const phoneNumber = watch('phone_number' as Path<T>);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/request-verification/`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone: phoneNumber }),
        },
      );

      const data = await response.json();
      // 휴대폰 번호 입력 안했을시
      if (!phoneNumber) {
        setError('phone_number' as Path<T>, {
          message: '휴대폰번호를 입력해주세요.',
        });
        return;
      }

      // 성공시
      if (response.ok) {
        setTimeLeft(240); // 4분 타이머
        setIsRequested(true);
      } else if (data.error === '동일한 전화번호로 가입된 계정이 있습니다.') {
        setIsLoginPromptOpen(true);
        setError('phone_number' as Path<T>, {
          message: data.error,
        });
      } else {
        setError('phone_number' as Path<T>, {
          message: data.error,
        });
      }
    } catch (error) {
      console.error('🚨 인증번호 요청 실패:', error);
      setError('phone_number' as Path<T>, {
        message: '서버 오류로 인증번호 요청에 실패했습니다.',
      });
    }
  };

  const handleVerifyCode = async () => {
    const phoneNumber = watch('phone_number' as Path<T>);
    const code = watch('phone_auth' as Path<T>);

    if (!code) {
      setError('phone_auth' as Path<T>, {
        message: '인증번호를 입력해주세요.',
      });
      setSuccessMessage(null);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/verify-phone/`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone: phoneNumber, code }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setValue('isPhoneVerified' as Path<T>, true as any, {
          shouldValidate: true,
        });
        setSuccessMessage('인증이 완료되었습니다.');
        setTimeLeft(null);
      } else {
        setError('phone_auth' as Path<T>, {
          message: '인증이 실패했습니다.',
        });
      }
    } catch (error) {
      console.error('인증번호 확인 실패:', error);
      setError('phone_auth' as Path<T>, {
        message: '서버 오류로 인증번호 확인요청에 실패했습니다.',
      });
    }
  };

  return {
    handleVerifyCode,
    handleRequestVerification,
    isPhoneAuthDisabled,
    timeLeft,
    successMessage,
    isRequested,
    isLoginPromptOpen,
    setIsLoginPromptOpen,
  };
};
