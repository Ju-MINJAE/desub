import { resumeSubscription } from '@/api/payment';
import { getUserSession } from '@/app/actions/serverAction';

export const handleResumeSubscription = async (plan: number) => {
  try {
    const { accessToken } = await getUserSession();
    if (!accessToken) return;

    const response = await await resumeSubscription(plan, accessToken);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
