'use client';

import type React from 'react';
import { motion } from 'framer-motion';

const VisionSection: React.FC = () => {
  return (
    <section className="relative mt-[13.6rem] md:mt-[28.35rem] mx-auto lg:mx-[11.1rem] pl-[4.5rem] md:pl-0">
      <div className="flex text-[1.8rem] sm:text-[2.4rem] md:text-[3rem]">
        <div className="hidden md:block relative w-[8rem]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute"
            style={{
              transformOrigin: 'left top',
              transform: 'rotate(-90deg) translateX(-100%)',
              top: '15rem',
              whiteSpace: 'nowrap',
            }}
          >
            <span className="text-[3rem] font-bold">our vision</span>
          </motion.div>
        </div>
        <div className="space-y-[3rem] font-bold">
          <h3 className="text-[3rem] sm:text-[4rem] font-bold mt-[8rem] mb-[4rem] md:hidden">
            our vision
          </h3>

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
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.24, 0.6, 0.39, 0.96],
                  },
                },
              }}
            >
              우리는
              <br />
              빠르고 유연한,
              <br />
              비전을 실현하는 디자이너 팀입니다.
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.24, 0.6, 0.39, 0.96],
                  },
                },
              }}
            >
              우리의 디자인 과정은
              <br />
              맞춤형이고
              <br />
              역동적이며
              <br />
              신뢰를 기반으로 합니다.
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.24, 0.6, 0.39, 0.96],
                  },
                },
              }}
            >
              뛰어난 결과물을 만드는 것을 넘어
              <br />
              당신의 비즈니스와 함께 성장하는
              <br />
              지속적이고 의미 있는 파트너십을 만들어갑니다.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
