import React from 'react';
import TextButton from '../ui/TextButton';
import type { AgreementItem } from '@/types/signup';

interface AgreementItemProps extends AgreementItem {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const AgreementItem = ({ id, text, required, link, checked, onChange }: AgreementItemProps) => {
  return (
    <label className="flex items-center space-x-[1.7rem]">
      <input
        type="checkbox"
        className="peer hidden"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span
        style={{ border: '3px solid black' }}
        className="w-[2.3rem] h-[2.3rem] rounded-sm peer-checked:bg-primary peer-checked:border-black"
      />
      <span className="text-[1.8rem]">
        {link && (
          <TextButton href={link.href} className="!font-bold text-[1.8rem]">
            {link.text}
          </TextButton>
        )}
        {text}
        {required ? '(필수)' : '(선택)'}
      </span>
    </label>
  );
};

export default AgreementItem;
