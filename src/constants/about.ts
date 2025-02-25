import { RoleType } from '@/types/about';
import { TeamMember } from '@/types/about';

export const designerRoles: RoleType[] = [
  {
    title: 'Design Leader',
    description:
      '디자인 전략과 방향성을 제시하며\n비즈니스 목표를 실현할 시각적 솔루션을 만듭니다.',
  },
  {
    title: 'UI/UX Designer',
    description:
      '사용자 경험을 최적화하고\n제품과 서비스가 더욱 직관적이고\n매력적으로 보이도록 설계합니다.',
  },
  {
    title: 'Brand Designer',
    description: '브랜드의 정체성을 정의하고\n일관성 있는 비주얼 시스템을 구축합니다.',
  },
  {
    title: 'Product Designer',
    description: '제품의 기능성과 미학을 통합하여\n사용자 중심의 솔루션을 제공합니다.',
  },
];

export const teamMembers: TeamMember[] = [
  {
    image: '/images/jisun.png',
    hoverImage: '/images/jisun_hover.png',
    role: 'business developer / designer',
    name: 'Sun Lee',
  },
  {
    image: '/images/jinam.png',
    hoverImage: '/images/jinam_hover.png',
    role: 'art director / product designer',
    name: 'PP Lee',
  },
  {
    image: '/images/yun.png',
    hoverImage: '/images/yun_hover.png',
    role: '2d/ 3d motion designer',
    name: 'Yun Heo',
  },
];
