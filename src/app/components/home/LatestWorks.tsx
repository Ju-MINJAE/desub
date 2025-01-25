import Heading from '../ui/Heading';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const LatestWorks = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <div className="flex flex-col overflow-hidden" ref={containerRef}>
      <Heading tag="h1" className="px-[12rem] pt-36 mb-12">
        Check our
        <br />
        Latest works
      </Heading>

      <motion.div className="flex flex-row gap-12 pl-[12rem]" style={{ x }}>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-[51.3rem] h-[73.7rem] rounded-[4.6rem] bg-slate-300 flex-shrink-0"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LatestWorks;
