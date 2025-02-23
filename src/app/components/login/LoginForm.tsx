'use client';

import { useState } from 'react';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { Alert } from '../ui/Alert';
import TextButton from '@/app/components/ui/TextButton';
import { loginWithEmail } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/redux/hooks';
import { loginSuccess } from '@/store/authslice';
import { setUserSession } from '@/app/actions/serverAction';
import { fetchUserData } from '@/api/userData';
import { setUserData } from '@/store/userDataSlice';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [serverErrorMsg, setSeverErrorMsg] = useState<string>('');
  const [isSignupPromptOpen, setIsSignupPromptOpen] = useState(false);
  const [isGoogleSignupAlertOpen, setIsGoogleSignupAlertOpen] = useState(false);

  const handleClosePopup = () => {
    setIsSignupPromptOpen(false);
    setIsGoogleSignupAlertOpen(false);
  };

  const handleNavigateJoin = () => {
    router.push('/signup'); // 회원가입 페이지로 이동
  };

  // 로그인 api 함수 호출
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      setSeverErrorMsg('');
      const result = await loginWithEmail(email, password);
      console.log('확인확인', result);
      if (result && result.access_token && result.refresh_token) {
        await setUserSession(result.access_token, result.refresh_token);
        dispatch(loginSuccess()); // 로그인 상태 변경

        // 로그인 완료 후 유저정보 로컬에 저장
        const userData = await fetchUserData();
        console.log('확인', userData);
        dispatch(setUserData(userData));

        router.push('/'); // 홈으로 이동
      } else {
        // 400에러 떴을때 (로그인 실패시)
        // 비밀번호 틀렸을때
        if (result.message === '비밀번호를 다시 확인해주세요.') {
          setSeverErrorMsg(result.message);
        }
        // 입력된 정보 없을때 팝업 띄우기
        if (result.message === '입력된 정보로 가입된 이력이 없습니다.') {
          setIsSignupPromptOpen(true);
        }
        // 구글로 가입한 계정일때
        if (
          result.message === '구글 소셜 로그인으로 가입된 계정입니다. 구글 로그인을 이용해주세요.'
        ) {
          setIsGoogleSignupAlertOpen(true);
        }
      }
    } catch (error) {
      console.error('🚨 로그인 실패:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-[1.6rem] w-[28rem] md:w-[40rem] mx-auto">
        <form onSubmit={onSubmit} className="flex flex-col items-center w-full">
          <Input placeholder="email address" name="email" type="email" className="!text-[2rem]" />
          <Input
            helperText={serverErrorMsg}
            placeholder="password"
            status={serverErrorMsg ? 'error' : 'default'}
            type="password"
            name="password"
            className="!text-[2rem] mt-[4.5rem]"
          />
          <TextButton href="/login/forgot" className="self-end mt-[4.5rem]">
            로그인에 문제가 있으신가요?
          </TextButton>
          <Button size="default" type="submit" variant="green" className="mt-[4.5rem]">
            login
          </Button>
        </form>
      </div>
      {isSignupPromptOpen && (
        <Alert
          buttonText="Join 하기"
          textButton="나중에 할게요"
          size="full"
          title={
            <>
              입력된 정보로 가입된 이력이 없습니다.
              <br />
              신규 멤버로 join 하시겠습니까?
            </>
          }
          variant="green"
          onClose={() => handleClosePopup()}
          onSubmit={() => handleNavigateJoin()}
        />
      )}
      {isGoogleSignupAlertOpen && (
        <Alert
          buttonText="확인"
          size="full"
          title={
            <>
              구글 소셜 로그인으로 가입된 계정입니다.
              <br />
              구글 로그인을 이용해주세요
            </>
          }
          variant="green"
          onClose={() => handleClosePopup()}
          onSubmit={() => handleClosePopup()}
        />
      )}
    </>
  );
};

export default LoginForm;
