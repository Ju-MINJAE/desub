'use client';

import { badges } from '@/constants/badges';
import Badge from '../ui/Badge';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Available = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-10%']);

  return (
    <div ref={ref} className="w-full px-[5rem] mt-20 overflow-hidden">
      <h2 className="font-normal text-[4rem] ml-[13.5rem] block mb-20">We available for</h2>
      <motion.div ref={containerRef} style={{ x }} className="flex gap-[3rem] w-max">
        {badges.map(badge => (
          <Badge key={badge.id} label={badge.label} variant={badge.variant} />
        ))}
      </motion.div>
    </div>
  );
};

export default Available;
