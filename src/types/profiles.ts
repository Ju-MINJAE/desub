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

export interface SubscriptionInfo {
  card_name: string;
  card_number: string;
  end_date: string | null;
  next_bill_date: string;
  payment_amount: number;
  plan_id: number;
  remaining_days: number;
}

export type UserData = {
  email: string;
  img_url: string | null;
  name: string;
  phone: string;
  sub_status: string;
  subscription_info: SubscriptionInfo;
};
