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

const MyInfo = () => {
  const userData = useAppSelector(state => state.userData);
  const router = useRouter();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isProfileCompleteModalOpen, SetProfileCompleteModalOpen] = useState(false);

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
        setProfileModalOpen(true); // 유효성 검사 통과시 모달 열기
      },
      errors => {
        console.log('Validation errors:', errors); // 에러 확인용
      },
    )();
  };
  const handleClosePopup = () => {
    setProfileModalOpen(false);
    SetProfileCompleteModalOpen(false);
    reset();
  };

  const handleConfirmSubmit = () => {
    SetProfileCompleteModalOpen(false); //확인 모달 닫기
    handleSubmit(onSubmit)(); // form 직접 제출 실행
  };

  const handleNavigateHome = () => {
    router.push('/'); // 홈으로 이동
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
      {/* 변경사항 저장확인 모달 */}
      {isProfileModalOpen && (
        <Alert
          buttonText="확인"
          buttonType="submit"
          title={<>변경사항을 저장하시겠습니까?</>}
          size="normal"
          variant="green"
          onClose={handleClosePopup}
          onSubmit={handleConfirmSubmit}
        />
      )}
      {/* 변경사항 저장완료 모달 */}
      {isProfileCompleteModalOpen && (
        <Alert
          buttonText="확인"
          title={<p>변경사항이 저장되었습니다.</p>}
          size="full"
          variant="outline"
          onClose={handleClosePopup}
          onSubmit={handleNavigateHome}
        />
      )}
    </>
  );
};

export default MyInfo;
