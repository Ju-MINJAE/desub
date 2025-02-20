const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type SubscriptionStatus =
  | 'active'
  | 'unsubscribed'
  | 'cancelled'
  | 'paused'
  | 'loading'
  | 'error';

interface SubscriptionItem {
  id: number;
  sub_status: SubscriptionStatus;
  start_date: string;
  end_date: string;
  next_bill_date: string;
  remaining_bill_date: string;
  auto_renew: boolean;
  cancelled_reason?: string;
  other_reason?: string;
  user: string;
  plan: number;
  billing_key: number;
}

interface SubscriptionError {
  sub_status: 'error';
  error: string;
}

type SubscriptionResponse = SubscriptionItem[] | SubscriptionError;

export const statusSubscriptions = async (accessToken: string): Promise<SubscriptionResponse> => {
  if (!accessToken) return { sub_status: 'error', error: '인증 토큰이 없습니다.' };

  try {
    const response = await fetch(`${API_BASE_URL}/api/subscriptions/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`서버 응답 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return {
      sub_status: 'error',
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
