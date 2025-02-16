import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/actions/serverAction';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  const { accessToken } = await getUserSession();

  if (!accessToken) {
    return NextResponse.json({ error: '엑세스 토큰이 없습니다.' }, { status: 401 });
  }

  try {
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

    const userData = await response.json();
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
