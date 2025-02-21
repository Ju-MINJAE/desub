'use client';

import Heading from '@/app/components/ui/Heading';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-end w-full mt-[45.274rem]">
      <div className="flex flex-col items-start pr-[8rem] md:pr-[15rem]">
        <Image
          src="/icons/ellipses.svg"
          alt="Ellipses_Service"
          width={318}
          height={99}
          className="mb-[1rem] md:mb-[2.9rem] w-[11rem] md:w-[35rem] h-auto"
        />
        <Heading tag="h1" className="flex flex-col items-start">
          <div className="min-h-[1.5em] md:min-h-[1.2em] relative mb-[1rem] md:mb-[2rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={pricingTextCount}
                className="absolute left-0 text-[2rem] md:text-[5rem] whitespace-nowrap"
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
          <span className="text-[2rem] md:text-[5rem]">필요하세요?</span>
        </Heading>
        <button className="mt-[2rem] md:mt-[7rem]">
          <Image
            src="/icons/arrow.svg"
            alt="arrow_right"
            width={40} // Update to match SVG's actual width
            height={40} // Update to match SVG's actual height
            className="h-auto w-[14rem] md:w-[40rem] rotate-180"
            onClick={() => router.push('/pricing')}
          />
        </button>
      </div>
    </div>
  );
};

export default PricingProcess;
