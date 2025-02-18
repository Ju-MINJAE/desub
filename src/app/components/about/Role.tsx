import { RoleType } from '@/types/about';
import { RoleDescription } from './RoleDescription';

const designerRoles: RoleType[] = [
  {
    title: 'Design Leader',
    description:
      '디자인 전략과 방향성을 제시하며\n비즈니스 목표를 실현할 시각적 솔루션을 만듭니다.',
  },
  {
    title: 'UI/UX Designer',
    description:
      '사용자 경험을 최적화하고\n제품과 서비스가 더욱 직관적이고\n매력적으로 보이도록 설계합니다.',
  },
  {
    title: 'Brand Designer',
    description: '브랜드의 정체성을 정의하고\n일관성 있는 비주얼 시스템을 구축합니다.',
  },
  {
    title: 'Product Designer',
    description: '제품의 기능성과 미학을 통합하여\n사용자 중심의 솔루션을 제공합니다.',
  },
];

const RoleSection: React.FC = () => {
  return (
    <section className="relative">
      <span className="absolute -rotate-90 top-[108.2rem] pl-[7.7rem] text-[3rem] font-bold hidden md:block">
        about role
      </span>

      <div className="container mx-auto max-w-[140rem] pt-[22.6rem] px-[2rem] md:px-0">
        <div className="flex flex-col text-center space-y-[1rem] md:space-y-[1.6rem]">
          <span className="text-[3rem] sm:text-[6rem] md:text-[9rem]">wassup?!</span>
          <span className="text-[3rem] sm:text-[6rem] md:hidden">desub is ready</span>
          <span className="text-[3rem] sm:text-[6rem] md:hidden">to join 👋 you!</span>
          <span className="text-[9rem] hidden md:block">desub is ready to join 👋 you!</span>
        </div>

        <div className="grid md:grid-cols-24 pl-[2.5rem] md:pl-0">
          <div className="col-span-full md:col-start-10 md:col-span-15">
            <h3 className="text-[3rem] sm:text-[4rem] font-bold mt-[8rem] mb-[4rem] md:hidden">
              about role
            </h3>

            <p className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] max-w-[38.5rem] mt-[3.2rem] md:mt-[14.6rem] md:ml-[11rem] font-bold">
              우리는 당신의 비전을 실현하는
              <br />
              디자인 전문가 팀입니다.
            </p>

            <div className="mt-[4rem] md:mt-[7.9rem]">
              {designerRoles.map((role, index) => (
                <RoleDescription key={index} role={role} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleSection;
