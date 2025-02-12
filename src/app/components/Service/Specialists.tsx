'use client';

import Image from 'next/image';
import { useState } from 'react';

const Specialists = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const items = [
    { text: 'UIUX', id: 0 },
    { text: 'E-commerce', id: 1 },
    { text: 'Branding', id: 2 },
    { text: 'Printing', id: 3 },
    { text: 'Product Design', id: 4 },
  ];

  return (
    <div className="mt-[8.8rem] relative">
      <div
        className={`w-[27.4rem] h-[19.2rem] absolute left-[calc(100%-14rem)] transition-opacity duration-500 ${
          hoverIndex === 0 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src="/images/Specialists1.png"
          alt=""
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div
        className={`w-[27.4rem] h-[28.2rem] absolute top-[15.8rem] right-[calc(100%+0.5rem)] transition-opacity duration-500 ${
          hoverIndex === 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src="/images/Specialists1.png"
          alt=""
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div
        className={`w-[31.1rem] h-[15.5rem] absolute top-[36.4rem] left-[calc(100%-5rem)] transition-opacity duration-500 ${
          hoverIndex === 2 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src="/images/Specialists1.png"
          alt=""
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div
        className={`w-[21.6rem] h-[16.9rem] absolute top-[53.7rem] right-[calc(100%-11rem)] transition-opacity duration-500 ${
          hoverIndex === 3 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src="/images/Specialists1.png"
          alt=""
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div
        className={`w-[42.6rem] h-[23.9rem] absolute top-[80.8rem] left-[calc(100%-34rem)] transition-opacity duration-500 ${
          hoverIndex === 4 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src="/images/Specialists1.png"
          alt=""
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />
      </div>

      <div className="flex flex-col items-center gap-[5.8rem] font-light text-[6rem] pt-[11.7rem]">
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
