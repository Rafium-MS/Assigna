import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react');
  return {
    ...actual,
    useContext: vi.fn(),
    useCallback: <T extends (...args: never[]) => unknown>(callback: T) => callback,
  };
});

vi.mock('../components/feedback/Toast', () => ({
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn(),
  }),
}));

function createRepositoryMock() {
  return {
    add: vi.fn().mockResolvedValue(undefined),
    remove: vi.fn().mockResolvedValue(undefined),
    clear: vi.fn().mockResolvedValue(undefined),
    all: vi.fn().mockResolvedValue([]),
  };
}

vi.mock('../services/repositories', () => ({
  TerritorioRepository: createRepositoryMock(),
  SaidaRepository: createRepositoryMock(),
  DesignacaoRepository: createRepositoryMock(),
  SugestaoRepository: createRepositoryMock(),
}));

import { useContext } from 'react';
import { AppContext } from '../store/AppProvider';
import type { AppState, Action } from '../store/appReducer';
import type { Territorio } from '../types/territorio';
import type { Saida } from '../types/saida';
import type { Designacao } from '../types/designacao';
import type { Sugestao } from '../types/sugestao';
import * as selectors from '../store/selectors';
import { useApp } from './useApp';
import { useTerritorios } from './useTerritorios';
import { useSaidas } from './useSaidas';
import { useDesignacoes } from './useDesignacoes';
import { useSugestoes } from './useSugestoes';

const mockedUseContext = useContext as unknown as ReturnType<typeof vi.fn>;

const createAppState = (): AppState => ({
  territorios: [
    {
      id: 'territorio-1',
      nome: 'Território 1',
    },
  ],
  saidas: [
    {
      id: 'saida-1',
      nome: 'Saída 1',
      diaDaSemana: 1,
      hora: '08:00',
    },
  ],
  designacoes: [
    {
      id: 'designacao-1',
      territorioId: 'territorio-1',
      saidaId: 'saida-1',
      dataInicial: '2024-01-01',
      dataFinal: '2024-01-07',
    },
  ],
  sugestoes: [
    {
      territorioId: 'territorio-1',
      saidaId: 'saida-1',
      dataInicial: '2024-02-01',
      dataFinal: '2024-02-07',
    },
  ],
});

const setupContext = () => {
  const state = createAppState();
  const dispatch = vi.fn<[Action], void>();
  const contextValue = { state, dispatch };
  mockedUseContext.mockReturnValue(contextValue);
  return { state, dispatch, contextValue };
};

beforeEach(() => {
  mockedUseContext.mockReset();
});

