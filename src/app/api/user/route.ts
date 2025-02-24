import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/actions/serverAction';

export const dynamic = 'force-dynamic';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  try {
    const { accessToken, refreshToken } = await getUserSession();

    if (!accessToken) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
    }

    const response = await fetch(`${API_BASE_URL}/api/user/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401 && refreshToken) {
        return NextResponse.json(
          { error: '세션이 만료되었습니다. 다시 로그인해주세요.' },
          { status: 401 },
        );
      }

      return NextResponse.json(
        {
          error: `API 요청 실패: ${response.status}`,
          details: await response.text(),
        },
        {
          status: response.status,
        },
      );
    }

    const userData = await response.json();
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    return NextResponse.json(
      {
        error: '서버 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      },
    );
  }
}
