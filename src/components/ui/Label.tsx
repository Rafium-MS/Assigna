import React from 'react';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({
  children,
  className = '',
  ...props
}) => (
  <label
    {...props}
    className={`text-sm font-medium text-neutral-600 dark:text-neutral-300 ${className}`}
  >
    {children}
  </label>
);
