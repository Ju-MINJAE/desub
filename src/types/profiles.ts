import { UserProfileUpdateValue } from '@/app/profiles/schemas/UserProfileUpdateSchema';

type UserProfileUpdateKeys = keyof UserProfileUpdateValue;

export type ProfilesField = {
  id: UserProfileUpdateKeys;
  label?: string;
  value?: string;
  type: 'text' | 'password' | 'email';
  placeholder?: string;
  disable?: boolean;
};
export interface PasswordField {
  id: 'password' | 'newPassword' | 'newPassword_confirm';
  type: 'password';
  placeholder: string;
}

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

export type UnSubscriptionReason = {
  id: string;
  label: string;
  contents?: string;
};

export type SubscriptionCancelReason = {
  cancelled_reason: string[];
  other_reason?: string;
};
