'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setUserSession } from '@/app/actions/serverAction';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const isCalled = useRef(false); // API 중복 호출 방지용 useRef 추가

  useEffect(() => {
    if (!code || !API_BASE_URL || isCalled.current) return;

    isCalled.current = true; // 첫 번째 호출 이후에는 다시 실행되지 않도록 설정

    const fetchGoogleLogin = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/google/login/?env=frontend_local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();
        console.log('✅ 로그인 응답 데이터:', data);

        setUserSession(data.access_token, data.refresh_token); // 토큰 쿠키에 저장

        // 구글 첫 로그인시 핸드폰번호 인증 필수
        if (!data.phone) {
          router.push('/signup');
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('🚨 구글 로그인 오류:', error);
        alert('로그인 요청 중 문제가 발생했습니다. 다시 시도해주세요.');
        router.push('/login');
      }
    };

    fetchGoogleLogin();
  }, [code, router]);

  return <></>;
};

export default GoogleCallback;
