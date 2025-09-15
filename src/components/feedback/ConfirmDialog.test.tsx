import React from 'react';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

import { ConfirmProvider, useConfirm } from './ConfirmDialog';

type ResolveHandler = (value: boolean) => void;

const TestComponent: React.FC<{ message: string; onResolved: ResolveHandler }> = ({
  message,
  onResolved,
}) => {
  const confirm = useConfirm();

  return (
    <button
      data-testid="trigger"
      onClick={() => {
        void confirm(message).then(onResolved);
      }}
    >
      trigger
    </button>
  );
};

const renderConfirm = (message: string, onResolved: ResolveHandler) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <ConfirmProvider>
        <TestComponent message={message} onResolved={onResolved} />
      </ConfirmProvider>
    );
  });

  const trigger = container.querySelector<HTMLButtonElement>('button[data-testid="trigger"]');
  if (!trigger) throw new Error('Trigger button not found');

  const cleanup = () => {
    act(() => {
      root.unmount();
    });
    container.remove();
  };

  return { container, trigger, cleanup };
};

describe('ConfirmDialog', () => {
  it('resolves to true when confirmation button is clicked', async () => {
    const message = 'Delete this item?';
    let resolvePromise: ResolveHandler = () => {};
    const resultPromise = new Promise<boolean>((resolve) => {
      resolvePromise = resolve;
    });
    const onResolved = vi.fn((value: boolean) => {
      resolvePromise(value);
    });

    const { container, trigger, cleanup } = renderConfirm(message, onResolved);

    try {
      await act(async () => {
        trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(container.textContent).toContain(message);

      const confirmButton = Array.from(container.querySelectorAll('button')).find((btn) =>
        btn.textContent?.includes('confirm.confirm')
      );
      if (!confirmButton) throw new Error('Confirm button not found');

      await act(async () => {
        confirmButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      const result = await resultPromise;

      expect(result).toBe(true);
      expect(onResolved).toHaveBeenCalledWith(true);
      expect(container.textContent).not.toContain(message);
    } finally {
      cleanup();
    }
  });

  it('resolves to false when cancellation button is clicked', async () => {
    const message = 'Cancel this action?';
    let resolvePromise: ResolveHandler = () => {};
    const resultPromise = new Promise<boolean>((resolve) => {
      resolvePromise = resolve;
    });
    const onResolved = vi.fn((value: boolean) => {
      resolvePromise(value);
    });

    const { container, trigger, cleanup } = renderConfirm(message, onResolved);

    try {
      await act(async () => {
        trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(container.textContent).toContain(message);

      const cancelButton = Array.from(container.querySelectorAll('button')).find((btn) =>
        btn.textContent?.includes('confirm.cancel')
      );
      if (!cancelButton) throw new Error('Cancel button not found');

      await act(async () => {
        cancelButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      const result = await resultPromise;

      expect(result).toBe(false);
      expect(onResolved).toHaveBeenCalledWith(false);
      expect(container.textContent).not.toContain(message);
    } finally {
      cleanup();
    }
  });
});
