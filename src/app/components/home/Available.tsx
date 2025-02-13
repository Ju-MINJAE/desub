'use client';

import { badges } from '@/constants/badges';
import Badge from '../ui/Badge';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Available = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], isMobile ? ['2%', '-5%'] : ['5%', '-10%']);

  return (
    <div ref={ref} className="w-full mt-20 px-[5rem] overflow-hidden">
      <h2 className="ml-[4rem] md:ml-[13.5rem] mb-20 font-normal text-[1.8rem] md:text-[4rem] block">
        We available for
      </h2>

      <div className="px-[2rem] md:px-[5rem]">
        <motion.div
          ref={containerRef}
          style={{ x: isMobile ? 0 : x }}
          className={`
            flex gap-[1.5rem] md:gap-[3rem] 
            ${isMobile ? 'overflow-x-auto scrollbar-hide' : 'w-max'}
          `}
        >
          {badges.map(badge => (
            <Badge
              key={badge.id}
              label={badge.label}
              variant={badge.variant}
              className="shrink-0"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Available;
