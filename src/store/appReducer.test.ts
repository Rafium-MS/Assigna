import { describe, expect, it } from 'vitest';
import {
  appReducer,
  initialState,
  type AppState,
  type AuthUser,
} from './appReducer';
import {
  selectCurrentUser,
  selectDesignacoes,
  selectNaoEmCasa,
  selectSaidas,
  selectSugestoes,
  selectTerritorios,
  selectUsers,
} from './selectors';
import type { Territorio } from '../types/territorio';
import type { Saida } from '../types/saida';
import type { Designacao } from '../types/designacao';
import type { Sugestao } from '../types/sugestao';
import type { NaoEmCasaRegistro } from '../types/nao-em-casa';
import type { User } from '../types/user';

const baseTerritorio: Territorio = {
  id: 'territorio-1',
  nome: 'Território 1',
  publisherId: 'publisher-1',
};
const baseSaida: Saida = {
  id: 'saida-1',
  nome: 'Saída 1',
  diaDaSemana: 1,
  hora: '08:00',
  publisherId: 'publisher-1',
};
const baseDesignacao: Designacao = {
  id: 'designacao-1',
  territorioId: 'territorio-1',
  saidaId: 'saida-1',
  dataInicial: '2024-01-01',
  dataFinal: '2024-01-07',
  publisherId: 'publisher-1',
};
const baseSugestao: Sugestao = {
  territorioId: 'territorio-1',
  saidaId: 'saida-1',
  dataInicial: '2024-02-01',
  dataFinal: '2024-02-07',
  publisherId: 'publisher-1',
};
const baseNaoEmCasa: NaoEmCasaRegistro = {
  id: 'registro-1',
  territorioId: 'territorio-1',
  publisherId: 'publisher-1',
  addressId: 1,
  recordedAt: '2024-03-01',
  followUpAt: '2024-07-01',
  completedAt: null,
};

const otherTerritorio: Territorio = {
  id: 'territorio-99',
  nome: 'Outro Território',
  publisherId: 'publisher-2',
};
const otherSaida: Saida = {
  id: 'saida-99',
  nome: 'Saída 99',
  diaDaSemana: 5,
  hora: '10:00',
  publisherId: 'publisher-2',
};
const otherDesignacao: Designacao = {
  id: 'designacao-99',
  territorioId: 'territorio-99',
  saidaId: 'saida-99',
  dataInicial: '2024-05-01',
  dataFinal: '2024-05-07',
  publisherId: 'publisher-2',
};
const otherSugestao: Sugestao = {
  territorioId: 'territorio-99',
  saidaId: 'saida-99',
  dataInicial: '2024-05-08',
  dataFinal: '2024-05-14',
  publisherId: 'publisher-2',
};
const otherNaoEmCasa: NaoEmCasaRegistro = {
  id: 'registro-99',
  territorioId: 'territorio-99',
  publisherId: 'publisher-2',
  addressId: 99,
  recordedAt: '2024-05-01',
  followUpAt: '2024-09-01',
  completedAt: null,
};

const baseManagedUser: User = {
  id: 'managed-user-1',
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'admin',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

const otherManagedUser: User = {
  id: 'managed-user-2',
  name: 'John Smith',
  email: 'john@example.com',
  role: 'publisher',
  createdAt: '2024-02-01T00:00:00.000Z',
  updatedAt: '2024-02-01T00:00:00.000Z',
};

const baseAuthUser: AuthUser = {
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
  users: [{ ...baseManagedUser }],
});

