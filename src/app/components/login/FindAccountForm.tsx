'use client';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { FindAccountSchema, FindAccountValue } from '@/app/auth/schemas/FindAccountSchema';
import { formatPhoneNumber } from '@/utils/phone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { findAccount } from '@/api/account';
import { useRouter } from 'next/navigation';

const FindAccountForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FindAccountValue>({
    resolver: zodResolver(FindAccountSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FindAccountValue) => {
    try {
      const result = await findAccount(data.phone_number); // api 호출
      // 계정찾기 성공
      if (result && result.email) {
        // 데이터 전달
        sessionStorage.setItem(
          'foundAccount',
          JSON.stringify({
            email: result.email,
            provider: result.provider,
          }),
        );

        router.push('/login/forgot/account');
      } else {
        router.push('/login/forgot/not-account');
      }
    } catch (error) {
      console.error('계정 찾기 실패:', error);
    }
  };

  const phoneNumber = watch('phone_number') || ''; // 입력 값 실시간 감지
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center w-[28rem] md:w-[54rem]"
    >
      <Input
        {...register('phone_number')}
        value={formatPhoneNumber(phoneNumber)} // 실시간으로 포맷 적용
        helperText={errors.phone_number?.message || ''}
        status={errors.phone_number ? 'error' : 'default'}
        placeholder="010-1234-5678"
        type="tel"
      />

      <Button size="default" type="submit" variant="black" className="mt-[5rem] md:mt-[12rem]">
        계정찾기
      </Button>
    </form>
  );
};

export default FindAccountForm;
