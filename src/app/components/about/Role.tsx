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
      <span className="absolute -rotate-90 top-[108.2rem] pl-[7.7rem] text-[3rem] font-bold">
        about role
      </span>
      <div className="container mx-auto max-w-[140rem] pt-[22.6rem]">
        <div className="flex flex-col text-center space-y-[1.6rem]">
          <span className="text-[9rem]">wassup?!</span>
          <span className="text-[9rem]">desub is ready to join 👋 you!</span>
        </div>
        <div className="grid md:grid-cols-24">
          <div className="col-span-full md:col-start-10 md:col-span-15">
            <p className="text-[3rem] max-w-[38.5rem] ml-[11rem] mt-[14.6rem] font-bold">
              우리는 당신의 비전을 실현하는
              <br />
              디자인 전문가 팀입니다.
            </p>

            <div className="mt-[7.9rem]">
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
