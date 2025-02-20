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
    <div className="flex flex-col pt-[10rem] md:pt-[22.5rem]">
      <h2 className="ml-[4rem] md:ml-[13.5rem] mb-20 font-normal text-[1.8rem] md:text-[4rem] block">
        FAQ
      </h2>
      <div className="w-full max-w-[75%] mx-auto">
        <div className="w-full h-[1px] bg-black"></div>
        <div>
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-black">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-center justify-between py-1 md:py-4"
              >
                <span className="text-[1.6rem] md:text-[3rem]">{item.question}</span>
                <div className="relative w-[3rem] h-[3rem] md:w-[6.4rem] md:h-[6.4rem]">
                  <Image
                    fill
                    sizes="(min-width: 768px) 6.4rem, 3rem"
                    alt="accordion_open_close"
                    src="/icons/chevron-down.svg"
                    className={`object-contain transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
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
                  <p className="pt-[1.1rem] md:pt-[6rem] pd-[1.1rem] md:pb-6 text-[1.4rem] md:text-[2.5rem] whitespace-pre-line">
                    {item.answer}
                  </p>
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
