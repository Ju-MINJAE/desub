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

export const deleteAccount = async (accessToken: string, reason: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ reason }),
    });

    const data = await response.json();
    const status = response.status;

    if (!response.ok) {
      throw new Error(data.message || '계정삭제를 실패했습니다.');
    }
    // 400 에러일 경우
    if (response.status === 400) {
      return { ...data, status };
    }

    console.log('회원탈퇴 성공:', data);
    return { status, data };
  } catch (error) {
    console.error('회원탈퇴 요청 실패:', error);
    throw error;
  }
};

export const changePassword = async (
  accessToken: string,
  current_password: string,
  new_password: string,
  new_password_confirm: string,
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/password/change/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ current_password, new_password, new_password_confirm }),
    });

    const data = await response.json();
    const status = response.status;
    // 400 에러일 경우
    if (response.status === 400) {
      return { ...data, status };
    }
    if (!response.ok) {
      throw new Error(data.message || '비밀번호 변경에 실패했습니다.');
    }

    console.log(data, 'sdf');
    return { status, data };
  } catch (error) {
    console.error('비밀번호 변경 요청 실패:', error);
    throw error;
  }
};
