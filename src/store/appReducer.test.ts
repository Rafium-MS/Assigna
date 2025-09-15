import { describe, expect, it } from 'vitest';
import { appReducer, type AppState } from './appReducer';
import type { Territorio } from '../types/territorio';
import type { Saida } from '../types/saida';
import type { Designacao } from '../types/designacao';
import type { Sugestao } from '../types/sugestao';

const baseTerritorio: Territorio = { id: 'territorio-1', nome: 'Território 1' };
const baseSaida: Saida = {
  id: 'saida-1',
  nome: 'Saída 1',
  diaDaSemana: 1,
  hora: '08:00',
};
const baseDesignacao: Designacao = {
  id: 'designacao-1',
  territorioId: 'territorio-1',
  saidaId: 'saida-1',
  dataInicial: '2024-01-01',
  dataFinal: '2024-01-07',
};
const baseSugestao: Sugestao = {
  territorioId: 'territorio-1',
  saidaId: 'saida-1',
  dataInicial: '2024-02-01',
  dataFinal: '2024-02-07',
};

const createState = (): AppState => ({
  territorios: [{ ...baseTerritorio }],
  saidas: [{ ...baseSaida }],
  designacoes: [{ ...baseDesignacao }],
  sugestoes: [{ ...baseSugestao }],
});

describe('appReducer', () => {
  it('adds a território without mutating existing state', () => {
    const state = createState();
    const originalTerritorios = state.territorios;
    const newTerritorio: Territorio = { id: 'territorio-2', nome: 'Novo Território' };

    const nextState = appReducer(state, { type: 'ADD_TERRITORIO', payload: newTerritorio });

    expect(nextState).not.toBe(state);
    expect(nextState.territorios).toEqual([...originalTerritorios, newTerritorio]);
    expect(nextState.territorios).not.toBe(originalTerritorios);
    expect(state.territorios).toBe(originalTerritorios);
    expect(state.territorios).toHaveLength(1);
    expect(nextState.saidas).toBe(state.saidas);
    expect(nextState.designacoes).toBe(state.designacoes);
    expect(nextState.sugestoes).toBe(state.sugestoes);
  });

  it('adds a saída without mutating existing state', () => {
    const state = createState();
    const originalSaidas = state.saidas;
    const newSaida: Saida = {
      id: 'saida-2',
      nome: 'Nova Saída',
      diaDaSemana: 2,
      hora: '09:00',
    };

    const nextState = appReducer(state, { type: 'ADD_SAIDA', payload: newSaida });

    expect(nextState).not.toBe(state);
    expect(nextState.saidas).toEqual([...originalSaidas, newSaida]);
    expect(nextState.saidas).not.toBe(originalSaidas);
    expect(state.saidas).toBe(originalSaidas);
    expect(state.saidas).toHaveLength(1);
    expect(nextState.territorios).toBe(state.territorios);
    expect(nextState.designacoes).toBe(state.designacoes);
    expect(nextState.sugestoes).toBe(state.sugestoes);
  });

  it('adds a designação without mutating existing state', () => {
    const state = createState();
    const originalDesignacoes = state.designacoes;
    const newDesignacao: Designacao = {
      id: 'designacao-2',
      territorioId: 'territorio-1',
      saidaId: 'saida-1',
      dataInicial: '2024-02-01',
      dataFinal: '2024-02-07',
    };

    const nextState = appReducer(state, { type: 'ADD_DESIGNACAO', payload: newDesignacao });

    expect(nextState).not.toBe(state);
    expect(nextState.designacoes).toEqual([...originalDesignacoes, newDesignacao]);
    expect(nextState.designacoes).not.toBe(originalDesignacoes);
    expect(state.designacoes).toBe(originalDesignacoes);
    expect(state.designacoes).toHaveLength(1);
    expect(nextState.territorios).toBe(state.territorios);
    expect(nextState.saidas).toBe(state.saidas);
    expect(nextState.sugestoes).toBe(state.sugestoes);
  });

  it('adds a sugestão without mutating existing state', () => {
    const state = createState();
    const originalSugestoes = state.sugestoes;
    const newSugestao: Sugestao = {
      territorioId: 'territorio-1',
      saidaId: 'saida-1',
      dataInicial: '2024-03-01',
      dataFinal: '2024-03-07',
    };

    const nextState = appReducer(state, { type: 'ADD_SUGESTAO', payload: newSugestao });

    expect(nextState).not.toBe(state);
    expect(nextState.sugestoes).toEqual([...originalSugestoes, newSugestao]);
    expect(nextState.sugestoes).not.toBe(originalSugestoes);
    expect(state.sugestoes).toBe(originalSugestoes);
    expect(state.sugestoes).toHaveLength(1);
    expect(nextState.territorios).toBe(state.territorios);
    expect(nextState.saidas).toBe(state.saidas);
    expect(nextState.designacoes).toBe(state.designacoes);
  });
});
