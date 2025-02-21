import { format } from 'date-fns';
import { useAppSelector } from '@/hooks/redux/hooks';
import { useState } from 'react';
import { Button } from '@/app/components/ui/Button';
import { Alert } from '@/app/components/ui/Alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WithdrawalSchema, WithdrawalValue } from '@/app/auth/schemas/WithdrawalSchema';

const PaymentInfo = () => {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false); // 탈퇴 모달 열림 여부
  const userData = useAppSelector(state => state.userData);
  // 탈퇴 팝업
  const handleOpenPopup = () => {
    setIsWithdrawalModalOpen(true);
  };
  const handleClosePopup = () => {
    setIsWithdrawalModalOpen(false);
  };

  // useform
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<WithdrawalValue>({
    resolver: zodResolver(WithdrawalSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: WithdrawalValue) => {
    try {
      console.log('api 호출');
    } catch (error) {
      console.error('탈퇴사유 전송 실패', error);
    }
  };
  // 결제정보
  const cardInfo = userData?.subscription_info;
  const formattedCardNum = cardInfo?.card_number || '등록된 카드가 없습니다.';
  const formattedCardName = cardInfo?.card_name || '';
  const formattedPrice = cardInfo?.payment_amount
    ? cardInfo.payment_amount.toLocaleString('ko-KR') + '원'
    : '';
  const formattedNextBillDate = cardInfo?.next_bill_date
    ? format(new Date(cardInfo.next_bill_date), 'yyyy년 M월 d일')
    : '-';
  const formattedEmail = cardInfo ? userData?.email || '결제 이메일 없음' : null;

  const withdrawalReason = watch('reason') || '';
  return (
    <div className="flex flex-col gap-[5rem] w-full md:w-[57.4rem] ">
      <div className="flex items-center">
        <p className="text-[1.6rem] min-w-[13.9rem]">결제카드</p>
        <div className="flex items-center gap-[1.5rem] text-[1.6rem] font-medium">
          {/* <div className="bg-gray w-[6.9rem] h-[4.2rem] rounded-[0.3rem]"></div> */}
          <p>
            {formattedCardName}&nbsp;&nbsp;
            {formattedCardNum}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <p className="text-[1.6rem] min-w-[13.9rem]">다음 정기 결제일</p>
        <div className="flex items-center text-[1.6rem] font-medium">
          <p>
            {formattedNextBillDate}
            {formattedNextBillDate && formattedPrice ? '\u00A0/\u00A0' : ''}
            {formattedPrice}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <p className="text-[1.6rem] min-w-[13.9rem]">결제 이메일</p>
        <div className="w-3/4 flex items-center text-[1.6rem] font-medium">
          <p>{formattedEmail || '-'}</p>
        </div>
      </div>

      {cardInfo && (
        <Button
          size="small"
          type="button"
          variant="outline"
          className="w-[16.2rem] h-[5.5rem] bg-white text-[1.6rem]"
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

      {/* 탈퇴하기모달 */}
      {isWithdrawalModalOpen && (
        <Alert
          buttonText="작성완료"
          contents={
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="pb-[4rem] flex flex-col items-center gap-[2rem]"
            >
              <textarea
                {...register('reason')}
                className="w-full h-[20.7rem] border border-black p-[1rem]"
                value={withdrawalReason}
                placeholder="여기에 솔직한 후기를 작성해주세요."
              ></textarea>
              {errors.reason?.message && (
                <div className=" w-full">
                  <p className="text-red text-[1.6rem]">{errors.reason?.message}</p>
                </div>
              )}
            </form>
          }
          title={
            <>
              구독기간 중 언제든 리뷰를 작성하실 수 있어요.
              <br />
              작성된 리뷰는 서비스 개선에 참고하겠습니다.
            </>
          }
          size="normal"
          variant="green"
          onClose={handleClosePopup}
          onSubmit={handleSubmit(onSubmit)}
          className="w-[60rem] min-h-[60.4rem]"
        />
      )}
    </div>
  );
};

export default PaymentInfo;
