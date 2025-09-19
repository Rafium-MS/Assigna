import React from 'react';

export interface CardProps {
  className?: string;
  title?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className = '',
  title,
  actions,
  children,
}) => {
  const hasTitle = Boolean(title?.trim());
  const hasActions =
    actions !== undefined && actions !== null && actions !== false;
  const showHeader = hasTitle || hasActions;

  return (
    <div
      className={`rounded-2xl shadow p-4 bg-white/70 dark:bg-neutral-900/60 backdrop-blur border border-black/5 ${className}`}
    >
      {showHeader && (
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          {hasTitle && (
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h2>
          )}
          {hasActions && (
            <div className="flex w-full flex-wrap items-center gap-2 text-neutral-700 dark:text-neutral-200 sm:ml-auto sm:w-auto sm:justify-end">
              {actions}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
