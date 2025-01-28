'use client';

import Heading from '../components/ui/Heading';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function SignUp() {
  return (
    <div className="mx-auto w-[80%] px-4">
      <div className="flex flex-col items-center">
        <Heading tag="h1" className="mt-10 mb-16">
          join
        </Heading>

        <form className="w-full space-y-[10rem]">
          <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
            <label htmlFor="email" className="text-[3rem]">
              e-mail address
            </label>
            <Input id="email" type="email" placeholder="e-mail address" status="default" />
            <Button variant="outline" className="w-[14rem] h-[5rem] text-[2rem]">
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
            <Button variant="outline" className="w-[14rem] h-[5rem] text-[2rem]">
              휴대폰 인증
            </Button>
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
