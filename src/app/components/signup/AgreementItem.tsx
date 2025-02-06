import React from 'react';
import TextButton from '../ui/TextButton';
import type { AgreementItem } from '@/types/signup';

interface AgreementItemProps extends AgreementItem {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const AgreementItem = ({ id, text, required, link, checked, onChange }: AgreementItemProps) => {
  return (
    <label className="flex items-center space-x-[2.3rem]">
      <input
        type="checkbox"
        className="peer hidden"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black" />
      <span className="text-[3rem]">
        {link && (
          <TextButton href={link.href} className="text-[3rem] !font-bold">
            {link.text}
          </TextButton>
        )}
        {text}
        {required && '(필수)'}
      </span>
    </label>
  );
};

export default AgreementItem;
