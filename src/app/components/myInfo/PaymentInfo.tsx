import { Button } from '../ui/Button';

const PaymentInfo = () => {
  const exampleData = {
    card: {
      img: '',
      cardIssuer: '현대카드',
      carNum: '1234123412341234',
    },
    recurringPaymentDate: {
      date: '2026년 3월 10일',
      price: 1250000,
    },
    billingEmail: 'gildong.hong@gmail.com',
  };

  const formattedCardNum = `${exampleData.card.carNum.slice(0, 4)} **** **** ****`;

  const formattedPrice = exampleData.recurringPaymentDate.price.toLocaleString('ko-KR');

  return (
    <div className="flex flex-col gap-[5rem]">
      <div className="flex justify-between items-center ml-[2rem]">
        <p className="text-[1.6rem]">결제카드</p>
        <div className="w-3/4 flex items-center gap-[1.5rem] text-[1.6rem] font-medium">
          <div className="bg-gray w-[6.9rem] h-[4.2rem] rounded-[0.3rem]"></div>
          <p>
            {exampleData.card.cardIssuer}&nbsp;&nbsp;
            {formattedCardNum}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center ml-[2rem]">
        <p className="text-[1.6rem]">다음 정기 결제일</p>
        <div className="w-3/4 flex items-center text-[1.6rem] font-medium">
          <p>
            {exampleData.recurringPaymentDate.date}&nbsp;/&nbsp;
            {formattedPrice}원
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center ml-[2rem]">
        <p className="text-[1.6rem]">결제 이메일</p>
        <div className="w-3/4 flex items-center text-[1.6rem] font-medium">
          <p>{exampleData.billingEmail}</p>
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