describe('App context hooks', () => {
  describe('useApp', () => {
    it('returns the AppContext value', () => {
      const { contextValue } = setupContext();

      const result = useApp();

      expect(mockedUseContext).toHaveBeenCalledWith(AppContext);
      expect(result).toBe(contextValue);
    });
  });

  describe('useTerritorios', () => {
    it('selects territorios from the current state', () => {
      const { state } = setupContext();
      const selected: Territorio[] = [
        { id: 'territorio-2', nome: 'Outro Território' },
      ];
      const selectSpy = vi
        .spyOn(selectors, 'selectTerritorios')
        .mockReturnValue(selected);

      const { territorios } = useTerritorios();

      expect(mockedUseContext).toHaveBeenCalledWith(AppContext);
      expect(selectSpy).toHaveBeenCalledWith(state);
      expect(territorios).toBe(selected);

      selectSpy.mockRestore();
    });

    it('dispatches an action to add a território', async () => {
      const { dispatch, state } = setupContext();
      const newTerritorio: Territorio = {
        id: 'territorio-2',
        nome: 'Novo Território',
      };
      const selectSpy = vi
        .spyOn(selectors, 'selectTerritorios')
        .mockReturnValue(state.territorios);

      const { addTerritorio } = useTerritorios();
      await addTerritorio({ nome: newTerritorio.nome });

      expect(mockedUseContext).toHaveBeenCalledWith(AppContext);
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'ADD_TERRITORIO',
          payload: expect.objectContaining({ nome: newTerritorio.nome }),
        }),
      );

      selectSpy.mockRestore();
    });
  });

  describe('useSaidas', () => {
    it('selects saidas from the current state', () => {
      const { state } = setupContext();
      const selected: Saida[] = [
        { id: 'saida-2', nome: 'Outra Saída', diaDaSemana: 2, hora: '09:00' },
      ];
      const selectSpy = vi.spyOn(selectors, 'selectSaidas').mockReturnValue(selected);

      const { saidas } = useSaidas();

      expect(mockedUseContext).toHaveBeenCalledWith(AppContext);
      expect(selectSpy).toHaveBeenCalledWith(state);
      expect(saidas).toBe(selected);

      selectSpy.mockRestore();
    });

    it('dispatches an action to add a saída', async () => {
      const { dispatch, state } = setupContext();
      const newSaida: Saida = {
        id: 'saida-2',
        nome: 'Nova Saída',
        diaDaSemana: 2,
        hora: '09:00',
      };
      const selectSpy = vi.spyOn(selectors, 'selectSaidas').mockReturnValue(state.saidas);

      const { addSaida } = useSaidas();
      await addSaida({ nome: newSaida.nome, diaDaSemana: newSaida.diaDaSemana, hora: newSaida.hora });

      expect(mockedUseContext).toHaveBeenCalledWith(AppContext);
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'ADD_SAIDA',
          payload: expect.objectContaining({ nome: newSaida.nome }),
        }),
      );

      selectSpy.mockRestore();
    });
  });

  describe('useDesignacoes', () => {
    it('selects designacoes from the current state', () => {
      const { state } = setupContext();
      const selected: Designacao[] = [
        {
          id: 'designacao-2',
          territorioId: 'territorio-1',
          saidaId: 'saida-1',
          dataInicial: '2024-03-01',
          dataFinal: '2024-03-07',
        },
      ];
      const selectSpy = vi
        .spyOn(selectors, 'selectDesignacoes')
        .mockReturnValue(selected);

      const { designacoes } = useDesignacoes();

      expect(mockedUseContext).toHaveBeenCalledWith(AppContext);
      expect(selectSpy).toHaveBeenCalledWith(state);
      expect(designacoes).toBe(selected);

      selectSpy.mockRestore();
    });

    it('dispatches an action to add a designação', async () => {
      const { dispatch, state } = setupContext();
      const newDesignacao: Designacao = {
        id: 'designacao-2',
        territorioId: 'territorio-1',
        saidaId: 'saida-1',
        dataInicial: '2024-03-01',
        dataFinal: '2024-03-07',
      };
      const selectSpy = vi
        .spyOn(selectors, 'selectDesignacoes')
        .mockReturnValue(state.designacoes);

      const { addDesignacao } = useDesignacoes();
      await addDesignacao({
        territorioId: newDesignacao.territorioId,
        saidaId: newDesignacao.saidaId,
        dataInicial: newDesignacao.dataInicial,
        dataFinal: newDesignacao.dataFinal,
      });

      expect(mockedUseContext).toHaveBeenCalledWith(AppContext);
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'ADD_DESIGNACAO',
          payload: expect.objectContaining({ territorioId: newDesignacao.territorioId }),
        }),
      );

      selectSpy.mockRestore();
    });
  });

  describe('useSugestoes', () => {
    it('selects sugestoes from the current state', () => {
      const { state } = setupContext();
      const selected: Sugestao[] = [
        {
          territorioId: 'territorio-1',
          saidaId: 'saida-1',
          dataInicial: '2024-04-01',
          dataFinal: '2024-04-07',
        },
      ];
      const selectSpy = vi
        .spyOn(selectors, 'selectSugestoes')
        .mockReturnValue(selected);

      const { sugestoes } = useSugestoes();

      expect(mockedUseContext).toHaveBeenCalledWith(AppContext);
      expect(selectSpy).toHaveBeenCalledWith(state);
      expect(sugestoes).toBe(selected);

      selectSpy.mockRestore();
    });

    it('dispatches an action to add a sugestão', async () => {
      const { dispatch, state } = setupContext();
      const newSugestao: Sugestao = {
        territorioId: 'territorio-1',
        saidaId: 'saida-1',
        dataInicial: '2024-04-01',
        dataFinal: '2024-04-07',
      };
      const selectSpy = vi
        .spyOn(selectors, 'selectSugestoes')
        .mockReturnValue(state.sugestoes);

      const { addSugestao } = useSugestoes();
      await addSugestao(newSugestao);

      expect(mockedUseContext).toHaveBeenCalledWith(AppContext);
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'ADD_SUGESTAO',
          payload: expect.objectContaining({ territorioId: newSugestao.territorioId }),
        }),
      );

      selectSpy.mockRestore();
    });
  });
});
