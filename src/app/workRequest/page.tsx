'use client';

import React from 'react';
import { BackButton } from '@/app/components/ui/BackButton';
import Script from 'next/script';

const WorkRequest: React.FC = () => {
  return (
    <div className="h-full">
      <BackButton className="pt-[4.7rem] px-[4.7rem]" text="작업 요청하기" />
      <div className="flex flex-col items-center pt-[9.2rem] gap-[6rem] px-[13.1rem]">
        <p className="text-[5rem] font-bold">작업요청하기</p>
        <select
          id="WorkSelector"
          className="w-[43.7rem] h-[4.7rem] p-[0.8rem] select_renewal input-text"
        >
          <option value="" disabled selected>
            업무 종류를 선택하세요
          </option>
          <option value="1">로고(logo)</option>
          <option value="1">웹사이트(website)</option>
          <option value="1">인쇄물</option>
          <option value="1">SNS콘텐츠</option>
        </select>
        <div className="w-full bg-lightgray px-[6rem] py-[3rem] flex">
          <iframe
            data-tally-src="https://tally.so/embed/w7aj16?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="2344"
            title="로고(logo)"
          />
          <Script id="tally-js">
            {`
            var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
          `}
          </Script>
        </div>
      </div>
    </div>
  );
};

export default WorkRequest;
