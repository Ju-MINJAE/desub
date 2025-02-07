'use client';

import React from 'react';
import { BackButton } from '@/app/components/ui/BackButton';
import { useState } from 'react';
import LogoForm from '../components/workRequest/LogoForm';
import WebsiteForm from '../components/workRequest/WebsiteForm';
import PrintingForm from '../components/workRequest/printingForm';
import ProposalForm from '../components/workRequest/proposalForm';
import SnsContentsForm from '../components/workRequest/SnsContentsForm';
import UIUXForm from '../components/workRequest/UIUXForm';
import CharacterForm from '../components/workRequest/characterForm';
import EditingForm from '../components/workRequest/editingForm';
import MotionGraphicForm from '../components/workRequest/MotionGraphicForm';
import Graphic3dForm from '../components/workRequest/Graphic3dForm';

const WorkRequest: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState('logo');

  const handleWorkSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedForm(e.target.value);
  };
  console.log(selectedForm);
  const handleFormSelect = () => {
    switch (selectedForm) {
      case 'logo':
        return <LogoForm />;
      case 'website':
        return <WebsiteForm />;
      case 'printing':
        return <PrintingForm />;
      case 'proposal':
        return <ProposalForm />;
      case 'snsContents':
        return <SnsContentsForm />;
      case 'UI/UX':
        return <UIUXForm />;
      case 'character':
        return <CharacterForm />;
      case 'edting':
        return <EditingForm />;
      case 'motionGraphic':
        return <MotionGraphicForm />;
      case '3DGraphic':
        return <Graphic3dForm />;
      default:
        return <LogoForm />;
    }
  };

  return (
    <div className="h-full">
      <BackButton className="pt-[4.7rem] px-[4.7rem]" text="작업 요청하기" />
      <div className="flex flex-col items-center pt-[9.2rem] gap-[6rem] px-[13.1rem]">
        <p className="text-[5rem] font-bold">작업요청하기</p>
        <select
          id="WorkSelector"
          onChange={handleWorkSelect}
          className="w-[43.7rem] h-[4.7rem] p-[0.8rem] select_renewal input-text"
          defaultValue="text"
        >
          <option value="text" disabled>
            업무 종류를 선택하세요
          </option>
          <option value="logo">로고(logo)</option>
          <option value="website">웹사이트(website)</option>
          <option value="printing">인쇄물(printing)</option>
          <option value="proposal">제안서(proposal)</option>
          <option value="snsContents">콘텐츠(sns contents)</option>
          <option value="UI/UX">서비스 기획(UI/UX)</option>
          <option value="character">캐릭터디자인(character)</option>
          <option value="edting">영상편집(edting)</option>
          <option value="motionGraphic">모션그래픽(motion graphic)</option>
          <option value="3DGraphic">쓰리디(3D graphic)</option>
        </select>
        <div className="w-full bg-lightgray px-[6rem] py-[3rem] flex">{handleFormSelect()}</div>
      </div>
    </div>
  );
};

export default WorkRequest;
