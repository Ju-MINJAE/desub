import { useState } from 'react';

const UnsubscribeModalContents = () => {
  const [etc, setEtc] = useState(false);
  console.log(etc);
  return (
    <>
      <div className="w-full h-[40rem] pt-[4rem] gap-[1.5rem] flex flex-col">
        <div className="flex flex-col gap-2">
          <label className="flex items-center space-x-[2.3rem]">
            <input type="checkbox" className="peer hidden" />
            <span className="w-10 h-10 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
            <span className="text-[2rem]">가격이 비싸서</span>
          </label>
          <label className="flex items-center space-x-[2.3rem]">
            <input type="checkbox" className="peer hidden" />
            <span className="w-10 h-10 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
            <span className="text-[2rem]">퀄리티가 마음에 들지 않아서</span>
          </label>
          <label className="flex items-center space-x-[2.3rem]">
            <input type="checkbox" className="peer hidden" />
            <span className="w-10 h-10 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
            <span className="text-[2rem]">소통이 느려서</span>
          </label>
          <label className="flex items-center space-x-[2.3rem]">
            <input type="checkbox" className="peer hidden" />
            <span className="w-10 h-10 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
            <span className="text-[2rem]">정직원을 구하는 것이 더 편해서</span>
          </label>
          <label className="flex items-center space-x-[2.3rem]">
            <input type="checkbox" className="peer hidden" />
            <span className="w-10 h-10 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
            <span className="text-[2rem]">회사예산이 줄어들어서</span>
          </label>
          <label className="flex items-center space-x-[2.3rem]">
            <input type="checkbox" className="peer hidden" />
            <span
              onClick={() => setEtc(prev => !prev)}
              className="w-10 h-10 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"
            ></span>
            <span className="text-[2rem]">기타</span>
          </label>
        </div>

        {etc && (
          <textarea
            className="w-full h-[10rem] border border-black p-[1rem]"
            placeholder="여기에 구독취소 사유를 작성해주세요."
          ></textarea>
        )}
      </div>
    </>
  );
};

export default UnsubscribeModalContents;
