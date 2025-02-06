import { TeamMember } from '@/types/about';
import Heading from '../ui/Heading';

const MembersSection: React.FC = () => {
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
      name: 'Yun Heo',
    },
  ];

  return (
    <section className="mt-[48.4rem] mx-auto lg:mx-[21.1rem]">
      <Heading tag="h1">These people will join you</Heading>
      <p className="text-[6rem] mt-[2.5rem] font-bold">
        이 사람들과
        <br />
        함께 일하실 거에요.
      </p>

      <div className="grid grid-cols-1 gap-2 lg:flex justify-between mt-[9.3rem]">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover rounded-[4rem] max-w-[31.6rem]"
            />
            <div className="w-full max-w-[34.5rem] h-[11.9rem] mt-[3rem] border rounded-[34.5rem] flex flex-col items-center justify-center">
              <p className="text-[1.5rem] font-bold">
                {member.role}
                <br />
                {member.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembersSection;
