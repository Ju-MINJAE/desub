'use server';

import { cookies } from 'next/headers';

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
  const accessToken = cookies().get('access_token')?.value || null;
  const refreshToken = cookies().get('refresh_token')?.value || null;

  if (!accessToken) {
    return { accessToken: null, refreshToken };
  }

  return { accessToken, refreshToken };
}
