'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleGoogleCallback } from '@/api/auth';

const GoogleCallback = () => {
  const router = useRouter();
  console.log('컴포넌트 렌더링'); // 컴포넌트가 실제로 렌더링되는지 확인

  useEffect(() => {
    const processGoogleLogin = async () => {
      console.log('구글로그인요청시작');
      try {
        const data = await handleGoogleCallback();
        console.log('로그인완료, 데이터', data);

        setTimeout(() => {
          if (data.phone) {
            console.log('✅ 전화번호 있음 → 메인 페이지로 이동');
            router.push('/');
          } else {
            console.log('⚠️ 전화번호 없음 → /signup 페이지로 이동');
            router.push('/signup');
          }
        }, 100);
      } catch (error) {
        console.error('🚨 Google 로그인 처리 중 오류:', error);
        router.push('/login');
      }
    };

    processGoogleLogin();
  }, []);

  return <div>처리중...</div>;
};

export default GoogleCallback;
