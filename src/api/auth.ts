const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const FRONTEND_ENV = process.env.NEXT_PUBLIC_FRONTEND_ENV;
import type { SignupData } from '@/types/signup';
import { LoginResponse } from '@/types/signup';
import { GoogleResponse } from '@/types/signup';

export const signUp = async (data: SignupData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/signup/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || '회원가입 실패');
    }

    console.log('회원가입 성공:', responseData);
    return responseData;
  } catch (error) {
    console.error('회원가입 요청 실패:', error);
    throw error;
  }
};

export const loginWithEmail = async (
  email: string,
  password: string,
): Promise<LoginResponse & { status: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/login/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    const status = response.status;

    // 400 에러일 경우
    if (response.status === 400) {
      return { ...data, status };
    }

    console.log('로그인 성공:', data);
    return { ...data, status };
  } catch (error) {
    console.error('로그인 요청 실패:', error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google/login/?env=${FRONTEND_ENV}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`서버 응답 실패: ${response.status}`);
    }

    const data = await response.json();

    if (data.auth_url) {
      window.location.href = data.auth_url;
    } else {
      throw new Error('인증 URL을 받아오지 못했습니다.');
    }
  } catch (error) {
    console.error('구글 로그인 오류:', error);
  }
};

export const saveGoogleUserPhone = async (
  phone: string,
  marketing_agreement: boolean,
  accessToken: string,
): Promise<GoogleResponse & { status: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/g-phone/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ phone, marketing_agreement }),
    });

    const data = await response.json();
    const status = response.status;

    if (!response.ok) {
      throw new Error(`🚨 서버 응답 실패: ${response.status}`);
    }

    console.log('전화번호 저장 성공:', data);
    return { ...data, status };
  } catch (error) {
    console.error('🚨 구글 전화번호 저장 오류:', error);
    throw error;
  }
};

export const fetchRefreshedToken = async (refreshToken: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/refresh_token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`서버 응답 실패: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('리프레시 토큰 발급 오류:', error);
    throw error;
  }
};

export const logoutUser = async (accessToken: string, refreshToken: string) => {
  try {
    if (!refreshToken) {
      throw new Error('로그아웃 실패: refresh_token 없음');
    }

    const response = await fetch(`${API_BASE_URL}/api/user/logout/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('로그아웃 실패');
    }

    console.log('로그아웃 성공');
  } catch (error) {
    console.error('로그아웃 요청 실패:', error);
    throw error;
  }
};
