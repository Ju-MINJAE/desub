'use server';

import { getUserSession } from './serverAction';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import * as PortOne from '@portone/browser-sdk/v2';

// 유저 데이터 받아오는 함수
export const createBillingKey = async (billingKey: string) => {
  const { accessToken } = await getUserSession();

  if (!accessToken) {
    console.log('엑세스 토큰이 없습니다.');
    return;
  }

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

  const searchBillingKey = await fetch(`${API_BASE_URL}/api/payment/billing-key/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!searchBillingKey.ok) {
    throw new Error(`HTTP error! Status: ${searchBillingKey.status}`);
  }

  const billing_key = await searchBillingKey.json();

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

  return { billing_key, planData };
};
