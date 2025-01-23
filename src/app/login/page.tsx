import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import TextButton from '@/app/components/ui/TextButton';
import Image from 'next/image';

const Login = () => {
  return (
    <div className="flex justify-center items-center pb-[8.4rem] min-h-screen">
      <div className="pt-[20rem] w-1/2 text-center">
        <Heading tag="h1" className="mb-[16.8rem]">
          login
        </Heading>

        <div className="flex flex-col justify-center items-center mb-[6.7rem]">
          <Button
            className="mb-[2.9rem] flex items-center justify-center"
            size="default"
            type="button"
            variant="outline"
          >
            <span className="mr-[1rem]">
              <Image src="/icons/google.png" alt="로그인" width={20} height={20} />
            </span>
            Google Login
          </Button>
          <Button size="default" type="button" variant="outline">
            E-mail Login
          </Button>
        </div>
        <TextButton href="주소값">회원가입</TextButton>
      </div>

      <div className="relative w-1/2 h-[100vh]">
        <Image
          src="/login_intro.png"
          alt="로그인"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Login;
