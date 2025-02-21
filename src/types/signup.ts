import { SignupFormData } from '@/app/auth/schemas/SignupSchema';

type SignupFormKeys = keyof SignupFormData; //SignupFormData 의 키값을 union 타입으로 변환

export type BaseField = {
  id: SignupFormKeys;
  label?: string;
  type: string;
  placeholder: string;
  button?: {
    text: string;
  };
};

export type AuthField = BaseField;

// BaseField를 확장하면서 authField를 가질 수도 있는 타입
export type SignUpField = BaseField & {
  authField?: AuthField;
};

export type AgreementItem = {
  id: 'terms' | 'privacy' | 'marketing';
  text: string;
  required: boolean;
  link?: {
    href: string;
    text: string;
  };
};

export type SignupData = {
  email: string;
  password: string;
  name: string;
  phone: string;
  terms_agreement: boolean;
  privacy_agreement: boolean;
  marketing_agreement: boolean;
};

export type GoogleResponse = {
  message: string;
  access_token: string;
  refresh_token: string;
  phone: boolean;
  error?: string;
};

export type LoginResponse = {
  message: string;
  access_token: string;
  refresh_token: string;
};
