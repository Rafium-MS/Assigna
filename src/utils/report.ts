import type { Designacao } from '../types';

export interface MonthlySummaryItem {
  saidaId: string;
  month: string; // YYYY-MM
  total: number;
}

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

export interface HistoryEvent {
  saidaId: string;
  dataInicial: string;
  dataFinal: string;
}

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
