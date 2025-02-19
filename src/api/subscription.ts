const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type SubscriptionStatus = 'subscribed' | 'unsubscribed' | 'loading' | 'error';

interface SubscriptionResponse {
  status: SubscriptionStatus;
  error?: string;
  data?: any;
}

export const statusSubscriptions = async (accessToken: string): Promise<SubscriptionResponse> => {
  if (!accessToken) return { status: 'error', error: '인증 토큰이 없습니다.' };

  try {
    const response = await fetch(`${API_BASE_URL}/api/subscriptions/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      return { status: 'subscribed', data };
    }

    if (response.status === 403 || response.status === 404) {
      return { status: 'unsubscribed', data };
    }

    return {
      status: 'error',
      error: `예상치 못한 응답: ${response.status}`,
    };
  } catch (err) {
    console.error(err);
    return {
      status: 'error',
      error: '구독 상태를 가져오는 데 실패했습니다.',
    };
  }
};

export interface SubscriptionHistoryItem {
  id: number;
  change_date: string;
  status: string;
  sub: number;
  user: string;
  plan: number;
}

interface ApiResponse {
  status: 'success' | 'error';
  data?: SubscriptionHistoryItem[];
  error?: string;
}

export const getSubscriptionHistory = async (accessToken: string): Promise<ApiResponse> => {
  if (!accessToken) {
    return { status: 'error', error: '인증 토큰이 없습니다.' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/subscriptions/history/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return { status: 'error', error: `HTTP error! status: ${response.status}` };
    }

    const data = await response.json();
    return { status: 'success', data };
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return { status: 'error', error: err.message };
    }
    return { status: 'error', error: 'An unknown error occurred' };
  }
};
