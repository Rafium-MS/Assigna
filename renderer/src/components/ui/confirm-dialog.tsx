import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';

interface ConfirmOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmContext = createContext<(opts: ConfirmOptions) => Promise<boolean>>(async () => false);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [opts, setOpts] = useState<ConfirmOptions & { open: boolean; resolve?: (v: boolean) => void }>({
    title: '',
    description: '',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    open: false
  });

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>(resolve => {
      setOpts({ ...options, open: true, resolve });
    });
  }, []);

  const handleClose = (result: boolean) => {
    opts.resolve?.(result);
    setOpts(o => ({ ...o, open: false }));
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Dialog open={opts.open} onOpenChange={o => !o && handleClose(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{opts.title}</DialogTitle>
            {opts.description && <p className="text-sm text-muted-foreground">{opts.description}</p>}
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => handleClose(false)}>{opts.cancelText || 'Cancelar'}</Button>
            <Button onClick={() => handleClose(true)}>{opts.confirmText || 'Confirmar'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}

