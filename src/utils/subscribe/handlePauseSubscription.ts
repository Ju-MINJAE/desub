import { pauseSubscription } from '@/api/payment';
import { getUserSession } from '@/app/actions/serverAction';

export const handlePauseSubscription = async (plan: number) => {
  try {
    const { accessToken } = await getUserSession();
    if (!accessToken) return;

    await pauseSubscription(plan, accessToken);
  } catch (error) {
    console.error(error);
  }
};
