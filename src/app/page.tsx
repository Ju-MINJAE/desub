import Image from 'next/image';
import HeroText from './components/Feature/HeroText';
import Features from './components/Feature/Features';
import UniqueProcess from './components/Feature/UniqueProcess';
import Available from './components/Feature/Available';
import LatestWorks from './components/Feature/LatestWorks';
import FAQAccordion from './components/Feature/FAQ_Accordion';
import Promotion from './components/Feature/Promotion';
import Membership from './components/Feature/Membership';
import Contact from './components/Feature/Contact';

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
      <UniqueProcess />
      <Available />
      <LatestWorks />
      <FAQAccordion />
      <Promotion />
      <Membership />
      <div className="bg-gray w-full h-96">What is this?</div>
      <Contact />
    </div>
  );
};

export default Home;
