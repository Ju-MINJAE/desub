'use client';

import Heading from '../ui/Heading';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const LatestWorks = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);

  return (
    <div className="flex flex-col overflow-hidden" ref={containerRef}>
      <Heading tag="h1" className="px-[12rem] pt-36 mb-12">
        Check our
        <br />
        Latest works
      </Heading>

      <motion.div className="flex flex-row gap-[3.6rem] pl-[12rem]" style={{ x }}>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="w-[51.3rem] h-[73.7rem] flex-shrink-0">
            <Image
              src={`/images/desub_project_${index + 1}.png`}
              alt={`Latest work ${index + 1}`}
              width={513}
              height={737}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LatestWorks;
