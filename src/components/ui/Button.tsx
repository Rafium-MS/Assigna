import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ className = '', ...props }) => (
  <button
    {...props}
    className={`rounded-xl px-3 py-2 shadow border hover:shadow-md active:scale-[.98] transition ${className}`}
  />
);
