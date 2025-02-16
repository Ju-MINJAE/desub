'use client';

import Image from 'next/image';
import { useState } from 'react';

const items = [
  { text: 'UIUX', id: 0 },
  { text: 'E-commerce', id: 1 },
  { text: 'Branding', id: 2 },
  { text: 'Printing', id: 3 },
  { text: 'Product Design', id: 4 },
];

const Specialists = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="mt-[8.8rem] relative">
      <div
        className={`w-[17.1rem] md:w-[27.4rem] h-[13.6rem] md:h-[19.2rem] absolute left-48 md:left-[calc(100%-14rem)] transition-opacity duration-500 -z-10 ${
          hoverIndex === 0 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src="/images/Specialists1.png"
          alt="Sevice_UIUX"
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div
        className={`w-[14rem] md:w-[27.4rem] h-[13.7rem] md:h-[28.2rem] absolute top-60 md:top-[15.8rem] right-64 md:right-[calc(100%+0.5rem)] transition-opacity duration-500 -z-10 ${
          hoverIndex === 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src="/images/Specialists1.png"
          alt="Sevice_E-commerce"
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div
        className={`w-[15rem] md:w-[31.1rem] h-[8.2rem] md:h-[15.5rem] absolute top-[26rem] md:top-[36.4rem] left-52 md:left-[calc(100%-5rem)] transition-opacity duration-500 -z-10 ${
          hoverIndex === 2 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src="/images/Specialists1.png"
          alt="Sevice_Branding"
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div
        className={`w-[13.8rem] md:w-[21.6rem] h-[11.8rem] md:h-[16.9rem] absolute top-[35.5rem] md:top-[53.7rem] right-56 md:right-[calc(100%-11rem)] transition-opacity duration-500 -z-10 ${
          hoverIndex === 3 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src="/images/Specialists1.png"
          alt="Sevice_Printing"
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div
        className={`w-[17.1rem] md:w-[42.6rem] h-[10.9rem] md:h-[23.9rem] absolute top-[55rem] md:top-[80.8rem] left-40 md:left-[calc(100%-34rem)] transition-opacity duration-500 -z-10 ${
          hoverIndex === 4 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src="/images/Specialists1.png"
          alt="Sevice_Product Design"
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div className="flex flex-col items-center gap-[5.8rem] text-[3rem] md:text-[6rem] pt-[11.7rem]">
        {items.map(item => (
          <p
            key={item.id}
            className="hover:underline hover:decoration-2"
            onMouseEnter={() => setHoverIndex(item.id)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {item.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Specialists;
