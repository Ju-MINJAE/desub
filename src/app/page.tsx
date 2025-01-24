import Image from 'next/image';
import HeroText from './components/Feature/HeroText';
import Features from './components/Feature/Features';
import { Alert } from './components/ui/Alert';

const Home = () => {
  return (
    <div className="flex flex-col">
      <Alert
        buttonText="Click Me"
        childrenBottom="This is a green alert message."
        childrenTop="Green Alert Top"
        size="full"
        variant="green"
      />

      <div className="relative w-full pt-[56.25%]">
        <Image
          src="/images/desub_banner.png"
          alt="Desub Banner"
          layout="fill"
          sizes="100vw"
          style={{
            objectFit: 'contain',
            objectPosition: 'top',
          }}
          priority
        />
      </div>
      <HeroText />
      <Features />
    </div>
  );
};

export default Home;
