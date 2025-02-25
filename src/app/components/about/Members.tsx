'use client';

import type React from 'react';
import Heading from '../ui/Heading';
import { useState } from 'react';
import Image from 'next/image';
import { teamMembers } from '@/constants/about';
import { motion } from 'framer-motion';

const MembersSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="mt-[23.4rem] md:mt-[48.4rem] mx-auto md:mx-[21.1rem]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Heading tag="h1" className="pl-[4.5rem] sm:text-[4.5rem] md:pl-0">
          These people will join you
        </Heading>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-[2.4rem] sm:text-[4rem] md:text-[6rem] pl-[4.5rem] md:pl-0 mt-[2.5rem] font-bold"
      >
        이 사람들과
        <br />
        함께 일하실 거에요.
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="grid grid-cols-1 gap-[9rem] lg:gap-2 lg:flex justify-between mt-[9.3rem]"
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.24, 0.6, 0.39, 0.96],
                },
              },
            }}
            className="flex flex-col items-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              animate={{
                scale: hoveredIndex === index ? 1.02 : 1,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            >
              <Image
                src={hoveredIndex === index ? member.hoverImage : member.image}
                alt={member.name}
                width={510}
                height={510}
                quality={75}
                className="rounded-[4rem]"
                style={{
                  maxWidth: '31.6rem',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: hoveredIndex === index ? -5 : 0,
              }}
              transition={{
                duration: 0.3,
                delay: 0.1,
              }}
              className="w-full max-w-[34.5rem] h-[11.9rem] mt-[3rem] border rounded-[34.5rem] flex flex-col items-center justify-center"
            >
              <p className="text-[1.5rem] font-bold">
                {member.role}
                <br />
                {member.name}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default MembersSection;
