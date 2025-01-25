'use client';

import { useState, useRef, useEffect } from 'react';
import { faqData } from '@/constants/faq_accordion';
import Image from 'next/image';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, faqData.length);
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col pt-[22.5rem]">
      <h2 className="font-normal text-[4rem] ml-[13.5rem] block mb-20">FAQ</h2>
      <div className="w-full max-w-[75%] mx-auto">
        <div className="w-full h-[1px] bg-black mb-20"></div>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-black pb-[3.5rem]">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-center justify-between py-4 text-left text-[1.125rem]"
              >
                <span className="text-[3rem]">{item.question}</span>
                <Image
                  width={64}
                  height={64}
                  alt="q"
                  src="/icons/chevron-down.svg"
                  className={`transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                ref={el => {
                  contentRefs.current[index] = el;
                }}
                className={`grid transition-all duration-200 ${
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pt-[6rem] text-[2.5rem]">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
