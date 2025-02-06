import type { SignUpField } from '@/types/signup';
import type { AgreementItem } from '@/types/signup';

export const SIGNUP_FIELDS: SignUpField[] = [
  {
    id: 'email',
    label: 'e-mail address',
    type: 'email',
    placeholder: 'e-mail address',
    button: {
      text: '가입여부 확인',
    },
  },
  {
    id: 'password',
    label: 'password',
    type: 'password',
    placeholder: 'password',
  },
  {
    id: 'password_confirm',
    label: 'confirm password',
    type: 'password',
    placeholder: 'confirm password',
  },
  {
    id: 'username',
    label: 'name',
    type: 'text',
    placeholder: '홍길동',
  },
  {
    id: 'phone_number',
    label: 'phone',
    type: 'tel',
    placeholder: '010-1234-5678',
    button: {
      text: '휴대폰 인증',
    },
    authField: {
      id: 'phone_auth',
      type: 'number',
      placeholder: '인증번호 입력',
      button: {
        text: '인증 확인',
      },
    },
  },
] as const;

export const AGREEMENT_ITEMS: AgreementItem[] = [
  {
    id: 'terms',
    text: '에 동의합니다.',
    required: true,
    link: {
      href: '/signup/terms',
      text: '이용약관',
    },
  },
  {
    id: 'privacy',
    text: '에 동의합니다.',
    required: true,
    link: {
      href: '/signup/privacy-policy',
      text: '개인정보처리방침',
    },
  },
  {
    id: 'marketing',
    text: '마케팅 수신에 동의합니다.',
    required: false,
  },
] as const;
