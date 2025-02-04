import { useState, useEffect } from 'react';
import { UseFormSetValue, UseFormWatch, FieldErrors, UseFormTrigger } from 'react-hook-form';
import { SignupFormData } from '../app/auth/schemas/SignupSchema';

export const useCheckboxValidation = (
  watch: UseFormWatch<SignupFormData>,
  setValue: UseFormSetValue<SignupFormData>,
  trigger: UseFormTrigger<SignupFormData>,
  errors: FieldErrors<SignupFormData>,
) => {
  const [checkboxes, setCheckboxes] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (name: keyof typeof checkboxes) => {
    if (name === 'all') {
      const newValue = !checkboxes.all;
      setCheckboxes({
        all: newValue,
        terms: newValue,
        privacy: newValue,
        marketing: newValue,
      });

      // 폼 값 업데이트
      setValue('terms', newValue, { shouldValidate: true });
      setValue('privacy', newValue, { shouldValidate: true });
      setValue('marketing', newValue, { shouldValidate: true });
      trigger(['terms', 'privacy']);
    } else {
      const newCheckboxes = {
        ...checkboxes,
        [name]: !checkboxes[name],
      };

      // 모든 체크박스가 선택되었는지 확인
      newCheckboxes.all = newCheckboxes.terms && newCheckboxes.privacy && newCheckboxes.marketing;

      setCheckboxes(newCheckboxes);
      setValue(name, newCheckboxes[name], { shouldValidate: true });
      trigger(name);
    }
  };

  // 폼 상태와 체크박스 상태 동기화
  useEffect(() => {
    const termsChecked = watch('terms') ?? false; // 기본값 false
    const privacyChecked = watch('privacy') ?? false;
    const marketingChecked = watch('marketing') ?? false;

    setCheckboxes({
      all: termsChecked && privacyChecked && marketingChecked,
      terms: termsChecked,
      privacy: privacyChecked,
      marketing: marketingChecked,
    });
  }, [watch('terms'), watch('privacy'), watch('marketing')]);

  return {
    checkboxes,
    handleCheckboxChange,
    errors,
  };
};
