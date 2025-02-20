import Image from 'next/image';
import WorkingProcess from './WorkingProcess';

const UniqueProcess = () => {
  return (
    <div className="relative w-full pb-20 md:pb-[40rem] mt-[11rem] md:mt-[22.3rem]">
      <h2 className="ml-[4rem] md:ml-[13.5rem] mb-20 font-normal text-[1.8rem] md:text-[4rem] block">
        Our unique process
      </h2>
      <div className="flex justify-center items-center relative top-5 md:top-48 z-20 px-[3rem]">
        <WorkingProcess />
      </div>

      <div className="absolute right-[40%] top-[3%] md:right-[25%] md:top-0 w-[8.3rem] h-[8.8rem] md:w-[25rem] md:h-[25rem]">
        <Image src="/icons/j.svg" alt="J icon" layout="fill" objectFit="contain" />
      </div>

      <div className="absolute right-0 top-[5%] md:top-[15%] w-[14rem] h-[11rem] md:w-[41rem] md:h-[32rem]">
        <Image src="/icons/star.svg" alt="Star icon" layout="fill" objectFit="contain" />
      </div>

      <div className="absolute -left-4 top-[25%] md:top-[45%] w-[6.4rem] h-[6.4rem] md:w-[19rem] md:h-[19rem]">
        <Image src="/icons/s.svg" alt="S icon" layout="fill" objectFit="contain" />
      </div>

      <div className="flex flex-col md:items-start md:flex-row md:space-x-8 md:absolute md:left-[20%] md:-bottom-10 z-30 ml-[5.3rem] mt-[-1rem] md:mt-0">
        <div className="relative w-[15.5rem] h-[14rem] md:w-[47rem] md:h-[42rem] z-20 mb-8 md:mb-0 ml-[-1rem]">
          <Image src="/icons/w.svg" alt="W icon" layout="fill" objectFit="contain" />
        </div>

        <div className="flex flex-col space-y-8 md:pt-[18rem] md:pl-[2rem]">
          <div className="flex items-start space-x-2">
            <Image src="/icons/check_circle.svg" alt="check" width={26} height={26} />
            <p className="text-[1.6rem] md:text-[1.8rem] px-2 md:px-[1.8rem] md:leading-[2.7rem] leading-[2.4rem]">
              <span className="font-semibold block mb-[0.6rem]">Daily Work Routine</span>
              자사 직원처럼 원활한 커뮤니케이션
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <Image src="/icons/check_circle.svg" alt="check" width={26} height={26} />
            <p className="text-[1.6rem] md:text-[1.8rem] px-2 md:px-[1.8rem] md:leading-[2.7rem] leading-[2.4rem]">
              <span className="font-semibold block mb-[0.6rem]">Cycle System</span>
              구독 기간 내 자유로운 이용 가능
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueProcess;
