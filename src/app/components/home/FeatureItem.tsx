'use client';

import type React from 'react';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface FeatureItemProps {
  imageSrc: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

const FeatureItem = ({ imageSrc, title, description }: FeatureItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        ease: [0.24, 0.6, 0.39, 0.96],
      }}
    >
      <div className="relative w-[33rem] md:w-full aspect-square whitespace-pre-line">
        <Image
          src={imageSrc || '/placeholder.svg'}
          alt="desub_Feature"
          fill
          style={{ objectFit: 'contain' }}
          sizes="(min-width: 768px) 100vw, 33rem"
          priority
        />
      </div>
      <h3 className="mt-[2.7rem] md:mt-[6.2rem] text-[2.5rem] md:text-[4.5rem] font-semibold text-center">
        {title}
      </h3>
      <p className="mt-[1.5rem] md:mt-[4.3rem] px-2 text-[1.6rem] md:text-[2.5rem] text-black text-center">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureItem;
