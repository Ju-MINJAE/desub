'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const HeroText = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });

  return (
    <div ref={ref} className="mt-[7rem] md:mt-[10rem] text-center">
      <motion.div
        className="font-normal text-[1.6rem] md:text-[4rem]"
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        no more member change <br />& mis-communications!
      </motion.div>
      <motion.div
        className="mt-[2.7rem] md:mt-[1.9rem] font-bold text-[3rem] md:text-[10rem] text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
      >
        designer subscription system
      </motion.div>
    </div>
  );
};

export default HeroText;
