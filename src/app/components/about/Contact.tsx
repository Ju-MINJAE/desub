'use client';

import type React from 'react';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  return (
    <section className="mt-[15rem] md:mt-[29.4rem] px-4 md:px-0">
      <div className="md:mx-[7rem] relative aspect-[1.91/1] md:min-w-[100rem]">
        <motion.div
          initial={{ opacity: 0, rotate: -20, y: -50 }}
          whileInView={{ opacity: 1, rotate: -13.369, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="absolute w-full md:w-[71rem] h-[15rem] top-[-50%] md:top-[-20%] right-0 md:right-[2%] bg-primary shadow-lg flex items-center z-10"
        >
          <p className="text-[2.5rem] md:text-[4rem] font-bold text-center w-full">
            wassup? desub! wassup? desub!
            <br />
            wassup? desub! wassup? desub!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/doll.png"
            alt="doll"
            fill
            className="object-cover rounded-[2rem] md:rounded-[5.4rem]"
          />
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="absolute left-[10%] md:left-[17%] top-[41%] z-20 w-[25%] aspect-square bg-[#FF009D] rounded-full flex items-center justify-center p-[6%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
        >
          <Image
            src="/icons/Union.svg"
            alt="stick"
            width={0}
            height={0}
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="absolute right-[15%] md:right-[23%] top-[22%] z-20 w-[20%] aspect-square bg-white rounded-full flex items-center justify-center p-[3%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
        >
          <Image
            src="/icons/Vector.svg"
            alt="Vector"
            width={0}
            height={0}
            className="w-full h-full"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-12 md:grid-cols-24 mt-[15rem] md:mt-[30.4rem]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.24, 0.6, 0.39, 0.96] }}
          viewport={{ once: true }}
          className="col-start-2 col-span-10 md:col-start-6 md:col-span-18 space-y-[2rem] text-[2.5rem] sm:text-[4rem] md:text-[7rem] font-bold whitespace-nowrap"
        >
          <p>
            똑같은 해답은
            <br />
            우리의 방식이 아닙니다.
            <br />
            당신과 함께
            <br />
            비범함을 디자인합니다.
          </p>
        </motion.div>
      </div>

      <motion.a
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        href="https://dbre.co.kr/"
        target="_blank"
        rel="noopener noreferrer"
        className="grid grid-cols-12 md:grid-cols-24 mt-[8rem] md:mt-[15.9rem] pb-[10rem] md:pb-[19.5rem]"
      >
        <div className="col-start-2 col-span-10 md:col-start-6 md:col-span-18 flex items-center cursor-pointer">
          <motion.button
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="w-[70%] md:w-[71rem] flex-shrink-0 bg-[#161616] text-white py-[1rem] md:py-[2rem] rounded-[2rem] md:rounded-[5.9rem] text-[2rem] md:text-[7rem] font-bold"
          >
            <span className="underline underline-offset-8 md:underline-offset-[1.5rem]">
              desub과 함께하기
            </span>
          </motion.button>
          <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
            <Image
              src="/icons/Arrow_right.svg"
              alt="arrow-right"
              width={0}
              height={0}
              className="w-[5rem] h-[5rem] md:w-[10.5rem] md:h-[10.5rem] ml-[2rem] md:ml-[5.5rem]"
            />
          </motion.div>
        </div>
      </motion.a>
    </section>
  );
};

export default ContactSection;
