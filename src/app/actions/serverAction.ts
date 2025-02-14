'use server';

import { cookies } from 'next/headers';
import { fetchRefreshedToken } from '@/api/auth';

// 토큰 저장 함수
export async function setUserSession(accessToken: string, refreshToken: string) {
  cookies().set({
    name: 'access_token',
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS에서만 사용
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 30, // 30분 유지
  });

  cookies().set({
    name: 'refresh_token',
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일 유지
  });
}

// 토큰 가져오는 함수
export async function getUserSession() {
  try {
    let accessToken = cookies().get('access_token')?.value || null;
    const refreshToken = cookies().get('refresh_token')?.value || null;

    // 리프레시 토큰으로 액세스토큰 갱신
    if (!accessToken && refreshToken) {
      try {
        const refreshedToken = await fetchRefreshedToken(refreshToken);
        accessToken = refreshedToken.access_token;

        // 새 토큰 갱신
        await setUserSession(accessToken, refreshToken);
      } catch (error) {
        console.error('액세스 토큰 갱신 실패:', error);
        // 토큰 갱신 실패 시 처리 - 예: 로그아웃 처리
        return { accessToken: null, refreshToken: null };
      }
    }

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('세션 조회 실패:', error);
    throw error;
  }
}
