import { useState, useEffect } from 'react';
import { fetchUserData } from '@/api/userData';
import { UserData } from '@/types/profiles'; // UserData 타입을 가져옴

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null); // 타입 명시

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();

        if (!data) {
          console.log('사용자 구독 정보가 없습니다.');
          return;
        }

        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, []);

  return { userData };
};

export default useUserData;
