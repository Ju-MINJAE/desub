'use client';

import Heading from '@/app/components/ui/Heading';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BackButton } from '../ui/BackButton';
import { useRouter } from 'next/navigation';

const PricingProcess = () => {
  const [pricingText] = useState([
    'design leader',
    'UIUX designer',
    'brand designer',
    'product designer',
  ]);
  const [pricingTextCount, setPricingTextCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setPricingTextCount(prevIndex => (prevIndex + 1) % 4);
    }, 2100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-[45.274rem] mb-[30.793rem] w-[80rem] flex flex-col translate-x-[37rem]">
      <Image
        src="/icons/ellipses.svg"
        alt=""
        width={318}
        height={99.572}
        className="mb-[2.947rem]"
      />
      <Heading tag="h1">
        <div className="h-[1.2em] relative mb-[2rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={pricingTextCount}
              className="absolute"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.3,
                },
              }}
              exit={{
                opacity: 0,
                y: -20,
                transition: {
                  duration: 0.3,
                  delay: 1.5,
                },
              }}
            >
              {pricingText[pricingTextCount] + '가'}
            </motion.div>
          </AnimatePresence>
        </div>
        필요하세요?
      </Heading>
      <button>
        <Image
          src="/icons/arrow.svg"
          alt="arrow_right"
          width={401.001}
          height={1}
          className="rotate-180 mt-[7.153rem]"
          onClick={() => router.push('/pricing')}
        />
      </button>
    </div>
  );
};

export default PricingProcess;
