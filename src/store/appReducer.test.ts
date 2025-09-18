import { describe, expect, it } from 'vitest';
import { appReducer, initialState, type AppState, type AuthUser } from './appReducer';
import type { Territorio } from '../types/territorio';
import type { Saida } from '../types/saida';
import type { Designacao } from '../types/designacao';
import type { Sugestao } from '../types/sugestao';
import type { NaoEmCasaRegistro } from '../types/nao-em-casa';

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
const baseNaoEmCasa: NaoEmCasaRegistro = {
  id: 'registro-1',
  territorioId: 'territorio-1',
  addressId: 1,
  recordedAt: '2024-03-01',
  followUpAt: '2024-07-01',
  completedAt: null,
};

const baseUser: AuthUser = {
  id: 'user-1',
  role: 'admin',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

const createState = (): AppState => ({
  auth: { currentUser: null },
  territorios: [{ ...baseTerritorio }],
  saidas: [{ ...baseSaida }],
  designacoes: [{ ...baseDesignacao }],
  sugestoes: [{ ...baseSugestao }],
  naoEmCasa: [{ ...baseNaoEmCasa }],
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
    expect(nextState.naoEmCasa).toBe(state.naoEmCasa);
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
    expect(nextState.naoEmCasa).toBe(state.naoEmCasa);
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
    expect(nextState.naoEmCasa).toBe(state.naoEmCasa);
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
    expect(nextState.naoEmCasa).toBe(state.naoEmCasa);
  });

  it('sets territorios with SET_TERRITORIOS', () => {
    const state = createState();
    const territorios: Territorio[] = [
      { id: 'territorio-2', nome: 'Outro' },
      { id: 'territorio-3', nome: 'Mais um' },
    ];

    const nextState = appReducer(state, { type: 'SET_TERRITORIOS', payload: territorios });

    expect(nextState.territorios).toEqual(territorios);
    expect(nextState.saidas).toBe(state.saidas);
    expect(nextState.naoEmCasa).toBe(state.naoEmCasa);
  });

  it('updates a designacao preserving other entries', () => {
    const state = createState();
    const updated: Designacao = {
      ...state.designacoes[0],
      dataFinal: '2024-02-15',
      devolvido: true,
    };

    const nextState = appReducer(state, { type: 'UPDATE_DESIGNACAO', payload: updated });

    expect(nextState.designacoes[0]).toEqual(updated);
    expect(nextState.designacoes).toHaveLength(state.designacoes.length);
  });

  it('adds a not-at-home record without mutating existing state', () => {
    const state = createState();
    const originalRegistros = state.naoEmCasa;
    const newRecord: NaoEmCasaRegistro = {
      id: 'registro-2',
      territorioId: 'territorio-2',
      addressId: 5,
      recordedAt: '2024-04-01',
      followUpAt: '2024-08-01',
      completedAt: null,
    };

    const nextState = appReducer(state, { type: 'ADD_NAO_EM_CASA', payload: newRecord });

    expect(nextState.naoEmCasa).toEqual([...originalRegistros, newRecord]);
    expect(state.naoEmCasa).toBe(originalRegistros);
  });

  it('removes a saida with REMOVE_SAIDA', () => {
    const state = createState();

    const nextState = appReducer(state, { type: 'REMOVE_SAIDA', payload: 'saida-1' });

    expect(nextState.saidas).toHaveLength(0);
  });

  it('updates the auth slice when signing in', () => {
    const nextState = appReducer(initialState, { type: 'SIGN_IN', payload: baseUser });

    expect(nextState.auth.currentUser).toEqual(baseUser);
    expect(initialState.auth.currentUser).toBeNull();
  });

  it('resets the entire state when signing out', () => {
    const signedState: AppState = {
      ...createState(),
      auth: { currentUser: baseUser },
    };

    const nextState = appReducer(signedState, { type: 'SIGN_OUT' });

    expect(nextState).toEqual(initialState);
    expect(signedState.auth.currentUser).toBe(baseUser);
  });

  it('resets state with RESET_STATE', () => {
    const state = createState();
    const populated = appReducer(state, {
      type: 'ADD_TERRITORIO',
      payload: { id: 'territorio-99', nome: 'Temporário' },
    });

    const nextState = appReducer(populated, { type: 'RESET_STATE' });

    expect(nextState).toEqual(initialState);
  });
});
