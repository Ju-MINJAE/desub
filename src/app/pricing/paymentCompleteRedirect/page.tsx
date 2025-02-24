'use client';

import { useState, useEffect } from 'react';
import { BackButton } from '@/app/components/ui/BackButton';
import { Button } from '@/app/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Heading from '@/app/components/ui/Heading';

const PaymentCompleteRedirect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get('data')
    ? JSON.parse(decodeURIComponent(searchParams.get('data')!))
    : null;
  const [paymentFailure, setPaymentFailure] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (data.sub_status > 400) {
      setPaymentFailure(true);
      setMessage(data.error);
    }
    if (data.message === '정기 결제 및 다음 결제 예약 성공') {
      setMessage('구독이 완료되었습니다.');
    }
    if (data.error === '이미 Plans object (1)에 구독중입니다.') {
      setMessage('이미 구독중입니다.');
    }
  }, []);

  const handlePaymentRedirect = () => {
    router.push('/pricing/subscribe');
  };

  const handleSubscriptionRedirect = () => {
    router.push('/subscription');
  };

  return (
    <div className="h-full">
      <div className="pt-[4.7rem] pl-[4.7rem]">
        <BackButton text="Subscribe" />
      </div>
      {paymentFailure ? (
        <>
          <div className="h-[80vh] flex flex-col justify-center items-center">
            <Heading>결제가 실패했습니다.</Heading>
            <p className="text-[2rem] mt-[7rem]">결제 화면으로 돌아가서 다시 시도해주세요.</p>
            <p className="text-[2rem] mt-[4rem]">{message}</p>
            <Button
              variant="black"
              type="button"
              className="text-[1.6rem] mt-[18rem]"
              onClick={handlePaymentRedirect}
            >
              결제화면으로 이동
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="h-[80vh] flex flex-col justify-center items-center">
            <p className="text-[3rem] font-extrabold">{message}</p>
            <Button
              variant="green"
              type="button"
              className="text-[1.6rem] mt-[4.5rem]"
              onClick={handleSubscriptionRedirect}
            >
              My subscription 확인하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentCompleteRedirect;
