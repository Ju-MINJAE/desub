const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import type { SignupData } from '@/types/signup';

export const signup = async (data: SignupData) => {
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
