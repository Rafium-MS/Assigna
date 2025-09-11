import React, { createContext, useContext, useState } from 'react';
import { Modal } from './Modal';

interface ConfirmState {
  message: string;
  resolve: (v: boolean) => void;
}

const ConfirmContext = createContext<(msg: string) => Promise<boolean>>(() => Promise.resolve(false));

export const useConfirm = () => useContext(ConfirmContext);

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ConfirmState | null>(null);

  const confirm = (message: string) => new Promise<boolean>((resolve) => setState({ message, resolve }));

  const handle = (val: boolean) => {
    state?.resolve(val);
    setState(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state && (
        <Modal>
          <p className="mb-4">{state.message}</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => handle(false)} className="px-3 py-2 rounded-xl border">Cancelar</button>
            <button
              onClick={() => handle(true)}
              className="px-3 py-2 rounded-xl border bg-red-600 text-white"
            >
              Confirmar
            </button>
          </div>
        </Modal>
      )}
    </ConfirmContext.Provider>
  );
};

