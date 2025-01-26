'use client';

import Heading from '@/app/components/ui/Heading';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

      <motion.div
        initial={{ y: 50, opacity: 0 }} // 애니메이션 시작 시 위치와 투명도 설정
        animate={{ y: 0, opacity: 1 }} // 애니메이션 끝 시 위치와 투명도 설정
        transition={{ duration: 0.6 }} // 애니메이션 지속 시간 설정
      >
        <h1>휙휙! 위로 넘기는 텍스트</h1>
      </motion.div>
    </div>
  );
};

export default PricingProcess;
