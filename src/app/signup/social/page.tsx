'use client';

import { useState } from 'react';
import Heading from '@/app/components/ui/Heading';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';

export default function Social() {
  const [isAuthFieldVisible, setIsAuthFieldVisible] = useState(false);

  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="w-full max-w-[98rem] flex flex-col items-center">
        <Heading tag="h1" className="mt-[9rem] mb-[13rem]">
          join
        </Heading>

        {/* ✅ 전화번호 입력 + 인증 버튼 */}
        <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
          <label className="text-[3rem]">phone</label>
          <Input type="tel" placeholder="010-1234-5678" />
          <Button
            type="button"
            variant="outline"
            className="!w-[14rem] h-[5rem] text-[2rem]"
            onClick={() => setIsAuthFieldVisible(true)} // ✅ 버튼 클릭 시 인증 필드 보이기
          >
            휴대폰 인증
          </Button>
        </div>

        {/* ✅ 인증번호 입력 필드 (버튼 클릭 시 나타남) */}
        {isAuthFieldVisible && (
          <div className="!mt-[3rem] grid grid-cols-[54rem_14rem] gap-x-8">
            <Input type="text" placeholder="인증번호 입력" />
            <Button type="button" variant="outline" className="!w-[14rem] h-[5rem] text-[2rem]">
              확인
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
