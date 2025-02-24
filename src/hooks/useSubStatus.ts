import { useState, useEffect } from 'react';
import { statusSubscriptions } from '@/api/subscription';
import { getUserSession } from '@/app/actions/serverAction';
import { initialStatus } from '@/constants/subStatus';

export const useSubStatus = () => {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { accessToken } = await getUserSession();
        if (!accessToken) return;

        const response = await statusSubscriptions(accessToken);

        if (Array.isArray(response) && response.length > 0) {
          const subscribedPlan = response[0];
          setStatus(subscribedPlan);
        } else if ('error' in response) {
          setStatus(initialStatus);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, []);

  return { status };
};

export default useSubStatus;
