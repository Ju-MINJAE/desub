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
      const result = await loginWithEmail(email, password);
      setSeverErrorMsg('');
      if (result && result.access_token && result.refresh_token) {
        await setUserSession(result.access_token, result.refresh_token);
        dispatch(loginSuccess()); // 로그인 상태 변경
        router.push('/'); // 홈으로 이동
      }
      // 로그인 실패(400 에러)인 경우 처리
      if (result.status === 400) {
        if (result.error === '비밀번호를 다시 확인해주세요.') {
          setSeverErrorMsg(result.error);
        } else if (result.error === '입력된 정보로 가입된 이력이 없습니다.') {
          setIsSignupPromptOpen(true);
        } else if (result.error === '구글 소셜 로그인으로 가입된 계정입니다.') {
          setIsGoogleSignupAlertOpen(true);
        } else if (result.error === '비활성화된 계정입니다. 관리자나 고객센터에 문의해주세요.') {
          setSeverErrorMsg(result.error); // 임의처리
        }
      }
    } catch (error) {
      console.error('🚨 로그인 실패:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-[1.6rem] w-[28rem] md:w-[40rem] mx-auto">
        <form onSubmit={onSubmit} className="flex flex-col items-center w-full text-left">
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
