'use client';

import { VIDEO_ID } from '@/constants/video';
import { motion, useScroll, useTransform } from 'framer-motion';

const BannerImage = () => {
  const { scrollY } = useScroll();
  const radius = useTransform(scrollY, [0, 300], [0, 50]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <motion.div
      className="relative w-full h-[calc(100vh-64px)] overflow-hidden"
      style={{
        borderRadius: radius,
        scale: scale,
      }}
    >
      <div className="w-full h-full overflow-hidden">
        <iframe
          id="desub_welcome_video"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&controls=0&showinfo=0&rel=0&loop=1&mute=1&playlist=${VIDEO_ID}&modestbranding=1&playsinline=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full object-cover"
          style={{
            transform: 'translate(-50%, -50%) scale(1.2, 3.2)',
          }}
        />
        <div className="absolute inset-0 z-10" />
      </div>
    </motion.div>
  );
};

export default BannerImage;
