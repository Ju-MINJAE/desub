'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const BannerImage = () => {
  const { scrollY } = useScroll();
  const radius = useTransform(scrollY, [0, 300], [0, 50]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <motion.div
      style={{
        borderRadius: radius,
        scale: scale,
        overflow: 'hidden',
        position: 'absolute',
        inset: 0,
      }}
    >
      <Image
        src="/images/desub_banner.png"
        alt="Unified Banner"
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        priority
        className="w-full"
      />
    </motion.div>
  );
};

export default BannerImage;
