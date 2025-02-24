export const WORK_LIST = [
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

export const WORK_FORM_CONFIG: FormConfig = {
  '로고(logo)': {
    query: 'w7aj16?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
    id: 'logo',
  },
  '웹사이트(website)': {
    query: 'wM6P6E?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
    id: 'website',
  },
  '인쇄물(printing)': {
    query: 'mVbqN6?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
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
  '모션그래픽(motion graphic)': {
    query: '3jJ2gR?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
    id: 'motionGraphic',
  },
  '쓰리디(3D graphic)': {
    query: 'w49dEb?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
    id: '3dGraphic',
  },
};
