import type { ProfilesField } from '@/types/profiles';

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
];
