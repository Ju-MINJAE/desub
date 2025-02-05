import type React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: 'default' | 'error' | 'success';
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  status = 'default',
  helperText,
  className = '',
  ...props
}) => {
  const getHelperTextColor = () => {
    switch (status) {
      case 'error':
        return 'text-red';
      case 'success':
        return 'text-green';
      default:
        return 'text-gray';
    }
  };

  return (
    <div className="w-full">
      <input
        className={`
        w-full
        border-b border-black
        placeholder:text-gray
        focus:outline-none 
        text-[3.5rem]
        h-[6.6rem]
        ${className}
      `}
        {...props}
      />
      {helperText && (
        <p className={`mt-[0.25rem] text-[1.5rem] ${getHelperTextColor()}`}>{helperText}</p>
      )}
    </div>
  );
};
