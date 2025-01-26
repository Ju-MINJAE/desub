'use client';

import Heading from '@/app/components/ui/Heading';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const PricingProcess = () => {
  const [pricingText] = useState([
    'design leader',
    'UIUX designer',
    'brand designer',
    'product designer',
  ]);
  const [pricingTextCount, setPricingTextCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPricingTextCount(preIndex => (preIndex + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-[45.274rem] mb-[30.793rem] w-[80rem] flex flex-col translate-x-[37rem]">
      <Image src="/icons/ellipses.svg" alt="" width={318} height={99.572} />
      <Heading tag="h1">
        <motion.div
          className="mb-[6rem] inline"
          initial={{ y: 50, opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {pricingText[pricingTextCount]}
        </motion.div>
        가
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
