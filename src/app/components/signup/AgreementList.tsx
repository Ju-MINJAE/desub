import { AGREEMENT_ITEMS } from '@/constants/signup';
import AgreementItem from './AgreementItem';
import { useFormContext } from 'react-hook-form';
import type { SignupFormData } from '@/app/auth/schemas/SignupSchema';

export const AgreementList = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<SignupFormData>();
  const terms = watch('terms');
  const privacy = watch('privacy');
  const marketing = watch('marketing');

  const handleAllCheck = (checked: boolean) => {
    setValue('terms', checked, { shouldValidate: true });
    setValue('privacy', checked, { shouldValidate: true });
    setValue('marketing', checked, { shouldValidate: true });
  };

  const allChecked = terms && privacy && marketing;

  return (
    <div className="flex flex-col gap-10">
      <label className="flex items-center space-x-[1.7rem]">
        <input
          type="checkbox"
          className="peer hidden"
          checked={allChecked}
          onChange={e => handleAllCheck(e.target.checked)}
        />
        <span
          style={{ border: '3px solid black' }}
          className="w-[2.3rem] h-[2.3rem] rounded-sm peer-checked:bg-primary peer-checked:border-black"
        />
        <span className="font-bold text-[1.8rem]">전체 동의</span>
      </label>
      {AGREEMENT_ITEMS.map(item => (
        <div key={item.id} className="flex flex-col gap-1">
          <AgreementItem
            id={item.id}
            text={item.text}
            required={item.required}
            link={item.link}
            checked={watch(item.id) ?? false}
            onChange={checked => setValue(item.id, checked, { shouldValidate: true })}
          />
          {errors[item.id as keyof SignupFormData] && (
            <p className="mt-[0.25rem] ml-[5.3rem] text-[1.5rem] text-red">
              {errors[item.id as keyof SignupFormData]?.message}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
