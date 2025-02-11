'use client';

import { SIGNUP_FIELDS } from '@/constants/signup';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField } from './FormField';
import { AgreementList } from './AgreementList';
import { Button } from '../ui/Button';
import { SignupFormData, SignUpSchema } from '@/app/auth/schemas/SignupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@/api/auth';

const SignupForm = () => {
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(SignUpSchema),
    mode: 'all',
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

  const {
    formState: { isValid },
  } = methods;

  const onSubmit = async (data: SignupFormData) => {
    const signupData = {
      email: data.email,
      password: data.password,
      name: data.username,
      phone: data.phone_number,
      terms_agreement: data.terms,
      privacy_agreement: data.privacy,
      marketing_agreement: data.marketing ?? false,
    };
    console.log(signupData);
    console.log('현재 입력값:', methods.watch());
    try {
      await signUp(signupData); // signUp 함수호출
      alert('✅ 회원가입 성공!');
    } catch (error) {
      alert('오류 발생');
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="w-full space-y-[8rem]"
        onSubmit={isValid ? methods.handleSubmit(onSubmit) : undefined}
      >
        {SIGNUP_FIELDS.map(field => (
          <FormField key={field.id} field={field}></FormField>
        ))}
        <AgreementList />
        <div className="flex items-center justify-center mt-[14.4rem]">
          <Button
            variant="black"
            type="submit"
            className="w-[54rem] h-[6.6rem] text-[2.5rem]"
            disabled={!isValid}
          >
            join
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignupForm;
