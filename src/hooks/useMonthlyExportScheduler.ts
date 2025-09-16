import { useEffect, useState } from 'react';
import { DesignacaoRepository } from '../services/repositories/designacoes';
import { monthlySummaryBySaida } from '../utils/report';
import { exportToCsv, downloadFile } from '../utils/csv';

/**
 * Represents the configuration for the monthly export scheduler.
 */
interface SchedulerConfig {
  /** Whether the scheduler is enabled. */
  enabled: boolean;
  /** The timestamp in milliseconds for the next run. */
  nextRun: number; // timestamp in ms
}

const STORAGE_KEY = 'tm.exportScheduler';

/**
 * Calculates the default next run time for the scheduler.
 * @returns The timestamp in milliseconds for the next run.
 */
function defaultNextRun(): number {
  const next = new Date();
  next.setMonth(next.getMonth() + 1);
  next.setHours(0, 0, 0, 0);
  return next.getTime();
}

/**
 * Loads the scheduler configuration from local storage.
 * @returns The scheduler configuration.
 */
function loadConfig(): SchedulerConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as SchedulerConfig;
  } catch {
    /* ignore */
  }
  return { enabled: false, nextRun: defaultNextRun() };
}

/**
 * Saves the scheduler configuration to local storage.
 * @param cfg The scheduler configuration to save.
 */
function saveConfig(cfg: SchedulerConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}

/**
 * Custom hook for scheduling a monthly export of the designation summary.
 * This hook manages the configuration and execution of the monthly export.
 * @returns An object with the scheduler configuration and a function to update it.
 */
export function useMonthlyExportScheduler() {
  const [config, setConfig] = useState<SchedulerConfig>(() => loadConfig());

  useEffect(() => {
    saveConfig(config);
  }, [config]);

  useEffect(() => {
    if (!config.enabled) return;
    const interval = setInterval(async () => {
      if (Date.now() >= config.nextRun) {
        const designacoes = await DesignacaoRepository.all();
        const summary = monthlySummaryBySaida(designacoes).map((item) => ({ ...item }));
        const csv = exportToCsv(summary, ['saidaId', 'month', 'total']);
        const date = new Date().toISOString().split('T')[0];
        downloadFile(csv, `monthly-summary-${date}.csv`, 'text/csv');
        const next = new Date(config.nextRun);
        next.setMonth(next.getMonth() + 1);
        setConfig({ ...config, nextRun: next.getTime() });
      }
    }, 60 * 60 * 1000); // check hourly
    return () => clearInterval(interval);
  }, [config]);

  return { config, setConfig } as const;
}
