'use client';

import { Button } from '../ui/Button';
import Image from 'next/image';
import Unsubscription from './Unsubscription';
import { useEffect, useState } from 'react';
import { getUserSession } from '@/app/actions/serverAction';
import { statusSubscriptions } from '@/api/subscription';
import { formatDateShort, formatRemainingBillDate } from '@/utils/dateUtils';
import { handleCancelSubscription } from '@/utils/subscribe/handleCancelSubscription';
import { handleResumeSubscription } from '@/utils/subscribe/handleResumeSubscription';
import { SubscriptionCancelReason } from '@/types/profiles';
import useSubStatus from '@/hooks/useSubStatus';

const SubscriptionPaused = () => {
  const subscriptionData = useSubStatus();
  const plan = subscriptionData.status.plan;
  const [subscriptionInfo, setSubscriptionInfo] = useState<string>('');
  const [nextBillDate, setNextBillDate] = useState<string>('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (subscriptionData.status.sub_status === 'paused') {
          const { formattedDate, daysRemaining } = formatRemainingBillDate(
            subscriptionData.status.remaining_bill_date,
          );
          setSubscriptionInfo(`${formattedDate} / D-${daysRemaining}일 남음`);

          if (subscriptionData.status.next_bill_date) {
            setNextBillDate(formatDateShort(subscriptionData.status.next_bill_date));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (subscriptionData.status.sub_status === 'paused') {
      fetchStatus();
    }
  }, [subscriptionData]);

  const handleSubscriptionStatus = async (plan: number) => {
    if (plan !== null) {
      await handleResumeSubscription(plan);
      window.location.reload();
    }
  };

  const handleUnsubscribe = async (plan: number, selectedReason: SubscriptionCancelReason) => {
    await handleCancelSubscription(plan, selectedReason);
    window.location.reload();
  };

  return (
    <div>
      <div className="flex w-[40.1rem] justify-between">
        <p className="text-[5rem] font-bold">일시정지</p>
        <Button
          className="w-[14.7rem] h-[6rem] font-bold text-[1.8rem] flex justify-center items-center gap-[0.6rem]"
          size="small"
          variant="outline"
          onClick={() => plan !== null && handleSubscriptionStatus(plan)}
        >
          <Image src="/icons/play-circle.svg" alt="subscription_restart" width={24} height={24} />
          구독재개
        </Button>
      </div>
      <p className="text-[1.8rem] font-bold mt-[1.8rem]">{subscriptionInfo}</p>
      <div className="mt-[9.3rem]">
        <Unsubscription onUnsubscribe={handleUnsubscribe} nextBillDate={nextBillDate} />
      </div>
    </div>
  );
};

export default SubscriptionPaused;

// 'use client';

// import { Button } from '../ui/Button';
// import Image from 'next/image';
// import Unsubscription from './Unsubscription';
// import { useEffect, useState } from 'react';
// import { getUserSession } from '@/app/actions/serverAction';
// import { statusSubscriptions } from '@/api/subscription';
// import { formatDateShort, formatRemainingBillDate } from '@/utils/dateUtils';
// import { handleCancelSubscription } from '@/utils/subscribe/handleCancelSubscription';
// import { handleResumeSubscription } from '@/utils/subscribe/handleResumeSubscription';
// import { SubscriptionCancelReason } from '@/types/profiles';

// const SubscriptionPaused = () => {
//   const [subscriptionInfo, setSubscriptionInfo] = useState<string>('');
//   const [nextBillDate, setNextBillDate] = useState<string>('');
//   const [plan, setPlan] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const { accessToken } = await getUserSession();
//         if (!accessToken) return;
//         const response = await statusSubscriptions(accessToken);

//         if (Array.isArray(response) && response.length > 0) {
//           const subscription = response[0];

//           setPlan(subscription.plan);
//           if (subscription.sub_status === 'paused') {
//             const { formattedDate, daysRemaining } = formatRemainingBillDate(
//               subscription.remaining_bill_date,
//             );
//             setSubscriptionInfo(`${formattedDate} / D-${daysRemaining}일 남음`);

//             if (subscription.next_bill_date) {
//               setNextBillDate(formatDateShort(subscription.next_bill_date));
//             }
//           }
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchStatus();
//   }, []);

//   const handleSubscriptionStatus = async (plan: number) => {
//     await handleResumeSubscription(plan);
//     window.location.reload();
//   };

//   const handleUnsubscribe = async (
//     subscribedPlanId: number,
//     selectedReason: SubscriptionCancelReason,
//   ) => {
//     await handleCancelSubscription(subscribedPlanId, selectedReason);
//   };

//   return (
//     <div>
//       <div className="flex w-[40.1rem] justify-between">
//         <p className="text-[5rem] font-bold">일시정지</p>
//         <Button
//           className="w-[14.7rem] h-[6rem] font-bold text-[1.8rem] flex justify-center items-center gap-[0.6rem]"
//           size="small"
//           variant="outline"
//           onClick={() => plan !== null && handleSubscriptionStatus(plan)}
//         >
//           <Image src="/icons/play-circle.svg" alt="" width={24} height={24} />
//           구독재개
//         </Button>
//       </div>
//       <p className="text-[1.8rem] font-bold mt-[1.8rem]">{subscriptionInfo}</p>
//       <div className="mt-[9.3rem]">
//         <Unsubscription onUnsubscribe={handleUnsubscribe} nextBillDate={nextBillDate} />
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPaused;
