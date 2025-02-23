import { useState, useEffect } from 'react';
import { statusSubscriptions, SubscriptionStatus } from '@/api/subscription';
import { getUserSession } from '@/app/actions/serverAction';

export const useSubStatus = () => {
  const [status, setStatus] = useState<SubscriptionStatus>('loading');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { accessToken } = await getUserSession();
        if (!accessToken) return;

        const response = await statusSubscriptions(accessToken);

        if (Array.isArray(response) && response.length > 0) {
          setStatus(response[0].sub_status);
        } else if ('error' in response) {
          setStatus('none');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    };

    getUserData();
  }, []);

  return { status };
};

export default useSubStatus;
