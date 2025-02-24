'use client';

import { useEffect, useState } from 'react';
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
import { fetchUserData } from '@/api/userData';
import { setUserData } from '@/store/userDataSlice';
import { searchPlanId } from '@/api/payment';
import { setPlanData } from '@/store/planDataSlice';
import { useAppDispatch } from '@/hooks/redux/hooks';
import LoadingSpinner from './components/ui/LoadingSpinner';

const Home = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const planData = await searchPlanId();
        const userData = await fetchUserData();

        if (!planData) {
          console.log('구독 결제할 수 있는 상품이 없습니다.');
        }
        dispatch(setPlanData(planData));
        dispatch(setUserData(userData));
      } catch (error) {
        console.error('데이터 로딩 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

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
      <Marquee />
      <Membership />
      <div className="bg-gray w-full h-96">What is this?</div>
      <Contact />
    </div>
  );
};

export default Home;
