import { describe, expect, test } from 'vitest';
import type { Designacao } from '../types/designacao';
import { historyByTerritorio, monthlySummaryBySaida } from './report';

describe('report utils', () => {
  const designacoes: Designacao[] = [
    {
      id: '1',
      territorioId: 't1',
      saidaId: 's1',
      dataInicial: '2024-07-01',
      dataFinal: '2024-07-05',
    },
    {
      id: '2',
      territorioId: 't1',
      saidaId: 's1',
      dataInicial: '2024-07-10',
      dataFinal: '2024-07-15',
    },
    {
      id: '3',
      territorioId: 't2',
      saidaId: 's2',
      dataInicial: '2024-06-05',
      dataFinal: '2024-06-10',
    },
    {
      id: '4',
      territorioId: 't1',
      saidaId: 's1',
      dataInicial: '2024-06-15',
      dataFinal: '2024-06-20',
    },
  ];

  test('monthlySummaryBySaida groups by month and saida', () => {
    const summary = monthlySummaryBySaida(designacoes);
    expect(summary).toEqual(
      expect.arrayContaining([
        { saidaId: 's1', month: '2024-07', total: 2 },
        { saidaId: 's1', month: '2024-06', total: 1 },
        { saidaId: 's2', month: '2024-06', total: 1 },
      ]),
    );
  });

  test('historyByTerritorio sorts events', () => {
    const history = historyByTerritorio(designacoes);
    expect(history.t1[0].dataInicial).toBe('2024-06-15');
    expect(history.t1.length).toBe(3);
  });
});
