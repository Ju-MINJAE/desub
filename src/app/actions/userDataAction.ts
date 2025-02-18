'use server';

import { revalidatePath } from 'next/cache';
import { getUserSession } from './serverAction';
import { revalidateTag } from 'next/cache';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 유저 데이터 받아오는 함수
export const fetchUserData = async () => {
  const { accessToken } = await getUserSession();

  if (!accessToken) {
    console.log('엑세스 토큰이 없습니다.');
    return;
  }

  // 유저별 캐시를 위한 고유한 키 생성 (accessToken을 기반으로)
  const cacheKey = `user-${accessToken}`;

  const response = await fetch(`${API_BASE_URL}/api/user/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    next: { tags: [cacheKey] }, // 사용자별 캐시 키로 태깅
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  // 캐시 무효화 태그 (사용자 데이터 관련 캐시만 무효화)
  revalidateTag(cacheKey);

  return data;
};

export async function invalidateUserData() {
  revalidatePath('/subscription');
  revalidatePath('/myInfo');
}
