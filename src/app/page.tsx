'use client';

import { useEffect } from 'react';
import HeroText from './components/home/HeroText';
import Features from './components/home/Features';
import UniqueProcess from './components/home/UniqueProcess';
import Available from './components/home/Available';
import LatestWorks from './components/home/LatestWorks';
import FAQAccordion from './components/home/FAQ_Accordion';
import Marquee from './components/home/Marquee';
import Membership from './components/home/Membership';
import Contact from './components/home/Contact';
import BannerImage from './components/home/BannerImage';
import { searchPlanId } from '@/api/payment';
import { setPlanData } from '@/store/planDataSlice';
import { useAppDispatch } from '@/hooks/redux/hooks';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPlanData = async () => {
      const planData = await searchPlanId();
      if (!planData) {
        console.log('구독 결제할 수 있는 상품이 없습니다.');
      }
      dispatch(setPlanData(planData));
    };
    fetchPlanData();
  }, []);

  return (
    <div className="flex flex-col">
      {/* <div className="relative w-full h-[80vh] mb-10">
        <BannerImage />
      </div> */}

      <HeroText />
      <Features />
      <UniqueProcess />
      <Available />
      <LatestWorks />
      <FAQAccordion />
      <Marquee />
      <Membership />
      <div className="bg-gray w-full h-96">What is this?</div>
      <Contact />
    </div>
  );
};

export default Home;
