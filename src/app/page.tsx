'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroText from './components/Feature/HeroText';
import Features from './components/Feature/Features';
import UniqueProcess from './components/Feature/UniqueProcess';
import Available from './components/Feature/Available';
import LatestWorks from './components/Feature/LatestWorks';
import FAQAccordion from './components/Feature/FAQ_Accordion';
import Promotion from './components/Feature/Promotion';
import Membership from './components/Feature/Membership';
import Contact from './components/Feature/Contact';

const Home = () => {
  const { scrollY } = useScroll();
  const radius = useTransform(scrollY, [0, 300], [0, 50]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[80vh] mb-10">
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
      </div>
      <HeroText />
      <Features />
      <UniqueProcess />
      <Available />
      <LatestWorks />
      <FAQAccordion />
      <Promotion />
      <Membership />
      <div className="bg-gray w-full h-96">What is this?</div>
      <Contact />
    </div>
  );
};

export default Home;
