import Heading from '@/app/components/ui/Heading';
import Specialists from '../components/Service/Specialists';
import PricingProcess from '../components/Service/PricingProcess';
import Image from 'next/image';

const Service = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center pt-[12.2rem] pb-[13.3rem]">
      <div className="text-left w-full max-w-[90%] mx-auto gap-[1.6rem] md:gap-14 flex flex-col">
        <Heading tag="h1">
          We specialize in the
          <br /> following areas
        </Heading>
        <div className="font-bold text-[1.8rem] md:text-[4rem]">
          이 분야 만큼은
          <br />
          우리가 스페셜리스트 입니다.
        </div>
      </div>

      <Specialists />

      <div
        id="text"
        className="w-full mt-[18rem] md:mt-[40rem] flex flex-col gap-3 md:gap-14 justify-start pl-[3.1rem] md:pl-[40rem] pr-8"
      >
        <div className="text-[3rem] md:text-[5rem]">
          And with these tools,
          <br />
          we are invincible.
        </div>
        <p className="text-[1.8rem] md:text-[3rem] font-bold">
          업무 효율에 가장 최적화된 생산성 툴을 사용하고 있습니다.
        </p>
      </div>
      <div className="mt-[7rem] md:mt-[16.8rem] relative w-full max-w-[80%]">
        <div className="relative md:flex md:justify-center md:items-center md:space-x-[30rem]">
          <Image
            src="/icons/figma.svg"
            alt="Figma_Service"
            width={82}
            height={124}
            className="w-[8.2rem] h-[12.4rem] md:w-[13.3rem] md:h-[20rem] absolute top-0 left-0 md:static"
          />
          <Image
            src="/icons/notion.svg"
            alt="Notion_Service"
            width={140}
            height={140}
            className="w-[14rem] h-[14rem] md:w-[18.3rem] md:h-[17.6rem] absolute top-[14rem] right-0 md:static"
          />
        </div>
      </div>
      <PricingProcess />
    </div>
  );
};

export default Service;
