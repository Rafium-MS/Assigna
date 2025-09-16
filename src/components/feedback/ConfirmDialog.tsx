import React, { createContext, useContext, useState } from 'react';
import { Modal } from '../layout/Modal';
import { useTranslation } from 'react-i18next';

/**
 * Represents the state of the confirmation dialog.
 */
interface ConfirmState {
  /** The message to display in the dialog. */
  message: string;
  /** The resolve function for the promise. */
  resolve: (v: boolean) => void;
}

/**
 * The context for the confirmation dialog.
 */
const ConfirmContext = createContext<(msg: string) => Promise<boolean>>(() => Promise.resolve(false));

/**
 * Custom hook for showing a confirmation dialog.
 * @returns A function that shows a confirmation dialog and returns a promise that resolves to a boolean value.
 */
export const useConfirm = () => useContext(ConfirmContext);

/**
 * The provider for the confirmation dialog.
 * It provides the `useConfirm` hook to its children.
 * @param props The props for the component.
 * @returns A JSX element representing the confirmation provider.
 */
export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ConfirmState | null>(null);
  const { t } = useTranslation();

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
            <button onClick={() => handle(false)} className="px-3 py-2 rounded-xl border">
              {t('confirm.cancel')}
            </button>
            <button
              onClick={() => handle(true)}
              className="px-3 py-2 rounded-xl border bg-red-600 text-white"
            >
              {t('confirm.confirm')}
            </button>
          </div>
        </Modal>
      )}
    </ConfirmContext.Provider>
  );
};
