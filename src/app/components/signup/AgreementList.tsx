import { AGREEMENT_ITEMS } from '@/constants/signup';
import AgreementItem from './AgreementItem';
import { useFormContext } from 'react-hook-form';
import type { SignupFormData } from '@/app/auth/schemas/SignupSchema';

export const AgreementList = () => {
  const { register, watch, setValue } = useFormContext<SignupFormData>();
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
      <label className="flex items-center space-x-[2.3rem]">
        <input
          type="checkbox"
          className="peer hidden"
          checked={allChecked}
          onChange={e => handleAllCheck(e.target.checked)}
        />
        <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black" />
        <span className="font-bold text-[3rem]">전체 동의</span>
      </label>
      {AGREEMENT_ITEMS.map((item, index) => (
        <AgreementItem
          key={item.id}
          id={item.id}
          text={item.text}
          required={item.required}
          link={item.link}
          checked={watch(item.id) ?? false}
          onChange={checked => setValue(item.id, checked, { shouldValidate: true })}
        />
      ))}
    </div>
  );
};
