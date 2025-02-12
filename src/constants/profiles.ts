import type { ProfilesField } from '@/types/profiles';

const exampleData = {
  email: 'example@example.com',
  username: '홍길동',
};

export const USERNAME_FIELDS: ProfilesField[] = [
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    value: exampleData.username,
    disable: true,
  },
  {
    id: 'username',
    label: '이름',
    type: 'text',
    value: exampleData.username,
  },
] as const;

export const PASSWORD_FIELDS: ProfilesField[] = [
  {
    id: 'password',
    type: 'password',
    placeholder: '이전 비밀번호',
  },
  {
    id: 'newPassword',
    type: 'password',
    placeholder: '신규 비밀번호',
  },
  {
    id: 'newPassword_confirm',
    type: 'password',
    placeholder: '신규 비밀번호 재입력',
  },
] as const;
