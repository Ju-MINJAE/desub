import { designerRoles } from '@/constants/about';
import { RoleDescription } from './RoleDescription';
import { motion } from 'framer-motion';

const RoleSection: React.FC = () => {
  return (
    <section className="relative">
      <span className="absolute -rotate-90 top-[108.2rem] pl-[7.7rem] text-[3rem] font-bold hidden md:block">
        about role
      </span>

      <div className="container mx-auto max-w-[140rem] pt-[5rem] md:pt-[22.6rem] px-[2rem] md:px-0">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col text-center space-y-[1rem] md:space-y-[1.6rem]"
        >
          <span className="text-[3rem] sm:text-[6rem] md:text-[9rem]">wassup?!</span>
          <span className="text-[3rem] sm:text-[6rem] md:hidden">desub is ready</span>
          <span className="text-[3rem] sm:text-[6rem] md:hidden">to join 👋 you!</span>
          <span className="text-[9rem] hidden md:block">desub is ready to join 👋 you!</span>
        </motion.div>

        <div className="grid md:grid-cols-24 pl-[2.5rem] md:pl-0">
          <div className="col-span-full md:col-start-10 md:col-span-15">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-[3rem] sm:text-[4rem] font-bold mt-[8rem] mb-[4rem] md:hidden"
            >
              about role
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] max-w-[38.5rem] mt-[3.2rem] md:mt-[14.6rem] md:ml-[11rem] font-bold"
            >
              우리는 당신의 비전을 실현하는
              <br />
              디자인 전문가 팀입니다.
            </motion.p>

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
              className="mt-[4rem] md:mt-[7.9rem]"
            >
              {designerRoles.map((role, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: 0.5,
                      },
                    },
                  }}
                >
                  <RoleDescription role={role} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleSection;
