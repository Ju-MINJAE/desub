'use client';

import { VIDEO_ID } from '@/constants/video';
import { motion, useScroll, useTransform } from 'framer-motion';

const BannerImage = () => {
  const { scrollY } = useScroll();
  const radius = useTransform(scrollY, [0, 300], [0, 50]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.85]);

  return (
    <div className="mx-auto w-full overflow-hidden">
      <motion.div
        style={{
          borderRadius: radius,
          scale,
          transformOrigin: 'center center',
        }}
        className="relative w-full aspect-video overflow-hidden"
      >
        <iframe
          src={`https://www.youtube.com/embed/${VIDEO_ID}?&rel=0&controls=0&showinfo=0&playlist=${VIDEO_ID}&loop=1&autoplay=1&mute=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-none pointer-events-none"
        />
        {/* 투명한 오버레이로 클릭 이벤트 차단 */}
        <div className="absolute inset-0 z-10" />
      </motion.div>
    </div>
  );
};

export default BannerImage;
