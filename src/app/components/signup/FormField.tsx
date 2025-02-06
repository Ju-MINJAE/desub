import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ChangeEvent, useState } from 'react';
import { useEmailValidation } from '@/hooks/useEmailValidation';
import { SignupFormData } from '@/app/auth/schemas/SignupSchema';
import { formatPhoneNumber } from '@/utils/phone';
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

  const { checkEmailForSignup } = useEmailValidation(watch, setValue);
  const [isAuthFieldVisible, setIsAuthFieldVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleButtonClick = () => {
    switch (field.id) {
      case 'email':
        checkEmailForSignup();
        break;
      case 'phone_number':
        setIsAuthFieldVisible(true);
        setTimeout(() => {
          setIsAuthFieldVisible(false);
        }, 239000);
        break;
    }
  };

  const handleVerifyCode = () => {
    const code = watch('phone_auth');
    if (!code) {
      setError('phone_auth', { message: '인증번호를 입력해주세요.' });
      setSuccessMessage('');
      return;
    }

    if (code === '123456') {
      setSuccessMessage('인증에 성공했습니다.');
      setValue('isPhoneVerified', true, { shouldValidate: true });
    } else {
      setError('phone_auth', { message: '인증에 실패했습니다.' });
      setSuccessMessage('');
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
          status={errors?.[field.id] ? 'error' : 'default'}
          helperText={errorMessage}
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
          >
            {field.button.text}
          </Button>
        )}
      </div>
      {field.authField && isAuthFieldVisible && (
        <div className="pl-[32rem] !mt-[3rem] grid grid-cols-[54rem_14rem] gap-x-8">
          <Input
            id={field.authField.id}
            type={field.authField.type}
            placeholder={field.authField.placeholder}
            helperText={successMessage || errors.phone_auth?.message}
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
