import React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 bg-white dark:bg-neutral-900 ${className}`}
    />
  ),
);

Input.displayName = 'Input';
