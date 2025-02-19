import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ChangeEvent, useEffect, useState } from 'react';
import { useEmailValidation } from '@/hooks/useEmailValidation';
import { usePhoneAuth } from '@/hooks/usePhoneAuth';
import { SignupFormData } from '@/app/auth/schemas/SignupSchema';
import { formatPhoneNumber } from '@/utils/phone';
import { formatTime } from '@/utils/time';
import type { SignUpField } from '@/types/signup';

interface FormFieldProps {
  field: SignUpField;
  children?: React.ReactNode;
}

export const FormField = ({ field }: FormFieldProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useFormContext<SignupFormData>();

  const errorMessage = errors[field.id]?.message?.toString() || '';

  const { checkEmailForSignup, emailMessage, isEmailAvailable } = useEmailValidation(
    watch,
    setValue,
  );
  const { handleRequestVerification, handleVerifyCode, timeLeft, successMessage, isRequested } =
    usePhoneAuth(watch, setValue, setError);
  const [isAuthFieldVisible, setIsAuthFieldVisible] = useState(false);

  useEffect(() => {
    if (successMessage) {
      setIsAuthFieldVisible(false); // 인증 성공시 인증번호 입력 필드 숨기기
    }
  });
  const handleButtonClick = () => {
    switch (field.id) {
      case 'email':
        checkEmailForSignup();
        break;
      case 'phone_number':
        handleRequestVerification(); // 휴대폰번호 인증 api
        setIsAuthFieldVisible(true);
        setTimeout(() => {
          setIsAuthFieldVisible(false);
        }, 240000);
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id as keyof SignupFormData;

    switch (e.target.type) {
      case 'tel':
        e.target.value = formatPhoneNumber(value);
        setValue(id, e.target.value, { shouldValidate: true });
        break;

      case 'email':
        setValue(id, value, { shouldValidate: true });
        break;

      case 'password':
        setValue(id, value, { shouldValidate: true });
        break;

      default:
        setValue(id, value, { shouldValidate: true });
    }
  };

  const buttonText =
    field.id === 'phone_number'
      ? isRequested
        ? '인증 재발송'
        : '휴대폰 인증'
      : field.button?.text;
  const buttonDisabled = field.id === 'phone_number' && Boolean(successMessage);

  return (
    <>
      <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
        <label htmlFor={field.id} className="text-[3rem]">
          {field.label}
        </label>
        <Input
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
          status={
            field.id === 'email'
              ? isEmailAvailable === true
                ? 'success'
                : isEmailAvailable === false
                ? 'error'
                : 'default'
              : successMessage
              ? 'success'
              : errors?.[field.id]
              ? 'error'
              : 'default'
          }
          helperText={
            field.id === 'email'
              ? emailMessage || errorMessage 
              : errors?.[field.id]?.message || (successMessage ? successMessage : '')
          }
          {...register(field.id, {
            onChange: e => handleChange(e),
          })}
        />
        {field.button && (
          <Button
            type="button"
            variant="outline"
            className="!w-[14rem] h-[5rem] text-[2rem]"
            onClick={handleButtonClick}
            disabled={buttonDisabled} // 인증 성공시 버튼 비활성화
          >
            {buttonText}
          </Button>
        )}
      </div>
      {field.authField && isAuthFieldVisible && !successMessage && (
        <div className="pl-[32rem] !mt-[3rem] grid grid-cols-[54rem_14rem] gap-x-8">
          <Input
            id={field.authField.id}
            type={field.authField.type}
            placeholder={field.authField.placeholder}
            status={errors.phone_auth ? 'error' : successMessage ? 'success' : 'default'}
            helperText={
              errors.phone_auth?.message ||
              successMessage ||
              (timeLeft ? `인증번호를 입력해주세요. ${formatTime(timeLeft)}` : '')
            }
            {...register(field.authField.id, { onChange: e => handleChange(e) })}
          />
          <Button
            type="button"
            variant="outline"
            className="!w-[14rem] h-[5rem] text-[2rem] mt-[2.2rem]"
            onClick={handleVerifyCode}
          >
            {field.authField.button?.text}
          </Button>
        </div>
      )}
    </>
  );
};
