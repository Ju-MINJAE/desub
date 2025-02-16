import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { FindAccountSchema, FindAccountValue } from '@/app/auth/schemas/FindAccountSchema';
import { formatPhoneNumber } from '@/utils/phone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface FindAccountFormProps {
  onFindAccount?: () => void;
}

const FindAccountForm = ({ onFindAccount }: FindAccountFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FindAccountValue>({
    resolver: zodResolver(FindAccountSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FindAccountValue) => {
    console.log('계정찾기 api 호출');
  };

  const phoneNumber = watch('phone_number') || ''; // 입력 값 실시간 감지
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-[54rem]">
      <Input
        {...register('phone_number')}
        value={formatPhoneNumber(phoneNumber)} // 실시간으로 포맷 적용
        helperText={errors.phone_number?.message || ''}
        status={errors.phone_number ? 'error' : 'default'}
        placeholder="010-1234-5678"
        type="tel"
      />

      <Button
        size="default"
        type="submit"
        variant="black"
        className="mt-[12rem]"
        disabled={!isValid}
      >
        계정찾기
      </Button>
    </form>
  );
};

export default FindAccountForm;
