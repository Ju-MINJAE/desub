'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchGooglePost } from '@/api/auth';

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';

  useEffect(() => {
    if (!code) return;
    const processGoogleLogin = async () => {
      console.log('코드', code);

      try {
        const data = await fetchGooglePost(code);
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
