'use client';

import Heading from '@/app/components/ui/Heading';
import Specialists from '../components/service/Specialists';
import PricingProcess from '../components/service/PricingProcess';
import Image from 'next/image';
import LoadingWrapper from '../components/ui/LoadingWrapper';
import { motion } from 'framer-motion';

const Service = () => {
  return (
    <LoadingWrapper>
      <div className="w-full flex flex-col justify-center items-center pt-[5rem] md:pt-[12.2rem] pb-[13.3rem]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="text-left w-full max-w-[90%] mx-auto gap-[1.6rem] md:gap-14 flex flex-col"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.24, 0.6, 0.39, 0.96],
                },
              },
            }}
          >
            <Heading tag="h1">
              We specialize in the
              <br /> following areas
            </Heading>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.24, 0.6, 0.39, 0.96],
                },
              },
            }}
            className="font-bold text-[1.8rem] md:text-[4rem]"
          >
            이 분야 만큼은
            <br />
            우리가 스페셜리스트 입니다.
          </motion.div>
        </motion.div>

        <Specialists />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          id="text"
          className="w-full mt-[18rem] md:mt-[40rem] flex flex-col gap-3 md:gap-14 justify-start pl-[3.1rem] md:pl-[40rem] pr-8"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.24, 0.6, 0.39, 0.96],
                },
              },
            }}
            className="text-[3rem] md:text-[5rem]"
          >
            And with these tools,
            <br />
            we are invincible.
          </motion.div>
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.24, 0.6, 0.39, 0.96],
                },
              },
            }}
            className="text-[1.8rem] md:text-[3rem] font-bold"
          >
            업무 효율에 가장 최적화된 생산성 툴을 사용하고 있습니다.
          </motion.p>
        </motion.div>

        <div className="mt-[7rem] md:mt-[16.8rem] relative w-full max-w-[80%]">
          <div className="relative md:flex md:justify-center md:items-center md:space-x-[30rem]">
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="w-[8.2rem] h-[12.4rem] md:w-[13.3rem] md:h-[20rem] absolute top-0 left-0 md:static"
            >
              <Image
                src="/icons/figma.svg"
                alt="Figma_Service"
                width={82}
                height={124}
                className="w-full h-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="w-[14rem] h-[14rem] md:w-[18.3rem] md:h-[17.6rem] absolute top-[14rem] right-0 md:static"
            >
              <Image
                src="/icons/notion.svg"
                alt="Notion_Service"
                width={140}
                height={140}
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
        <PricingProcess />
      </div>
    </LoadingWrapper>
  );
};

export default Service;
