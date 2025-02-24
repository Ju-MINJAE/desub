'use server';

import { getUserSession } from '../app/actions/serverAction';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { Plan } from '@/types/plan';
import { SubscriptionCancelReason } from '@/types/profiles';

// 빌링키 저장
export const saveBillingKey = async (billingKey: string, accessToken: string) => {
  try {
    if (!accessToken) return { sub_status: 'error', error: '인증 토큰이 없습니다.' };

    const response = await fetch(`${API_BASE_URL}/api/payment/billing-key/`, {
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

    if (!response.ok) {
      throw new Error('오류 발생');
    }
  } catch (error) {
    console.error('빌링키 저장 중 오류 발생:', error);
  }
};

// 상품 아이디 조회
export const searchPlanId = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/plans/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error || `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }
    const data = await response.json();
    const planId = data.find((plan: Plan) => plan.is_active === true);

    return planId;
  } catch (error) {
    console.error('상품 아이디 조회 중 오류 발생:', error);
    return { success: false, message: error instanceof Error ? error.message : '알 수 없는 오류' };
  }
};

// 구독 결제 요청
export const subscribe = async (planId: number, accessToken: string) => {
  if (!accessToken) return { sub_status: 'error', error: '인증 토큰이 없습니다.' };

  const response = await fetch(`${API_BASE_URL}/api/payment/subscribe/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: JSON.stringify({
      plan_id: planId,
    }),
  });

  if (response.status === 400) {
    const errorData = await response.json();
    return { sub_status: response.status, error: errorData.error };
  }

  if (response.status > 400) {
    const errorText = await response.text();
    return { sub_status: response.status, error: errorText };
  }

  const data = await response.json();
  return data;
};

export const requestPayment = async (billingKey: string) => {
  const { accessToken } = await getUserSession();

  if (!accessToken) {
    console.log('엑세스 토큰이 없습니다.');
    return '엑세스 토큰이 없습니다.';
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
    throw new Error(`HTTP error! Status: ${searchPlan.status}`);
  }

  const planData: Plan[] = await searchPlan.json();

  const activePlan = planData.find((plan: Plan) => plan.is_active === true);

  if (!activePlan) {
    throw new Error(`error! : 결제 가능한 구독 플랜이 없습니다.`);
  }

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
      plan_id: activePlan.id,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (data.error?.includes('이미 Plans object')) {
      return '이미 구독중입니다.';
    }
    return `HTTP error! Status: ${response.status}, Message: ${data.error}`;
  }

  return '구독결제가 완료되었습니다';
};

// 구독 취소
export const cancelSubscription = async (
  id: number,
  reasons: SubscriptionCancelReason,
  accessToken: string,
) => {
  try {
    if (!accessToken) return { sub_status: 'error', error: '인증 토큰이 없습니다.' };

    const response = await fetch(`${API_BASE_URL}/api/payment/refund/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        plan_id: id,
        cancelled_reason: reasons.cancelled_reason,
        other_reason: reasons.other_reason,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error?.[0] || `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('??', data);
    return data;
  } catch (error) {
    console.error('구독 일시정지 중 오류 발생:', error);
    return { success: false, message: error instanceof Error ? error.message : '알 수 없는 오류' };
  }
};

// 구독 정지
export const pauseSubscription = async (plan: number, accessToken: string) => {
  try {
    if (!accessToken) return { sub_status: 'error', error: '인증 토큰이 없습니다.' };

    const response = await fetch(`${API_BASE_URL}/api/payment/pause/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        plan_id: plan,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error?.[0] || `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('구독 일시정지 중 오류 발생:', error);
    return { success: false, message: error instanceof Error ? error.message : '알 수 없는 오류' };
  }
};

// 구독 재개
export const resumeSubscription = async (plan: number, accessToken: string) => {
  try {
    if (!accessToken) return { sub_status: 'error', error: '인증 토큰이 없습니다.' };

    const response = await fetch(`${API_BASE_URL}/api/payment/resume/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        plan_id: plan,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error?.[0] || `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('구독재개 중 오류 발생:', error);
    return { success: false, message: error instanceof Error ? error.message : '알 수 없는 오류' };
  }
};
