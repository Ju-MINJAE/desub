const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const findAccount = async (phone: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/find-email/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }), // 객체로 보내기
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '계정을 찾을 수 없습니다.');
    }

    console.log('계정찾기 성공:', data);
    return data;
  } catch (error) {
    console.error('계정찾기 요청 실패:', error);
    throw error;
  }
};

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/password/reset/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '임시비밀번호를 발급받는데 실패했습니다.');
    }

    return { status: response.status, data };
  } catch (error) {
    console.error('임시비밀번호 요청 실패:', error);
    throw error;
  }
};
