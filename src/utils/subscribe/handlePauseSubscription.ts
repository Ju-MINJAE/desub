import { pauseSubscription } from '@/api/payment';
import { getUserSession } from '@/app/actions/serverAction';

export const handlePauseSubscription = async (plan: number) => {
  try {
    const { accessToken } = await getUserSession();
    if (!accessToken) return;

    const response = await await pauseSubscription(plan, accessToken);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
