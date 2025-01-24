import Image from 'next/image';
import HeroText from './components/Feature/HeroText';
import Features from './components/Feature/Features';

const Home = () => {
  return (
    <div className="flex flex-col">
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
<<<<<<< HEAD
      <UniqueProcess />
      <Available />
=======
>>>>>>> HEAD@{1}
    </div>
  );
};

export default Home;
