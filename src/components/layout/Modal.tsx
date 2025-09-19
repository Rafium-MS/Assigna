import React from 'react';

/**
 * A component for displaying a modal dialog.
 * @param props The props for the component.
 * @returns A JSX element representing the modal.
 */
export const Modal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow max-w-sm w-full">
      {children}
    </div>
  </div>
);
