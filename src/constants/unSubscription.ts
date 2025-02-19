export type UnSubscriptionReason = {
  id: string;
  label: string;
  contents?: string;
};

export const unSubscriptionReasons: UnSubscriptionReason[] = [
  { id: 'expensive', label: '가격이 비싸서' },
  { id: 'quality', label: '퀄리티가 마음에 들지 않아서' },
  { id: 'communication', label: '소통이 느려서' },
  { id: 'hiring', label: '정직원을 구하는 것이 더 편해서' },
  { id: 'budget', label: '회사예산이 줄어들어서' },
  { id: 'etc', label: '기타' },
];
