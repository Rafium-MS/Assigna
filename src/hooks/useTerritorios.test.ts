import type { AppState } from '../store/appReducer';
import type { Territorio } from '../types/territorio';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, renderHook } from '@testing-library/react';

const {
  repositoryAddMock,
  repositoryRemoveMock,
  useToastMock,
  toastSuccessMock,
  generateIdMock,
} = vi.hoisted(() => ({
  repositoryAddMock: vi.fn(async () => {}),
  repositoryRemoveMock: vi.fn(async () => {}),
  useToastMock: vi.fn(),
  toastSuccessMock: vi.fn(),
  generateIdMock: vi.fn(() => 'generated-id'),
}));

vi.mock('./useApp', () => ({
  useApp: vi.fn(),
}));

vi.mock('../store/selectors', () => ({
  selectTerritorios: vi.fn(),
}));

vi.mock('../services/repositories', () => ({
  TerritorioRepository: {
    add: repositoryAddMock,
    remove: repositoryRemoveMock,
  },
}));

vi.mock('../components/feedback/Toast', () => ({
  useToast: useToastMock,
}));

vi.mock('../utils/id', () => ({
  generateId: generateIdMock,
}));

import { useTerritorios } from './useTerritorios';
import { useApp } from './useApp';
import { selectTerritorios } from '../store/selectors';

type Dispatch = ReturnType<typeof vi.fn>;

const mockedUseApp = vi.mocked(useApp);
const mockedSelectTerritorios = vi.mocked(selectTerritorios);

let state: AppState;
let dispatchSpy: Dispatch;

beforeEach(() => {
  state = {
    auth: {
      currentUser: null,
    },
    territorios: [
      {
        id: 'territorio-inicial',
        nome: 'Território Inicial',
      },
    ],
    saidas: [],
    designacoes: [],
    sugestoes: [],
    naoEmCasa: [],
  };
  dispatchSpy = vi.fn();

  repositoryAddMock.mockClear();
  repositoryRemoveMock.mockClear();
  useToastMock.mockClear();
  toastSuccessMock.mockClear();
  generateIdMock.mockClear();

  useToastMock.mockReturnValue({ success: toastSuccessMock });
  mockedUseApp.mockReturnValue({ state, dispatch: dispatchSpy });
  mockedSelectTerritorios.mockReturnValue(state.territorios);
  generateIdMock.mockReturnValue('generated-id');
});

afterEach(() => {
  cleanup();
});

describe('useTerritorios', () => {
  it('exposes the territorios selected from the state', () => {
    const selected: Territorio[] = [
      { id: 'territorio-2', nome: 'Outro Território' },
    ];
    mockedSelectTerritorios.mockReturnValueOnce(selected);

    const { result } = renderHook(() => useTerritorios());

    expect(mockedSelectTerritorios).toHaveBeenCalledWith(state);
    expect(result.current.territorios).toBe(selected);
  });

  it('persists and dispatches a new território when addTerritorio is called', async () => {
    const { result } = renderHook(() => useTerritorios());
    const payload = { nome: 'Novo Território' };

    let created: Territorio | undefined;
    await act(async () => {
      created = await result.current.addTerritorio(payload);
    });

    expect(generateIdMock).toHaveBeenCalled();
    expect(repositoryAddMock).toHaveBeenCalledWith({ id: 'generated-id', ...payload });
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'ADD_TERRITORIO',
      payload: { id: 'generated-id', ...payload },
    });
    expect(toastSuccessMock).toHaveBeenCalledWith('Território salvo');
    expect(created).toEqual({ id: 'generated-id', ...payload });
  });

  it('updates an existing território using updateTerritorio', async () => {
    const { result } = renderHook(() => useTerritorios());
    const updatePayload: Omit<Territorio, 'id'> = {
      nome: 'Território Atualizado',
    };

    let updated: Territorio | undefined;
    await act(async () => {
      updated = await result.current.updateTerritorio('territorio-1', updatePayload);
    });

    expect(repositoryAddMock).toHaveBeenCalledWith({ id: 'territorio-1', ...updatePayload });
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'UPDATE_TERRITORIO',
      payload: { id: 'territorio-1', ...updatePayload },
    });
    expect(toastSuccessMock).toHaveBeenCalledWith('Território atualizado');
    expect(updated).toEqual({ id: 'territorio-1', ...updatePayload });
  });

  it('removes a território when removeTerritorio is invoked', async () => {
    const { result } = renderHook(() => useTerritorios());

    await act(async () => {
      await result.current.removeTerritorio('territorio-3');
    });

    expect(repositoryRemoveMock).toHaveBeenCalledWith('territorio-3');
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'REMOVE_TERRITORIO',
      payload: 'territorio-3',
    });
    expect(toastSuccessMock).toHaveBeenCalledWith('Território removido');
  });
});
