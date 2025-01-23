import { TeamMember } from '@/types/about';
import Heading from '../ui/Heading';

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      image: '/images/jisun.png',
      role: 'business developer / designer',
      name: 'Sun Lee',
    },
    {
      image: '/images/jinam.png',
      role: 'art director / product designer',
      name: 'PP Lee',
    },
    {
      image: '/images/yun.png',
      role: '2d/ 3d motion designer',
      name: 'Yun heo',
    },
  ];

  return (
    <section className="mt-[48.4rem] mx-[22.4rem]">
      <Heading tag="h1">These people will join you</Heading>
      <p className="text-[6rem] mt-[2.5rem] font-bold">
        이 사람들과
        <br />
        함께 일하실 거에요.
      </p>
      <div className="mr-[0.3rem]">
        <div className="grid gird-cols-1 lg:grid-cols-3 gap-[2rem] mt-[9.3rem]">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-[31.6rem] h-[46.7rem]">
                <img src={member.image} alt={member.name} className="w-full h-full" />
              </div>
              <div className="border rounded-[34.5rem] w-[34.5rem] h-[11.9rem] mt-[2rem] flex flex-col items-center justify-center">
                <p className="text-[1.5rem] italic mb-[1rem]">{member.role}</p>
                <p className="text-[1.5rem] font-medium">{member.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[15rem] space-y-[3rem]">
        <h3 className="text-[3rem] font-bold">our vision</h3>
        <div className="space-y-[2rem]">
          <p className="text-[2.4rem]">
            우리는
            <br />
            빠르고 유연한,
            <br />
            비전을 실현하는 디자인 팀입니다.
          </p>
          <p className="text-[2.4rem]">
            우리의 디자인 과정은
            <br />
            맞춤형이고
            <br />
            혁신적이며
            <br />
            신뢰를 기반으로 합니다.
          </p>
          <p className="text-[2.4rem]">
            뛰어난 결과물을 만드는 것을 넘어
            <br />
            당신의 비즈니스와 함께 성장하는
            <br />
            지속적이고 의미 있는 파트너십을 만들어갑니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
