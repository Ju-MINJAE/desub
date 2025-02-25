import { resumeSubscription } from '@/api/payment';
import { getUserSession } from '@/app/actions/serverAction';

export const handleResumeSubscription = async (plan: number) => {
  try {
    const { accessToken } = await getUserSession();
    if (!accessToken) return;

    await resumeSubscription(plan, accessToken);
  } catch (error) {
    console.error(error);
  }
};
