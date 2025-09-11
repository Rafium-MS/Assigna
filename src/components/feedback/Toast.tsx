import React, { createContext, useContext, useState } from 'react';

interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
}

interface ToastCtx {
  success: (m: string) => void;
  error: (m: string) => void;
}

const ToastContext = createContext<ToastCtx | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('ToastProvider missing');
  return ctx;
};

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

