import HeroText from './components/home/HeroText';
import Features from './components/home/Features';
import UniqueProcess from './components/home/UniqueProcess';
import Available from './components/home/Available';
import LatestWorks from './components/home/LatestWorks';
import FAQAccordion from './components/home/FAQ_Accordion';
import Promotion from './components/home/Promotion';
import Membership from './components/home/Membership';
import Contact from './components/home/Contact';
import BannerImage from './components/home/BannerImage';

const Home = () => {
  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[80vh] mb-10">
        <BannerImage />
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
