'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroText from './components/home/HeroText';
import Features from './components/home/Features';
import UniqueProcess from './components/home/UniqueProcess';
import Available from './components/home/Available';
import LatestWorks from './components/home/LatestWorks';
import FAQAccordion from './components/home/FAQ_Accordion';
import Promotion from './components/home/Promotion';
import Membership from './components/home/Membership';
import Contact from './components/home/Contact';

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
