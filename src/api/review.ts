'use server';

import { getUserSession } from '../app/actions/serverAction';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { Review } from '@/types/review';

// 리뷰 올리는 함수
export const postReview = async (review: Review) => {
  try {
    const { accessToken } = await getUserSession();

    if (!accessToken) {
      const error = new Error('엑세스 토큰이 없습니다.');
      console.error(error.message);
      throw error;
    }

    const reviewResponse = await fetch(`${API_BASE_URL}/api/review/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
      body: JSON.stringify(review),
    });

    if (!reviewResponse.ok) {
      const error = new Error(`HTTP error! Status: ${reviewResponse.status}`);
      console.error(error.message);
      throw error;
    }
  } catch (error) {
    console.error('리뷰 제출 중 오류 발생:', error);
    throw error;
  }
};
