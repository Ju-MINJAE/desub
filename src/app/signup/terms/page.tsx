'use client';

import Heading from '@/app/components/ui/Heading';

export default function Terms() {
  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="w-full max-w-[98rem] flex flex-col items-center">
        <Heading tag="h1" className="mt-[9rem] mb-[13rem]">
          이용약관
        </Heading>
        <div>이용약관 내용</div>
      </div>
    </div>
  );
}
