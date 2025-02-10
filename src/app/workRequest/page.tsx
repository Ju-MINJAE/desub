'use client';

import React from 'react';
import { BackButton } from '@/app/components/ui/BackButton';
import { useState } from 'react';
import Image from 'next/image';
import WorkForm from '../components/workRequest/WorkForm';

const WorkRequest: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState('업무 종류를 선택하세요.');
  const [showFormList, setShowFormList] = useState(false);

  const handleWorkSelect = (item: string) => {
    setSelectedForm(item);
    setShowFormList(false);
  };

  const workList = [
    '로고(logo)',
    '웹사이트(website)',
    '인쇄물(printing)',
    '제안서(proposal)',
    '콘텐츠(sns contents)',
    '서비스 기획(UI/UX)',
    '캐릭터디자인(character)',
    '영상편집(editing)',
    '모션그래픽(motion graphic)',
    '쓰리디(3D graphic)',
  ];

  type FormConfig = {
    [key: string]: { query: string; id: string };
  };

  const WORK_FORM_CONFIG: FormConfig = {
    '로고(logo)': {
      query: 'w7aj16?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
      id: 'logo',
    },
    '웹사이트(website)': {
      query: 'wM6P6E?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
      id: 'website',
    },
    '인쇄물(printing)': {
      query: 'w7aj16?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
      id: 'printing',
    },
    '제안서(proposal)': {
      query: 'wgJrgN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
      id: 'proposal',
    },
    '콘텐츠(sns contents)': {
      query: 'w8652A?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
      id: 'snsContents',
    },
    '서비스 기획(UI/UX)': {
      query: '3EZYAo?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
      id: 'UI/UX',
    },
    '캐릭터디자인(character)': {
      query: 'n9R5aG?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
      id: 'character',
    },
    '영상편집(editing)': {
      query: '3qJeg2?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
      id: 'editing',
    },
    'motio모션그래픽(motion graphic)': {
      query: '3jJ2gR?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
      id: 'motionGraphic',
    },
    '쓰리디(3D graphic)': {
      query: 'w49dEb?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
      id: '3dGraphic',
    },
  };

  return (
    <div className="h-full">
      <BackButton className="pt-[4.7rem] px-[4.7rem]" text="작업 요청하기" />
      <div className="flex flex-col items-center pt-[9.2rem] gap-[6rem] px-[13.1rem]">
        <p className="text-[5rem] font-bold">작업요청하기</p>
        <div className="flex flex-col w-[43.7rem] text-[1.6rem] relative">
          <div
            className="flex w-full h-[4.7rem] justify-between px-[1.7rem] py-[1.2rem] cursor-pointer"
            onClick={() => setShowFormList(prev => !prev)}
          >
            <p>{selectedForm}</p>
            <Image
              src="/icons/caret.svg"
              className={showFormList ? '' : 'rotate-180'}
              alt="caret"
              width={24}
              height={24}
            />
          </div>
          {showFormList && (
            <div className="border absolute top-full">
              {workList.map(item => (
                <div
                  key={item}
                  className="bg-white w-[43.7rem] h-[4.7rem] px-[1.7rem] py-[1.2rem] cursor-pointer hover:bg-[#F9F9F9] active:bg-[#F9F9F9]"
                  onClick={() => handleWorkSelect(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full bg-lightgray px-[6rem] py-[3rem] flex">
          {selectedForm === '업무 종류를 선택하세요.' ? (
            <WorkForm formConfig={WORK_FORM_CONFIG['로고(logo)']} formName={'로고(logo)'} />
          ) : (
            <WorkForm formConfig={WORK_FORM_CONFIG[selectedForm]} formName={selectedForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkRequest;
