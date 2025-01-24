import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';

interface FindAccountFormProps {
  onFindAccount?: () => void;
}

const FindAccountForm = ({ onFindAccount }: FindAccountFormProps) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
      className="flex flex-col items-center w-[54rem]"
    >
      <Input
        helperText=""
        placeholder="010-1234-5678"
        status="default"
        type="tel"
        className="mb-[13.2rem]"
      />
      <Button className="text-[3rem] h-[8.5rem] w-full" size="full" type="submit" variant="black">
        계정찾기
      </Button>
    </form>
  );
};

export default FindAccountForm;
