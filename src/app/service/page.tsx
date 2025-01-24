import Heading from '@/app/components/ui/Heading';
import Specialists from '../components/Service/Specialists';

const Service = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center pt-[12.2rem] pb-[13.3rem]">
      <div className="text-left w-full max-w-[90%] mx-auto gap-14 flex flex-col">
        <Heading tag="h1">
          We specialize in the
          <br /> following areas
        </Heading>
        <div className="font-extrabold text-[4rem] ">
          이 분야 만큼은
          <br />
          우리가 스페셜리스트 입니다.
        </div>
      </div>
      <Specialists />
      <div className="mt-[40rem] flex flex-col gap-14">
        <div className="font-light text-[5rem] ">
          And with these tools,
          <br />
          we are invincible.
        </div>
        <Heading tag="h2" className="mb-[4.8rem] font-extrabold">
          업무 효율에 가장 최적화된 생산성 툴을 사용하고 있습니다.
        </Heading>
      </div>
    </div>
  );
};

export default Service;
