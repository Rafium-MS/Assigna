import type { Designacao } from '../types/designacao';

/**
 * Represents a monthly summary item for a given Saida.
 */
export interface MonthlySummaryItem {
  /** The ID of the Saida. */
  saidaId: string;
  /** The month in 'YYYY-MM' format. */
  month: string; // YYYY-MM
  /** The total number of designations for the Saida in the given month. */
  total: number;
}

/**
 * Generates a monthly summary of designations by Saida.
 * @param designacoes An array of Designacao objects.
 * @returns An array of MonthlySummaryItem objects.
 */
export const monthlySummaryBySaida = (
  designacoes: Designacao[]
): MonthlySummaryItem[] => {
  const map = new Map<string, MonthlySummaryItem>();
  designacoes.forEach((d) => {
    const month = d.dataInicial.slice(0, 7);
    const key = `${d.saidaId}-${month}`;
    const item = map.get(key) || { saidaId: d.saidaId, month, total: 0 };
    item.total += 1;
    map.set(key, item);
  });
  return Array.from(map.values());
};

/**
 * Represents a history event for a given Territorio.
 */
export interface HistoryEvent {
  /** The ID of the Saida. */
  saidaId: string;
  /** The start date of the designation in 'YYYY-MM-DD' format. */
  dataInicial: string;
  /** The end date of the designation in 'YYYY-MM-DD' format. */
  dataFinal: string;
}

/**
 * Groups designations by Territorio and sorts them by date.
 * @param designacoes An array of Designacao objects.
 * @returns A record of history events grouped by Territorio ID.
 */
export const historyByTerritorio = (
  designacoes: Designacao[]
): Record<string, HistoryEvent[]> => {
  const grouped: Record<string, HistoryEvent[]> = {};
  designacoes.forEach((d) => {
    grouped[d.territorioId] = grouped[d.territorioId] || [];
    grouped[d.territorioId].push({
      saidaId: d.saidaId,
      dataInicial: d.dataInicial,
      dataFinal: d.dataFinal,
    });
  });
  Object.values(grouped).forEach((events) =>
    events.sort((a, b) => a.dataInicial.localeCompare(b.dataInicial))
  );
  return grouped;
};
