'use client';

import Heading from '@/app/components/ui/Heading';

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="w-full max-w-[98rem] flex flex-col items-center">
        <Heading tag="h1" className="mt-[9rem] mb-[13rem]">
          개인정보처리방침
        </Heading>
        <div>개인정보처리방침 내용</div>
      </div>
    </div>
  );
}
