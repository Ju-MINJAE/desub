import { RoleType } from '@/types/about';

interface RoleProps {
  role: RoleType;
}

export const RoleDescription: React.FC<RoleProps> = ({ role }) => {
  return (
    <div className="flex items-start pb-[4rem] md:pb-[5.5rem]">
      <span className="font-bold text-[3.5rem] md:text-[5rem] mr-[2rem] md:mr-[6.3rem]">/</span>
      <div className="flex-1">
        <div className="flex items-center flex-wrap gap-[1rem] mb-[1rem]">
          <span className="inline-flex h-[4rem] md:h-[6rem] items-center px-[2rem] md:px-[2.8rem] rounded-full border text-[1.6rem] sm:text-[2.4rem] md:text-[3rem] italic bg-white">
            {role.title}
          </span>
          <span className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] font-bold">로서,</span>
        </div>
        <p className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] font-bold whitespace-pre-line">
          {role.description}
        </p>
      </div>
    </div>
  );
};
