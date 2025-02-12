const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import type { SignupData } from '@/types/signup';

export const signUp = async (data: SignupData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/signup/`, {
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

export const fetchGooglePost = async (code: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google/login/?env=frontend_local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error(`서버 응답 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('구글 로그인 오류:', error);
    alert('로그인 요청 중 문제가 발생했습니다. 다시 시도해주세요.');
  }
};
