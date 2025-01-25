'use client';

import { motion } from 'framer-motion';
import { promotionText } from '@/constants/promotion';

const Promotion = () => {
  const marqueeVariants = {
    animate: {
      x: [-1000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 30,
          ease: 'linear',
        },
      },
    },
  };

  const repeatedText = promotionText.repeat(20);

  return (
    <div className="w-full h-[9.6rem] pt-[18rem]">
      <div className="bg-[#F3F3F3] p-8 overflow-hidden">
        <motion.div
          className="whitespace-nowrap inline-block"
          variants={marqueeVariants}
          animate="animate"
        >
          <p className="text-black text-[2.5rem] inline-block">{repeatedText}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Promotion;
