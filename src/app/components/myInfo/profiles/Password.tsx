import { useState } from 'react';
import { PASSWORD_FIELDS } from '@/constants/PasswordInput';
import { Button } from '../../ui/Button';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePassword } from '@/api/account';
import { Alert } from '@/app/components/ui/Alert';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/redux/hooks';
import {
  PasswordChangeValue,
  PasswordChangeSchema,
} from '@/app/profiles/schemas/PasswordChangeSchema';
import { Input } from '@/app/components/ui/Input';
import { getUserSession, clearUserSession } from '@/app/actions/serverAction';
import { logout } from '@/store/authslice';
import { clearUserData } from '@/store/userDataSlice';

const Password = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isPasswordCompleteModalOpen, setPasswordCompleteModalOpen] = useState(false);
  const [inputTypes, setInputTypes] = useState(
    PASSWORD_FIELDS.reduce<Record<string, string>>((acc, field) => {
      acc[field.id] = 'password';
      return acc;
    }, {}),
  );
  const [visibilityIcon, setVisibilityIcon] = useState(
    PASSWORD_FIELDS.reduce<Record<string, string>>((acc, field) => {
      acc[field.id] = '/icons/visibility.svg';
      return acc;
    }, {}),
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<PasswordChangeValue>({
    resolver: zodResolver(PasswordChangeSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: PasswordChangeValue) => {
    try {
      const { accessToken } = await getUserSession();
      if (!accessToken) return;
      const result = await changePassword(
        accessToken,
        data.password,
        data.newPassword,
        data.newPassword_confirm,
      ); // api 호출

      // 비밀번호 변경 성공시
      if (result.status === 200) {
        await clearUserSession();
        dispatch(logout());
        dispatch(clearUserData());
        setPasswordModalOpen(false);
        setPasswordCompleteModalOpen(true);
      }
      // 비밀번호 변경 실패시
      if (result.status === 400) {
        if (result.current_password) {
          setError('password', { message: result.current_password });
        } else if (result.new_password) {
          setError('newPassword', { message: result.new_password });
        } else if (result.new_password_confirm) {
          setError('newPassword_confirm', { message: result.new_password_confirm });
        }
      }
    } catch (error) {
      console.error('비밀번호변경 실패:', error);
    }
  };

  const handleChangeType = (id: string) => {
    setInputTypes(prevState => ({
      ...prevState,
      [id]: prevState[id] === 'password' ? 'text' : 'password',
    }));
    setVisibilityIcon(prevState => ({
      ...prevState,
      [id]:
        prevState[id] === '/icons/visibility.svg'
          ? '/icons/invisibility.svg'
          : '/icons/visibility.svg',
    }));
  };
  const handleClosePopup = () => {
    setPasswordModalOpen(false);
    setPasswordCompleteModalOpen(false);
    reset();
  };
  const handleNavigateLogin = () => {
    router.push('/login/email'); // 로그인 페이지로이동
  };
  return (
    <>
      {isPasswordModalOpen ? (
        <>
          <Alert
            buttonText="비밀번호 변경"
            buttonType="submit"
            contents={
              <form className="flex relative px-[4.3rem]">
                <p className="text-[1.6rem] min-w-[13.9rem]">비밀번호 변경</p>
                <div className="flex flex-col gap-[1rem] w-full">
                  {PASSWORD_FIELDS.map(field => (
                    <div key={field.id} className="flex flex-col flex-1 relative">
                      <Input
                        {...register(field.id)}
                        style={{ height: '4.4rem' }}
                        className="!text-[1.6rem]"
                        type={inputTypes[field.id]}
                        placeholder={field.placeholder}
                        status={errors[field.id] ? 'error' : 'default'}
                        helperText={errors[field.id]?.message || undefined}
                      />
                      <Image
                        src={visibilityIcon[field.id]}
                        alt="비밀번호 보기"
                        width={18}
                        height={12}
                        className="absolute right-[1rem] top-[1.7rem] cursor-pointer"
                        onClick={() => handleChangeType(field.id)}
                      />
                    </div>
                  ))}
                </div>
              </form>
            }
            title={<>현재 비밀번호와 변경할 비밀번호를 입력해주세요.</>}
            size="normal"
            variant="green"
            onClose={handleClosePopup}
            onSubmit={handleSubmit(onSubmit)}
            className="min-h-[52.7rem] min-w-[74rem]"
          />
        </>
      ) : (
        <Button
          size="small"
          type="button"
          variant="outline"
          className="w-[16.2rem] h-[5.5rem] bg-white text-[1.6rem]"
          onClick={() => setPasswordModalOpen(true)}
        >
          비밀번호 변경
        </Button>
      )}
      {isPasswordCompleteModalOpen && (
        <Alert
          buttonText="확인"
          title={<p>비밀번호 변경이 완료되었습니다.</p>}
          size="full"
          variant="outline"
          onClose={handleClosePopup}
          onSubmit={handleNavigateLogin}
        />
      )}
    </>
  );
};

export default Password;
