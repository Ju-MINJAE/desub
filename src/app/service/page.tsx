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
    </div>
  );
};

export default Service;
