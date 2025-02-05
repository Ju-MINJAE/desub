'use client';

import { useState } from 'react';
import Link from 'next/link';
const PricingTooltip = () => {
  const [isTooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipToggle = () => {
    setTooltipOpen(prev => !prev);
  };

  return (
    <span className="relative">
      <button className="underline tooltip" onClick={handleTooltipToggle}>
        dshop
      </button>
      {isTooltipOpen && (
        <div className="absolute top-[-90%] right-0 transform translate-x-[97%] translate-y-[-80%] bg-black rounded-[2.3rem] text-white text-[1.5rem] px-[3.6rem] py-[3rem] min-w-[37.8rem]">
          dshop은 dbre의 design asset을 구매 가능한 온라인몰입니다. <br />
          <Link href="주소값" className="underline">
            dshop 바로가기
          </Link>
        </div>
      )}
    </span>
  );
};

export default PricingTooltip;
