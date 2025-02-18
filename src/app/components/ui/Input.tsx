import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: 'default' | 'error' | 'success';
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ status = 'default', helperText, className = '', ...props }, ref) => {
    const getHelperTextColor = () => {
      switch (status) {
        case 'error':
          return 'text-red';
        case 'success':
          return 'text-green';
        default:
          return 'text-darkgray';
      }
    };

    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`
          w-full
          h-[3rem]
          md:h-[6.6rem]
          text-[1.6rem]
          md:text-[3.5rem]
          border-b border-black
          placeholder:text-gray
          focus:outline-none 
          ${className}
        `}
          {...props}
        />
        {helperText && (
          <p className={`mt-[0.25rem] text-[1.5rem] ${getHelperTextColor()}`}>{helperText}</p>
        )}
      </div>
    );
  },
);
