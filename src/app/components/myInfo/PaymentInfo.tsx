import { format } from 'date-fns';
import { useAppSelector } from '@/hooks/redux/hooks';
import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/Button';
import { Alert } from '@/app/components/ui/Alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WithdrawalSchema, WithdrawalValue } from '@/app/auth/schemas/WithdrawalSchema';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/redux/hooks';
import { deleteAccount } from '@/api/account';
import { getUserSession, clearUserSession } from '@/app/actions/serverAction';
import { logout } from '@/store/authslice';
import { clearUserData } from '@/store/userDataSlice';
import useSubStatus from '@/hooks/useSubStatus';
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID!;
const CHANNEL_KEY = process.env.NEXT_PUBLIC_CHANNEL_KEY!;
import { changeCardInfo, fetchCardInfo } from '@/api/payment';
import { cardDetailInfo } from '@/types/cardInfo';

import * as PortOne from '@portone/browser-sdk/v2';

const PaymentInfo = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isWithdrawalCompleteModalOpen, setWithdrawalCompleteModalOpen] = useState(false);
  const [serverErrorMsg, setSeverErrorMsg] = useState<string>('');
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  const [mobileAlert, setMobileAlert] = useState(false);
  const [cardDetailInfo, setDetailCardInfo] = useState<cardDetailInfo | null>(null);

  const userData = useAppSelector(state => state.userData);
  const cardInfo = userData?.subscription_info;
  // 구독현황
  const subscriptionData = useSubStatus();
  const userSubStatue = subscriptionData?.status.sub_status;
  const m_redirect_url = `${window.location.origin}/pricing/subscribe`;

  useEffect(() => {
    const fetchCardData = async () => {
      const { accessToken } = await getUserSession();
      if (!accessToken) return;

      const cardInfoData = await fetchCardInfo(accessToken);
      setDetailCardInfo(cardInfoData);
    };
    fetchCardData();
  }, []);

  // 탈퇴 팝업
  const handleOpenPopup = () => {
    setIsWithdrawalModalOpen(true);
    reset();
    setSeverErrorMsg('');
  };
  const handleClosePopup = () => {
    setIsWithdrawalModalOpen(false);
    setWithdrawalCompleteModalOpen(false);
    reset();
    setSeverErrorMsg('');
  };
  const handleNavigateHome = () => {
    router.push('/'); // 홈으로 이동
  };

  // useform
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<WithdrawalValue>({
    resolver: zodResolver(WithdrawalSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: WithdrawalValue) => {
    try {
      const { accessToken } = await getUserSession();
      if (!accessToken) return;
      const result = await deleteAccount(accessToken, data.reason);
      // 탈퇴 성공시
      if (result.status === 200) {
        await clearUserSession();
        dispatch(logout());
        dispatch(clearUserData());
        setIsWithdrawalModalOpen(false);
        setWithdrawalCompleteModalOpen(true);
      }
      // 탈퇴 실패시
      if (result.status === 400) {
        setSeverErrorMsg(result.message);
      }
    } catch (error) {
      console.error('탈퇴사유 전송 실패', error);
    }
  };
  // 결제정보
  const formattedPrice = cardInfo?.payment_amount.toLocaleString('ko-KR');

  const formattedNextBillDate = cardInfo?.next_bill_date
    ? format(new Date(cardInfo.next_bill_date), 'yyyy년 M월 d일')
    : '-';

  const withdrawalReason = watch('reason') || '';

  const changePaymentDetails = async () => {
    if (isMobile) {
      setMobileAlert(true);
    }

    if (!isMobile) {
      const issueResponse = await PortOne.requestIssueBillingKey({
        storeId: STORE_ID,
        channelKey: CHANNEL_KEY,
        billingKeyMethod: 'CARD',
        issueId: `ISSUE${Date.now()}`,
        customer: {
          fullName: userData?.name,
        },
        redirectUrl: m_redirect_url,
      });

      if (!issueResponse?.billingKey) {
        console.log('로그인 후 진행해주세요.');
        return;
      }

      const { accessToken } = await getUserSession();
      if (!accessToken) return;

      const billingKey = issueResponse.billingKey;
      await changeCardInfo(billingKey, accessToken);
      window.location.reload();
    }
  };

  const handleMobileAlertClosePopup = () => {
    setMobileAlert(prev => !prev);
  };

  return (
    <>
      {/* 미구독 ,취소상태 */}
      {userSubStatue === 'none' || userSubStatue === 'cancelled' ? (
        <div>
          <button
            className="text-[1.6rem] leading-[2.4rem] font-medium underline"
            onClick={handleOpenPopup}
          >
            탈퇴하기
          </button>
        </div>
      ) : (
        <>
          {mobileAlert && (
            <Alert
              buttonText="결제하기"
              size="full"
              title="결제정보 변경은 pc에서 진행해주시기 바랍니다."
              variant="green"
              onClose={() => handleMobileAlertClosePopup()}
              onSubmit={() => handleMobileAlertClosePopup()}
            />
          )}
          <hr className="w-[70rem] border-lightgray" />
          <div className="flex flex-col gap-[5rem] w-full md:w-[57.4rem]">
            <p className="text-[2rem] font-extrabold">결제정보</p>

            <div className="flex items-center">
              <p className="text-[1.6rem] min-w-[13.9rem]">결제카드</p>
              <div className="flex items-center gap-[1.5rem] text-[1.6rem] font-medium">
                <p>
                  {cardDetailInfo?.card_name}&nbsp;&nbsp;
                  {cardDetailInfo?.card_number}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <p className="text-[1.6rem] min-w-[13.9rem]">다음 정기 결제일</p>
              <div className="flex items-center text-[1.6rem] font-medium">
                <p>
                  {formattedNextBillDate}&nbsp;/&nbsp;
                  {formattedPrice}원
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <p className="text-[1.6rem] min-w-[13.9rem]">결제 이메일</p>
              <div className="w-3/4 flex items-center text-[1.6rem] font-medium">
                <p>{userData?.email || '-'}</p>
              </div>
            </div>

            {cardInfo && (
              <Button
                size="small"
                type="button"
                variant="outline"
                className="w-[16.2rem] h-[5.5rem] bg-white text-[1.6rem]"
                onClick={changePaymentDetails}
              >
                결제정보 변경
              </Button>
            )}

            <div className="align-baseline pt-[14.3rem]">
              <button
                className="text-[1.6rem] leading-[2.4rem] font-medium underline"
                onClick={handleOpenPopup}
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </>
      )}

      {isWithdrawalModalOpen && (
        <Alert
          buttonText="탈퇴신청"
          buttonType="submit"
          contents={
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="pb-[4rem] flex flex-col items-center gap-[2rem]"
            >
              <textarea
                {...register('reason')}
                className="w-full h-[20.7rem] border border-black p-[1rem]"
                value={withdrawalReason}
                placeholder="여기에 탈퇴 사유를 작성해주세요."
              ></textarea>
              {(errors.reason?.message || serverErrorMsg) && (
                <div className=" w-full">
                  <p className="text-red text-[1.6rem]">
                    {errors.reason?.message || serverErrorMsg}
                  </p>
                </div>
              )}
            </form>
          }
          title={
            <>
              탈퇴 신청 시 구독중인 상품이 있는 경우 탈퇴가 불가합니다.
              <br />
              탈퇴 신청 후 처리까지 7영업일 이상 소요될 수 있습니다.
              <br />
              별도 문의는 고객센터를 통해 연락 부탁드립니다.
            </>
          }
          size="normal"
          variant="green"
          onClose={handleClosePopup}
          onSubmit={handleSubmit(onSubmit)}
          className="w-[60rem] min-h-[60.4rem]"
        />
      )}
      {isWithdrawalCompleteModalOpen && (
        <Alert
          buttonText="확인"
          title={<p>소중한 의견 감사합니다.</p>}
          size="full"
          variant="outline"
          onClose={handleClosePopup}
          onSubmit={handleNavigateHome}
        />
      )}
    </>
  );
};

export default PaymentInfo;
