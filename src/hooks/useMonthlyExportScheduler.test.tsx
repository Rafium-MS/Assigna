import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';

const designacaoAllMock = vi.fn();
const exportToCsvMock = vi.fn();
const downloadFileMock = vi.fn();

vi.mock('../services/repositories/designacoes', () => ({
  DesignacaoRepository: {
    all: designacaoAllMock,
  },
}));

vi.mock('../utils/csv', () => ({
  exportToCsv: exportToCsvMock,
  downloadFile: downloadFileMock,
}));

const STORAGE_KEY = 'tm.exportScheduler';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

async function renderHook<T>(hook: () => T) {
  const container = document.createElement('div');
  let root: Root | null = createRoot(container);
  let hookValue: T | undefined;

  function TestComponent() {
    hookValue = hook();
    return null;
  }

  await act(async () => {
    root?.render(<TestComponent />);
  });

  return {
    result: {
      get current() {
        if (hookValue === undefined) {
          throw new Error('Hook value is not initialized');
        }
        return hookValue;
      },
    },
    async unmount() {
      await act(async () => {
        root?.unmount();
        root = null;
      });
    },
  } as const;
}

async function flushEffects() {
  await act(async () => {
    await Promise.resolve();
  });
}

describe('useMonthlyExportScheduler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('loads configuration from localStorage and persists changes', async () => {
    const storedConfig = { enabled: false, nextRun: Date.UTC(2024, 0, 1) };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedConfig));
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const { useMonthlyExportScheduler } = await import('./useMonthlyExportScheduler');
    const { result, unmount } = await renderHook(() => useMonthlyExportScheduler());

    try {
      expect(result.current.config).toEqual(storedConfig);

      await flushEffects();
      expect(setItemSpy).toHaveBeenCalledWith(
        STORAGE_KEY,
        JSON.stringify(storedConfig)
      );

      setItemSpy.mockClear();
      const updatedConfig = { enabled: true, nextRun: storedConfig.nextRun + 1 };

      await act(async () => {
        result.current.setConfig(updatedConfig);
      });

      await flushEffects();
      expect(setItemSpy).toHaveBeenCalledWith(
        STORAGE_KEY,
        JSON.stringify(updatedConfig)
      );
    } finally {
      setItemSpy.mockRestore();
      await unmount();
    }
  });

  it('exports CSV when reaching nextRun and schedules the next execution', async () => {
    vi.useFakeTimers();

    const nextRun = Date.UTC(2024, 0, 15);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ enabled: true, nextRun }));

    const designacoes = [
      {
        id: 'designacao-1',
        territorioId: 'territorio-1',
        saidaId: 'saida-1',
        dataInicial: '2024-01-10',
        dataFinal: '2024-01-15',
      },
    ];

    designacaoAllMock.mockResolvedValue(designacoes);
    exportToCsvMock.mockReturnValue('csv-data');
    downloadFileMock.mockReturnValue(undefined);

    vi.setSystemTime(new Date('2024-02-01T00:00:00.000Z'));

    const { useMonthlyExportScheduler } = await import('./useMonthlyExportScheduler');
    const { result, unmount } = await renderHook(() => useMonthlyExportScheduler());

    try {
      expect(result.current.config).toEqual({ enabled: true, nextRun });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(60 * 60 * 1000);
      });
      await flushEffects();

      expect(designacaoAllMock).toHaveBeenCalledTimes(1);
      expect(exportToCsvMock).toHaveBeenCalledWith(
        [
          {
            saidaId: 'saida-1',
            month: '2024-01',
            total: 1,
          },
        ],
        ['saidaId', 'month', 'total']
      );
      expect(downloadFileMock).toHaveBeenCalledWith(
        'csv-data',
        'monthly-summary-2024-02-01.csv',
        'text/csv'
      );

      const expectedNextRunDate = new Date(nextRun);
      expectedNextRunDate.setMonth(expectedNextRunDate.getMonth() + 1);

      await flushEffects();
      expect(result.current.config.nextRun).toBe(expectedNextRunDate.getTime());
    } finally {
      await unmount();
      vi.useRealTimers();
    }
  });

  it('clears the interval when the hook is unmounted', async () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');

    const nextRun = Date.now() + 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ enabled: true, nextRun }));

    const { useMonthlyExportScheduler } = await import('./useMonthlyExportScheduler');
    const { unmount } = await renderHook(() => useMonthlyExportScheduler());

    try {
      await flushEffects();
      await unmount();
      expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    } finally {
      clearIntervalSpy.mockRestore();
    }
  });
});
