import { H1 } from '@/stories/Heading.stories';
import { TeamMember } from '@/types/about';
import Heading from '../ui/Heading';

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      image: '/images/team1.jpg',
      role: 'business developer / designer',
      name: 'Son Lee',
    },
    {
      image: '/images/team2.jpg',
      role: 'art director / product designer',
      name: 'JY lee',
    },
    {
      image: '/images/team3.jpg',
      role: '3d / motion designer',
      name: 'Yun hee',
    },
  ];

  return (
    <section className="mt-[48.4rem] ml-[22.4rem]">
      <Heading tag="h1">These people will join you</Heading>
      <p className="text-[6rem] mt-[2.5] font-bold">
        이 사람들과
        <br />
        함께 일하실 거에요.
      </p>

      <div className="grid grid-cols-3 gap-[2rem]">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="rounded-[2rem] overflow-hidden mb-[2rem]">
              <img
                src={member.image}
                alt={member.name}
                className="w-[30rem] h-[35rem] object-cover"
              />
            </div>
            <span className="text-[2rem] italic">{member.role}</span>
            <span className="text-[2.4rem] font-medium">{member.name}</span>
          </div>
        ))}
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
