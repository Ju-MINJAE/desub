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
        ${className}
      `}
        {...props}
      />
      {helperText && (
        <p className={`mt-1 text-[13px] ${getHelperTextColor()}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};
