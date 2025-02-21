import { format } from 'date-fns';
import { useAppSelector } from '@/hooks/redux/hooks';
import { Button } from '../ui/Button';

const PaymentInfo = () => {
  const userData = useAppSelector(state => state.userData);

  const cardInfo = userData?.subscription_info;
  console.log(cardInfo);

  if (!cardInfo) {
    return null;
  }

  const formattedCardNum = cardInfo.card_number;
  const formattedPrice = cardInfo.payment_amount.toLocaleString('ko-KR');

  const formattedNextBillDate = cardInfo.next_bill_date
    ? format(new Date(cardInfo.next_bill_date), 'yyyy년 M월 d일')
    : '-';

  return (
    <div className="flex flex-col gap-[5rem] w-[57.4rem] ">
      <div className="flex items-center">
        <p className="text-[1.6rem] min-w-[13.9rem]">결제카드</p>
        <div className="flex items-center gap-[1.5rem] text-[1.6rem] font-medium">
          {/* <div className="bg-gray w-[6.9rem] h-[4.2rem] rounded-[0.3rem]"></div> */}
          <p>
            {cardInfo.card_name}&nbsp;&nbsp;
            {formattedCardNum}
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

      <Button
        size="small"
        type="button"
        variant="outline"
        className="w-[16.2rem] h-[5.5rem] bg-white text-[1.6rem]"
      >
        결제정보 변경
      </Button>
    </div>
  );
};

export default PaymentInfo;
