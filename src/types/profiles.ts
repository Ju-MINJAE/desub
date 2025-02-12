import { ProfilesFormData } from '@/app/profiles/schemas/ProfilesSchema';

type ProfilesFormKeys = keyof ProfilesFormData;

export type ProfilesField = {
  id: ProfilesFormKeys;
  label?: string;
  value?: string;
  type: 'text' | 'password' | 'email';
  placeholder?: string;
  disable?: boolean;
};
