import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';

interface ResetPasswordFormProps {
  onReset?: () => void;
}

const ResetPasswordForm = ({ onReset }: ResetPasswordFormProps) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
      className="flex flex-col items-center w-[54rem]"
    >
      <Input
        helperText=""
        placeholder="e-mail address"
        status="default"
        type="email"
        className="mb-[13.2rem]"
      />
      <Button className="text-[3rem] h-[8.5rem] w-full" size="full" type="submit" variant="black">
        비밀번호 재설정
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
