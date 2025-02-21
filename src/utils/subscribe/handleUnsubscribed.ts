import { requestUnsubscribed } from '@/api/payment';
import { SubscriptionCancelReason } from '@/types/profiles';
import { getUserSession } from '@/app/actions/serverAction';

export const handleUnsubscribed = async (id: number, reasons: SubscriptionCancelReason) => {
  try {
    const { accessToken } = await getUserSession();
    if (!accessToken) return;

    const response = await requestUnsubscribed(id, reasons, accessToken);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
