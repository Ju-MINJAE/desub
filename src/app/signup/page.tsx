import Heading from '../components/ui/Heading';
import SignupForm from '../components/signup/SignupForm';

export default function SignUp() {
  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="w-full max-w-[98rem] flex flex-col items-center">
        <Heading tag="h1" className="mt-[9rem] mb-[13rem]">
          join
        </Heading>
        <SignupForm />
      </div>
    </div>
  );
}
