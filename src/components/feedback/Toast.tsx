import React, { createContext, useContext, useState } from 'react';

/**
 * Represents a toast message.
 */
interface Toast {
  /** The unique ID of the toast. */
  id: number;
  /** The type of the toast. */
  type: 'success' | 'error';
  /** The message to display in the toast. */
  message: string;
}

/**
 * Represents the context for the toast provider.
 */
interface ToastCtx {
  /**
   * Shows a success toast.
   * @param m The message to display.
   */
  success: (m: string) => void;
  /**
   * Shows an error toast.
   * @param m The message to display.
   */
  error: (m: string) => void;
}

/**
 * The context for the toast provider.
 */
const ToastContext = createContext<ToastCtx | null>(null);

/**
 * Custom hook for showing toast messages.
 * @returns An object with functions for showing success and error toasts.
 */
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('ToastProvider missing');
  return ctx;
};

/**
 * The provider for the toast messages.
 * It provides the `useToast` hook to its children.
 * @param props The props for the component.
 * @returns A JSX element representing the toast provider.
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = (type: Toast['type'], message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  const value: ToastCtx = {
    success: (m) => add('success', m),
    error: (m) => add('error', m),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded shadow text-white text-sm ${t.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
