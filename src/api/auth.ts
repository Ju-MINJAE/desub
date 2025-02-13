const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import type { SignupData } from '@/types/signup';
import { setUserSession } from '@/app/actions/serverAction';

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

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || '회원가입 실패');
    }

    console.log('회원가입 성공');
  } catch (error) {
    console.error('회원가입 요청 실패:', error);
    throw error;
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/login/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || '로그인 실패');
    }

    const data = await response.json();
    console.log('로그인 성공:', data);

    setUserSession(data.access_token, data.refresh_token); // 토큰 쿠키에 저장

    return data;
  } catch (error) {
    console.error(' 로그인 요청 실패:', error);
  }
};

export const loginWithGoogle = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google/login/?env=frontend_local`, {
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
    alert('로그인 요청 중 문제가 발생했습니다. 다시 시도해주세요.');
  }
};

export const saveGoogleUserPhone = async (phone: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/g-phone`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(phone),
    });

    if (!response.ok) {
      throw new Error(`서버 응답 실패: ${response.status}`);
    }
  } catch (error) {
    console.error('구글 전화번호저장 오류:', error);
  }
};
