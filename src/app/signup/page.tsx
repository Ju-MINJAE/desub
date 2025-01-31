'use client';

import { useState } from 'react';
import Heading from '../components/ui/Heading';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function SignUp() {
  const [checkboxes, setCheckboxes] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleCheckboxChange = (name: keyof typeof checkboxes) => {
    if (name === 'all') {
      const newValue = !checkboxes.all;
      setCheckboxes({
        all: newValue,
        terms: newValue,
        privacy: newValue,
        marketing: newValue,
      });
    } else {
      const newCheckboxes = {
        ...checkboxes,
        [name]: !checkboxes[name],
      };
      setCheckboxes({
        ...newCheckboxes,
        all: newCheckboxes.terms && newCheckboxes.privacy && newCheckboxes.marketing,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="w-full max-w-[98rem] flex flex-col items-center">
        <Heading tag="h1" className="mt-10 mb-16">
          join
        </Heading>

        <form className="w-full space-y-[8rem]">
          <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
            <label htmlFor="email" className="text-[3rem]">
              e-mail address
            </label>
            <Input id="email" type="email" placeholder="e-mail address" status="default" />
            <Button variant="outline" className="!w-[14rem] h-[5rem] text-[2rem]">
              가입여부 확인
            </Button>
          </div>

          <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
            <label htmlFor="password" className="text-[3rem]">
              password
            </label>
            <Input
              id="password"
              type="password"
              helperText="영문대/소문자, 숫자, 특수문자 1개 이상 포함 10자 이상"
              placeholder="password"
              status="default"
            />
          </div>

          <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
            <label htmlFor="confirm-password" className="text-[3rem]">
              confirm password
            </label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="confirm password"
              status="default"
            />
          </div>

          <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
            <label htmlFor="name" className="text-[3rem]">
              name
            </label>
            <Input id="name" type="text" placeholder="홍길동" status="default" />
          </div>

          <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
            <label htmlFor="phone" className="text-[3rem]">
              phone
            </label>
            <Input id="phone" type="tel" placeholder="010-1234-5678" status="default" />
            <Button variant="outline" className="!w-[14rem] h-[5rem] text-[2rem]">
              휴대폰 인증
            </Button>
          </div>

          <div className="flex flex-col gap-10">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="peer hidden"
                checked={checkboxes.all}
                onChange={() => handleCheckboxChange('all')}
              />
              <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
              <span className="font-bold text-[3rem]">전체 동의</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="peer hidden"
                checked={checkboxes.terms}
                onChange={() => handleCheckboxChange('terms')}
              />
              <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
              <span className="text-[3rem]">
                <u className="font-bold">이용약관</u>에 동의합니다.(필수)
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="peer hidden"
                checked={checkboxes.privacy}
                onChange={() => handleCheckboxChange('privacy')}
              />
              <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
              <span className="text-[3rem]">
                <u className="font-bold">개인정보처리방침</u>에 동의합니다.(필수)
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="peer hidden"
                checked={checkboxes.marketing}
                onChange={() => handleCheckboxChange('marketing')}
              />
              <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
              <span className="text-[3rem]">마케팅 수신에 동의합니다.(선택)</span>
            </label>
          </div>

          <div className="grid grid-cols-[20rem_auto] gap-x-8 items-start mt-16">
            <div></div>
            <Button type="submit" className="w-[54rem] h-[6.6rem] text-[2.5rem]">
              join
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
