'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UserProfileUpdateValue,
  UserProfileUpdateSchema,
} from '@/app/profiles/schemas/UserProfileUpdateSchema';
import { BackButton } from '@/app/components/ui/BackButton';
import { Alert } from '@/app/components/ui/Alert';
import Password from '@/app/components/myInfo/profiles/Password';
import PaymentInfo from '@/app/components/myInfo/PaymentInfo';
import ProfileDetails from '@/app/components/myInfo/profiles/ProfileDetails';
import { Button } from '@/app/components/ui/Button';
import { updateUserProfile } from '@/api/account';
import { getUserSession, clearUserSession } from '@/app/actions/serverAction';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/redux/hooks';

type ModalType = 'confirm' | 'complete' | null;

interface ModalProps {
  title: React.ReactNode;
  buttonText: string;
  size: 'normal' | 'full';
  variant: 'green' | 'outline';
  buttonType?: 'button' | 'submit';
}

const MODAL_CONFIGS: Record<Exclude<ModalType, null>, ModalProps> = {
  confirm: {
    title: <>변경사항을 저장하시겠습니까?</>,
    buttonText: '확인',
    size: 'normal',
    variant: 'green',
    buttonType: 'submit',
  },
  complete: {
    title: <p>변경사항이 저장되었습니다.</p>,
    buttonText: '확인',
    size: 'full',
    variant: 'outline',
  },
};

const MyInfo = () => {
  const userData = useAppSelector(state => state.userData);
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm<UserProfileUpdateValue>({
    resolver: zodResolver(UserProfileUpdateSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: userData?.name || '',
      image: null, // 🔥 image는 null로 초기화 (파일 업로드 시 변경)
    },
  });

  const onSubmit = async (data: UserProfileUpdateValue) => {
    try {
      const { accessToken } = await getUserSession();
      if (!accessToken) return;
      const result = await updateUserProfile(accessToken, data.name, data.image); // api 호출

      // 유저 정보 변경 성공시
      if (result.status === 200) {
      }
      // 유저 정보 변경 실패시
      if (result.status === 400) {
      }
    } catch (error) {
      console.error('비밀번호변경 실패:', error);
    }
  };
  // 현재 입력된 name 값 감시
  const currentName = watch('name');

  // 값이 변경되었는지 확인하는 함수
  const hasChanges = () => {
    return currentName !== userData?.name || !!watch('image');
  };

  // 저장버튼 클릭시 검증
  const handleValidateBeforeOpenModal = () => {
    handleSubmit(
      () => {
        setActiveModal('confirm'); // 유효성 검사 통과시 확인 모달 열기
      },
      errors => {
        console.log('Validation errors:', errors); // 에러 확인용
      },
    )();
  };

  const handleModalAction = () => {
    switch (activeModal) {
      case 'confirm':
        handleSubmit(onSubmit)();
        break;
      case 'complete':
        router.push('/');
        break;
      default:
        setActiveModal(null);
        break;
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <BackButton className="pt-[4.7rem] px-[4.7rem]" text="my info" />
        <div className="w-full flex flex-col gap-[9.5rem] items-center">
          <ProfileDetails
            register={register}
            errors={errors}
            setValue={setValue}
            trigger={trigger}
          />
          <div className="flex w-full md:w-[57.4rem] md:justify-start justify-center">
            <Password />
          </div>
          <div className="flex flex-col gap-[5rem]">
            <PaymentInfo />
          </div>
          <Button type="button" variant="black" onClick={handleValidateBeforeOpenModal}>
            변경사항 저장
          </Button>
        </div>
      </form>
      {activeModal && (
        <Alert
          buttonText={MODAL_CONFIGS[activeModal].buttonText}
          buttonType={MODAL_CONFIGS[activeModal].buttonType || 'button'}
          title={MODAL_CONFIGS[activeModal].title}
          size={MODAL_CONFIGS[activeModal].size}
          variant={MODAL_CONFIGS[activeModal].variant}
          // onClose={handleCloseModal}
          onSubmit={handleModalAction}
        />
      )}
    </>
  );
};

export default MyInfo;
