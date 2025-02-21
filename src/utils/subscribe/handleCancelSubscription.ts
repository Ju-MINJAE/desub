import { cancelSubscription } from '@/api/payment';
import { SubscriptionCancelReason } from '@/types/profiles';
import { getUserSession } from '@/app/actions/serverAction';

export const handleCancelSubscription = async (id: number, reasons: SubscriptionCancelReason) => {
  try {
    const { accessToken } = await getUserSession();
    if (!accessToken) return;

    const response = await cancelSubscription(id, reasons, accessToken);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
