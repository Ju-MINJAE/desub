import { useState } from 'react';
import { fetchUserData } from '@/app/actions/userDataAction';
import { UserData } from '@/types/profiles';

// 사용자 데이터를 가져오는 훅
export const useUserDataFetch = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUserData = async () => {
    try {
      const response = await fetchUserData();
      setUserData(response);
      console.log(userData);
    } catch (error) {
      console.error(error);
    }
  };

  return { userData, getUserData };
};
