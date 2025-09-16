import React from 'react';

export interface CardProps {
  className?: string;
  title?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = '', title, actions, children }) => (
  <div className={`rounded-2xl shadow p-4 bg-white/70 dark:bg-neutral-900/60 backdrop-blur border border-black/5 ${className}`}>
    <div className="flex items-center justify-between mb-3">
      {title ? <h2 className="text-lg font-semibold">{title}</h2> : <span />}
      <div className="flex gap-2">{actions}</div>
    </div>
    {children}
  </div>
);
