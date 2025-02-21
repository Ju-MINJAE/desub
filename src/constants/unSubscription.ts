import { SubscriptionCancelReason, UnSubscriptionReason } from '@/types/profiles';

export const selectedReasonInitialValue: SubscriptionCancelReason = {
  cancelled_reason: [],
  other_reason: '',
};

export const unSubscriptionReasons: UnSubscriptionReason[] = [
  { id: 'expensive', label: '가격이 비싸서' },
  { id: 'quality', label: '퀄리티가 마음에 들지 않아서' },
  { id: 'slow_communication', label: '소통이 느려서' },
  { id: 'hire_full_time', label: '정직원을 구하는 것이 더 편해서' },
  { id: 'budget_cut', label: '회사예산이 줄어들어서' },
  { id: 'other', label: '기타' },
];
