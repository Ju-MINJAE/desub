import { Button } from '../ui/Button';

const Unsubscribed = () => {
  return (
    <div>
      <div className="flex w-[40.1rem] justify-between">
        <p className="text-[5rem] font-bold hover:underline hover:decoration-2">미구독</p>
      </div>
      <Button
        className="w-[20.9rem] h-[6rem] border border-black font-bold text-[1.8rem] mt-[6.7rem]"
        size="small"
        variant="green"
      >
        구독하기
      </Button>
    </div>
  );
};

export default Unsubscribed;