describe('appReducer', () => {
  it('adds a território without mutating existing state', () => {
    const state = createState();
    const originalTerritorios = state.territorios;
    const newTerritorio: Territorio = {
      id: 'territorio-2',
      nome: 'Novo Território',
      publisherId: 'publisher-2',
    };

    const nextState = appReducer(state, {
      type: 'ADD_TERRITORIO',
      payload: newTerritorio,
    });

    expect(nextState).not.toBe(state);
    expect(nextState.territorios).toEqual([
      ...originalTerritorios,
      newTerritorio,
    ]);
    expect(nextState.territorios).not.toBe(originalTerritorios);
    expect(state.territorios).toBe(originalTerritorios);
    expect(state.territorios).toHaveLength(1);
    expect(nextState.saidas).toBe(state.saidas);
    expect(nextState.designacoes).toBe(state.designacoes);
    expect(nextState.sugestoes).toBe(state.sugestoes);
    expect(nextState.naoEmCasa).toBe(state.naoEmCasa);
    expect(nextState.users).toBe(state.users);
  });

  it('adds a saída without mutating existing state', () => {
    const state = createState();
    const originalSaidas = state.saidas;
    const newSaida: Saida = {
      id: 'saida-2',
      nome: 'Nova Saída',
      diaDaSemana: 2,
      hora: '09:00',
      publisherId: 'publisher-2',
    };

    const nextState = appReducer(state, {
      type: 'ADD_SAIDA',
      payload: newSaida,
    });

    expect(nextState).not.toBe(state);
    expect(nextState.saidas).toEqual([...originalSaidas, newSaida]);
    expect(nextState.saidas).not.toBe(originalSaidas);
    expect(state.saidas).toBe(originalSaidas);
    expect(state.saidas).toHaveLength(1);
    expect(nextState.territorios).toBe(state.territorios);
    expect(nextState.designacoes).toBe(state.designacoes);
    expect(nextState.sugestoes).toBe(state.sugestoes);
    expect(nextState.naoEmCasa).toBe(state.naoEmCasa);
    expect(nextState.users).toBe(state.users);
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
      publisherId: 'publisher-2',
    };

    const nextState = appReducer(state, {
      type: 'ADD_DESIGNACAO',
      payload: newDesignacao,
    });

    expect(nextState).not.toBe(state);
    expect(nextState.designacoes).toEqual([
      ...originalDesignacoes,
      newDesignacao,
    ]);
    expect(nextState.designacoes).not.toBe(originalDesignacoes);
    expect(state.designacoes).toBe(originalDesignacoes);
    expect(state.designacoes).toHaveLength(1);
    expect(nextState.territorios).toBe(state.territorios);
    expect(nextState.saidas).toBe(state.saidas);
    expect(nextState.sugestoes).toBe(state.sugestoes);
    expect(nextState.naoEmCasa).toBe(state.naoEmCasa);
    expect(nextState.users).toBe(state.users);
  });

  it('adds a sugestão without mutating existing state', () => {
    const state = createState();
    const originalSugestoes = state.sugestoes;
    const newSugestao: Sugestao = {
      territorioId: 'territorio-1',
      saidaId: 'saida-1',
      dataInicial: '2024-03-01',
      dataFinal: '2024-03-07',
      publisherId: 'publisher-2',
    };

    const nextState = appReducer(state, {
      type: 'ADD_SUGESTAO',
      payload: newSugestao,
    });

    expect(nextState).not.toBe(state);
    expect(nextState.sugestoes).toEqual([...originalSugestoes, newSugestao]);
    expect(nextState.sugestoes).not.toBe(originalSugestoes);
    expect(state.sugestoes).toBe(originalSugestoes);
    expect(state.sugestoes).toHaveLength(1);
    expect(nextState.territorios).toBe(state.territorios);
    expect(nextState.saidas).toBe(state.saidas);
    expect(nextState.designacoes).toBe(state.designacoes);
    expect(nextState.naoEmCasa).toBe(state.naoEmCasa);
    expect(nextState.users).toBe(state.users);
  });

  it('sets territorios with SET_TERRITORIOS', () => {
    const state = createState();
    const territorios: Territorio[] = [
      { id: 'territorio-2', nome: 'Outro', publisherId: 'publisher-2' },
      { id: 'territorio-3', nome: 'Mais um', publisherId: 'publisher-3' },
    ];

    const nextState = appReducer(state, {
      type: 'SET_TERRITORIOS',
      payload: territorios,
    });

    expect(nextState.territorios).toEqual(territorios);
    expect(nextState.saidas).toBe(state.saidas);
    expect(nextState.naoEmCasa).toBe(state.naoEmCasa);
    expect(nextState.users).toBe(state.users);
  });

  it('updates a designacao preserving other entries', () => {
    const state = createState();
    const updated: Designacao = {
      ...state.designacoes[0],
      dataFinal: '2024-02-15',
      devolvido: true,
    };

    const nextState = appReducer(state, {
      type: 'UPDATE_DESIGNACAO',
      payload: updated,
    });

    expect(nextState.designacoes[0]).toEqual(updated);
    expect(nextState.designacoes).toHaveLength(state.designacoes.length);
  });

  it('adds a not-at-home record without mutating existing state', () => {
    const state = createState();
    const originalRegistros = state.naoEmCasa;
    const newRecord: NaoEmCasaRegistro = {
      id: 'registro-2',
      territorioId: 'territorio-2',
      publisherId: 'publisher-2',
      addressId: 5,
      recordedAt: '2024-04-01',
      followUpAt: '2024-08-01',
      completedAt: null,
    };

    const nextState = appReducer(state, {
      type: 'ADD_NAO_EM_CASA',
      payload: newRecord,
    });

    expect(nextState.naoEmCasa).toEqual([...originalRegistros, newRecord]);
    expect(state.naoEmCasa).toBe(originalRegistros);
    expect(nextState.users).toBe(state.users);
  });

  it('sets users with SET_USERS', () => {
    const state = createState();
    const newUsers: User[] = [
      { ...otherManagedUser },
      {
        id: 'managed-user-3',
        name: 'Maria Doe',
        email: 'maria@example.com',
        role: 'viewer',
        createdAt: '2024-03-01T00:00:00.000Z',
        updatedAt: '2024-03-01T00:00:00.000Z',
      },
    ];

    const nextState = appReducer(state, {
      type: 'SET_USERS',
      payload: newUsers,
    });

    expect(nextState.users).toEqual(newUsers);
    expect(nextState.territorios).toBe(state.territorios);
    expect(nextState.naoEmCasa).toBe(state.naoEmCasa);
  });

  it('adds a user without mutating existing state', () => {
    const state = createState();
    const originalUsers = state.users;
    const newUser: User = {
      id: 'managed-user-4',
      name: 'New User',
      email: 'new@example.com',
      role: 'manager',
      createdAt: '2024-04-01T00:00:00.000Z',
      updatedAt: '2024-04-01T00:00:00.000Z',
    };

    const nextState = appReducer(state, { type: 'ADD_USER', payload: newUser });

    expect(nextState.users).toEqual([...originalUsers, newUser]);
    expect(nextState.users).not.toBe(originalUsers);
    expect(state.users).toBe(originalUsers);
    expect(nextState.saidas).toBe(state.saidas);
  });

  it('updates an existing user', () => {
    const state = createState();
    const updatedUser: User = {
      ...state.users[0],
      name: 'Jane Updated',
      updatedAt: '2024-05-01T00:00:00.000Z',
    };

    const nextState = appReducer(state, {
      type: 'UPDATE_USER',
      payload: updatedUser,
    });

    expect(nextState.users[0]).toEqual(updatedUser);
    expect(nextState.users).toHaveLength(state.users.length);
  });

  it('removes a user with REMOVE_USER', () => {
    const state = createState();

    const nextState = appReducer(state, {
      type: 'REMOVE_USER',
      payload: baseManagedUser.id,
    });

    expect(nextState.users).toHaveLength(0);
    expect(state.users).toHaveLength(1);
  });

  it('removes a saida with REMOVE_SAIDA', () => {
    const state = createState();

    const nextState = appReducer(state, {
      type: 'REMOVE_SAIDA',
      payload: 'saida-1',
    });

    expect(nextState.saidas).toHaveLength(0);
    expect(nextState.users).toBe(state.users);
  });

  it('updates the auth slice when signing in', () => {
    const nextState = appReducer(initialState, {
      type: 'SIGN_IN',
      payload: baseAuthUser,
    });

    expect(nextState.auth.currentUser).toEqual(baseAuthUser);
    expect(initialState.auth.currentUser).toBeNull();
  });

  it('resets the entire state when signing out', () => {
    const signedState: AppState = {
      ...createState(),
      auth: { currentUser: baseAuthUser },
    };

    const nextState = appReducer(signedState, { type: 'SIGN_OUT' });

    expect(nextState).toEqual(initialState);
    expect(signedState.auth.currentUser).toBe(baseAuthUser);
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

  it('overwrites slices with scoped payloads and exposes them through selectors', () => {
    const preexisting: AppState = {
      auth: { currentUser: null },
      territorios: [otherTerritorio],
      saidas: [otherSaida],
      designacoes: [otherDesignacao],
      sugestoes: [otherSugestao],
      naoEmCasa: [otherNaoEmCasa],
      users: [otherManagedUser],
    };

    let state = appReducer(preexisting, {
      type: 'SIGN_IN',
      payload: baseAuthUser,
    });
    state = appReducer(state, {
      type: 'SET_TERRITORIOS',
      payload: [baseTerritorio],
    });
    state = appReducer(state, { type: 'SET_SAIDAS', payload: [baseSaida] });
    state = appReducer(state, {
      type: 'SET_DESIGNACOES',
      payload: [baseDesignacao],
    });
    state = appReducer(state, {
      type: 'SET_SUGESTOES',
      payload: [baseSugestao],
    });
    state = appReducer(state, {
      type: 'SET_NAO_EM_CASA',
      payload: [baseNaoEmCasa],
    });
    state = appReducer(state, {
      type: 'SET_USERS',
      payload: [baseManagedUser],
    });

    expect(state.territorios).toEqual([baseTerritorio]);
    expect(state.saidas).toEqual([baseSaida]);
    expect(state.designacoes).toEqual([baseDesignacao]);
    expect(state.sugestoes).toEqual([baseSugestao]);
    expect(state.naoEmCasa).toEqual([baseNaoEmCasa]);
    expect(state.users).toEqual([baseManagedUser]);

    expect(selectCurrentUser(state)).toEqual(baseAuthUser);
    expect(selectTerritorios(state)).toEqual([baseTerritorio]);
    expect(selectSaidas(state)).toEqual([baseSaida]);
    expect(selectDesignacoes(state)).toEqual([baseDesignacao]);
    expect(selectSugestoes(state)).toEqual([baseSugestao]);
    expect(selectNaoEmCasa(state)).toEqual([baseNaoEmCasa]);
    expect(selectUsers(state)).toEqual([baseManagedUser]);

    expect(preexisting.territorios).toEqual([otherTerritorio]);
    expect(preexisting.saidas).toEqual([otherSaida]);
    expect(preexisting.designacoes).toEqual([otherDesignacao]);
    expect(preexisting.sugestoes).toEqual([otherSugestao]);
    expect(preexisting.naoEmCasa).toEqual([otherNaoEmCasa]);
    expect(preexisting.users).toEqual([otherManagedUser]);
  });
});
