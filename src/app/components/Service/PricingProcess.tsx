import Heading from '@/app/components/ui/Heading';
import Image from 'next/image';

const PricingProcess = () => {
  return (
    <div className="mt-[45.274rem] mb-[30.793rem] flex flex-col gap-[2.947rem] translate-x-[37rem]">
      <Image src="/icons/ellipses.svg" alt="" width={318} height={99.572} />
      <Heading tag="h1">
        design leader 가
        <br />
        필요하세요?
      </Heading>
      <Image
        src="/icons/arrow.svg"
        alt="arrow_right"
        width={401.001}
        height={1}
        className="rotate-180 mt-[7.153rem]"
      />
    </div>
  );
};

export default PricingProcess;
