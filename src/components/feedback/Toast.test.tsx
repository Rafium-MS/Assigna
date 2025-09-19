import React from 'react';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

import { ToastProvider, useToast } from './Toast';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const Buttons: React.FC = () => {
  const toast = useToast();

  return (
    <div>
      <button data-testid="success" onClick={() => toast.success('All good!')}>
        success
      </button>
      <button
        data-testid="error"
        onClick={() => toast.error('Something went wrong!')}
      >
        error
      </button>
    </div>
  );
};

const renderToasts = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <ToastProvider>
        <Buttons />
      </ToastProvider>,
    );
  });

  const getButton = (testId: string) =>
    container.querySelector<HTMLButtonElement>(
      `button[data-testid="${testId}"]`,
    );

  const cleanup = () => {
    act(() => {
      root.unmount();
    });
    container.remove();
  };

  return { container, getButton, cleanup };
};

describe('ToastProvider', () => {
  it('displays and removes a success toast after the timeout', async () => {
    vi.useFakeTimers();
    const { container, getButton, cleanup } = renderToasts();

    try {
      const trigger = getButton('success');
      if (!trigger) throw new Error('Success trigger not found');

      await act(async () => {
        trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      const toast = container.querySelector('.bg-green-600');
      expect(toast).not.toBeNull();
      expect(toast?.textContent).toBe('All good!');

      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      expect(container.querySelector('.bg-green-600')).toBeNull();
      expect(container.textContent).not.toContain('All good!');
    } finally {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
      cleanup();
    }
  });

  it('displays and removes an error toast after the timeout', async () => {
    vi.useFakeTimers();
    const { container, getButton, cleanup } = renderToasts();

    try {
      const trigger = getButton('error');
      if (!trigger) throw new Error('Error trigger not found');

      await act(async () => {
        trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      const toast = container.querySelector('.bg-red-600');
      expect(toast).not.toBeNull();
      expect(toast?.textContent).toBe('Something went wrong!');

      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      expect(container.querySelector('.bg-red-600')).toBeNull();
      expect(container.textContent).not.toContain('Something went wrong!');
    } finally {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
      cleanup();
    }
  });
});
