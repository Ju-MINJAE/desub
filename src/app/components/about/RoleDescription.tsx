import { RoleType } from '@/types/about';

interface RoleProps {
  role: RoleType;
}

export const RoleDescription: React.FC<RoleProps> = ({ role }) => {
  return (
    <div className="flex items-start pb-[5.5rem]">
      <span className="font-bold text-[5rem] mr-[6.3rem]">/</span>
      <div>
        <span className="inline-flex h-[6rem] items-center justify-center px-[2.8rem] rounded-full border text-[3rem] italic bg-white">
          {role.title}
        </span>
        <span className="ml-2 mr-[6.3rem] text-[3rem] font-bold">로서,</span>
        <p className="text-[3rem] font-bold whitespace-pre-line pl-[2.4rem]">{role.description}</p>
      </div>
    </div>
  );
};
