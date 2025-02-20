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

export type UserData = {
  email: string;
  img_url: string | null;
  name: string;
  phone: string;
  sub_status: string;
  subscription_info?: {
    end_date: string;
    plan_id: number;
    remaining_days: number;
  };
};

export type UnSubscriptionReason = {
  id: string;
  label: string;
  contents?: string;
};

export type SubscriptionCancelReason = {
  cancelled_reason: string[];
  other_reason?: string;
};
