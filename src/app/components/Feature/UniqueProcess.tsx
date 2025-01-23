import Image from 'next/image';
import WorkingProcess from './WorkingProcess';

const UniqueProcess = () => {
  return (
    <div className="relative w-full pb-[40rem] mt-[22.3rem]">
      <h2 className="font-normal text-[2.5rem] ml-[13.5rem] mb-20">Our unique process</h2>
      <div className="flex justify-center items-center relative top-48 z-20">
        <WorkingProcess />
      </div>
      <div className="absolute right-[25%] top-0">
        <Image src="/icons/j.svg" alt="J icon" width={250} height={250} />
      </div>
      <div className="absolute right-0 top-[15%]">
        <Image src="/icons/star.svg" alt="Star icon" width={410} height={320} />
      </div>
      <div className="absolute left-[5%] top-[45%]">
        <Image src="/icons/s.svg" alt="S icon" width={190} height={190} />
      </div>

      <div className="flex items-start space-x-8 absolute left-[20%] -bottom-10 z-30">
        <Image src="/icons/w.svg" alt="W icon" width={470} height={420} />
        <div className="flex flex-col space-y-8 pt-[18rem] pl-[2rem]">
          <div className="flex items-start space-x-2">
            <Image src="/icons/check.svg" alt="check" width={26} height={26} className="mt-1" />
            <span className="text-[1.8rem] px-[1.8rem]">
              <span className="text-[1.8rem] font-semibold">Daily Work Routine</span>
              <br />
              자사 직원처럼 원활한 커뮤니케이션
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <Image src="/icons/check.svg" alt="check" width={26} height={26} className="mt-1" />
            <span className="text-[1.8rem] px-[1.8rem]">
              <span className="text-[1.8rem] font-semibold">Cycle System</span>
              <br />
              구독 기간 내 자유로운 이용 가능
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueProcess;
