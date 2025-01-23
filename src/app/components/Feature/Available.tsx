import { badges } from '@/app/constants/badges';
import Badge from '../ui/Badge';

const Available = () => {
  return (
    <div className="w-full px-4 md:px-[8.4375rem] mt-20">
      <h2 className="font-normal text-[2.5rem] mb-20">We available for</h2>
      <div className="flex flex-wrap gap-3">
        {badges.map(badge => (
          <Badge key={badge.id} label={badge.label} variant={badge.variant} />
        ))}
      </div>
    </div>
  );
};

export default Available;
