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

  const response = await fetch(`${API_BASE_URL}/api/user/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export async function invalidateUserData() {
  revalidatePath('/subscription');
  revalidatePath('/myInfo');
}
