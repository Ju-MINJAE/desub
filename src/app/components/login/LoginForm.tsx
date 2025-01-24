import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import TextButton from '@/app/components/ui/TextButton';

const LoginForm = () => {
  return (
    <div className="flex flex-col justify-center items-center mb-[1.6rem] w-[40rem] mx-auto">
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
        className="flex flex-col items-center w-full"
      >
        <Input
          helperText=""
          placeholder="email address"
          status="default"
          type="email"
          className="!text-[2rem]"
        />
        <Input
          helperText="비밀번호를 다시 확인해주세요."
          placeholder="password"
          status="default"
          type="password"
          className="!text-[2rem] mt-[4.5rem]"
        />
        <TextButton href="/login/forgot" className="self-end mt-[4.5rem]">
          로그인에 문제가 있으신가요?
        </TextButton>
        <Button size="default" type="button" variant="green" className="mt-[4.5rem]">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
