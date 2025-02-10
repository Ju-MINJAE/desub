'use client';

import { SIGNUP_FIELDS } from '@/constants/signup';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField } from './FormField';
import { AgreementList } from './AgreementList';
import { Button } from '../ui/Button';
import { SignupFormData, SignUpSchema } from '@/app/auth/schemas/SignupSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const SignupForm = () => {
  const methods = useForm<SignupFormData>({
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

  const {
    formState: { isValid },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form className="w-full space-y-[8rem]">
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
