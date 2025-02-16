'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PricingTooltip = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleTooltipToggle = () => {
    setIsTooltipOpen(prev => !prev);
  };

  return (
    <span className="relative inline-flex items-center ml-2">
      <button className="font-bold underline" onClick={handleTooltipToggle}>
        dshop
      </button>
      <Image src="/icons/tooltip.svg" alt="" width={16} height={16} className="ml-2" />

      {isTooltipOpen && (
        <div className="absolute top-[-90%] right-0 transform translate-x-[97%] translate-y-[-80%] bg-black rounded-[2.3rem] text-white text-[1.5rem] px-[3.6rem] py-[3rem] min-w-[37.8rem]">
          dshop은 dbre의 design asset을 구매 가능한 온라인몰입니다. <br />
          <Link
            href="https://www.dbre.co.kr/dshop"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            dshop 바로가기
          </Link>
        </div>
      )}
    </span>
  );
};

export default PricingTooltip;
