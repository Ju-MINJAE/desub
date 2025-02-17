'use server';

import { getUserSession } from './serverAction';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 유저 데이터 받아오는 함수
export const requestPayment = async (billingKey: string) => {
  const { accessToken } = await getUserSession();

  if (!accessToken) {
    console.log('엑세스 토큰이 없습니다.');
    return;
  }

  // 백엔드에 빌링키 저장
  const saveBillingKey = await fetch(`${API_BASE_URL}/api/payment/billing-key/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: JSON.stringify({
      billing_key: billingKey,
    }),
  });

  if (!saveBillingKey.ok) {
    throw new Error(`HTTP error! Status: ${saveBillingKey.status}`);
  }

  // 플랜 조회
  const searchPlan = await fetch(`${API_BASE_URL}/api/plans/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!searchPlan.ok) {
    throw new Error(`확인확인HTTP error! Status: ${searchPlan.status}`);
  }

  const planData = await searchPlan.json();

  // 결제 요청
  const response = await fetch(`${API_BASE_URL}/api/payment/subscribe/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: JSON.stringify({
      plan_id: planData[0].id,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response}`);
  }

  const data = await response.json();
  console.log('확인확인확인', data);
  return data;
};
