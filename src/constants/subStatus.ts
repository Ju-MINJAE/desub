import { type SubscriptionItem, SubscriptionStatus } from '@/api/subscription';

export const initialStatus: SubscriptionItem = {
  id: 0,
  sub_status: 'none',
  start_date: '',
  end_date: '',
  next_bill_date: '',
  remaining_bill_date: '',
  auto_renew: true,
  cancelled_reason: '',
  other_reason: '',
  user: '',
  plan: 0,
  billing_key: 0,
};
