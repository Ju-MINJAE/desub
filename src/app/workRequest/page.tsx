'use client';

import React from 'react';
import { BackButton } from '@/app/components/ui/BackButton';
import { useState } from 'react';
import LogoForm from '../components/workRequest/LogoForm';
import WebsiteForm from '../components/workRequest/WebsiteForm';
import PrintingForm from '../components/workRequest/PrintingForm';
import ProposalForm from '../components/workRequest/ProposalForm';
import SnsContentsForm from '../components/workRequest/SnsContentsForm';
import UIUXForm from '../components/workRequest/UIUXForm';
import CharacterForm from '../components/workRequest/CharacterForm';
import EditingForm from '../components/workRequest/EditingForm';
import MotionGraphicForm from '../components/workRequest/MotionGraphicForm';
import Graphic3dForm from '../components/workRequest/Graphic3dForm';
import Image from 'next/image';

const WorkRequest: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState('업무 종류를 선택하세요.');
  const [showWorkFormList, setShowWorkFormList] = useState(false);

  const handleWorkSelect = (item: string) => {
    setSelectedForm(item);
    setShowWorkFormList(false);
  };

  const workList = [
    '로고(logo)',
    '웹사이트(website)',
    '인쇄물(printing)',
    '제안서(proposal)',
    'SNS콘텐츠(sns contents)',
    '서비스 기획(UI/UX)',
    '캐릭터디자인(character)',
    '영상편집(editing)',
    '모션그래픽(motion graphic)',
    '쓰리디(3D graphic)',
  ];

  const handleFormSelect = () => {
    switch (selectedForm) {
      case '로고(logo)':
        return <LogoForm />;
      case '웹사이트(website)':
        return <WebsiteForm />;
      case '인쇄물(printing)':
        return <PrintingForm />;
      case '제안서(proposal)':
        return <ProposalForm />;
      case 'SNS콘텐츠(sns contents)':
        return <SnsContentsForm />;
      case '서비스 기획(UI/UX)':
        return <UIUXForm />;
      case '캐릭터디자인(character)':
        return <CharacterForm />;
      case '영상편집(editing)':
        return <EditingForm />;
      case '모션그래픽(motion graphic)':
        return <MotionGraphicForm />;
      case '쓰리디(3D graphic)':
        return <Graphic3dForm />;
      default:
        return <LogoForm />;
    }
  };
  console.log(handleFormSelect());
  return (
    <div className="h-full">
      <BackButton className="pt-[4.7rem] px-[4.7rem]" text="작업 요청하기" />
      <div className="flex flex-col items-center pt-[9.2rem] gap-[6rem] px-[13.1rem]">
        <p className="text-[5rem] font-bold">작업요청하기</p>
        <div className="flex flex-col w-[43.7rem] text-[1.6rem] relative">
          <div
            className="flex w-full h-[4.7rem] justify-between  px-[1.7rem] py-[1.2rem] cursor-pointer"
            onClick={() => setShowWorkFormList(prev => !prev)}
          >
            <p>{selectedForm}</p>
            <Image
              src="/icons/caret.svg"
              className={showWorkFormList ? '' : 'rotate-180'}
              alt="caret"
              width={24}
              height={24}
            />
          </div>
          {showWorkFormList && (
            <div className="border absolute top-full">
              {workList.map((item, index) => (
                <div
                  key={index}
                  className="bg-white w-[43.7rem] h-[4.7rem] px-[1.7rem] py-[1.2rem] cursor-pointer hover:bg-[#F9F9F9] active:bg-[#F9F9F9]"
                  onClick={() => handleWorkSelect(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full bg-lightgray px-[6rem] py-[3rem] flex">{handleFormSelect()}</div>
      </div>
    </div>
  );
};

export default WorkRequest;
