import { createContext, useEffect, useReducer, Dispatch, ReactNode } from 'react';
import { TerritorioRepository, SaidaRepository, DesignacaoRepository, SugestaoRepository } from '../services/repositories';
import { appReducer, initialState, AppState, Action } from './appReducer';

export const AppContext = createContext<{ state: AppState; dispatch: Dispatch<Action> }>(
  {
    state: initialState,
    dispatch: () => undefined,
  }
);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    let active = true;
    const hydrate = async () => {
      try {
        const [territorios, saidas, designacoes, sugestoes] = await Promise.all([
          TerritorioRepository.all(),
          SaidaRepository.all(),
          DesignacaoRepository.all(),
          SugestaoRepository.all(),
        ]);
        if (!active) return;
        dispatch({ type: 'SET_TERRITORIOS', payload: territorios });
        dispatch({ type: 'SET_SAIDAS', payload: saidas });
        dispatch({ type: 'SET_DESIGNACOES', payload: designacoes });
        dispatch({ type: 'SET_SUGESTOES', payload: sugestoes });
      } catch (error) {
        console.error('Falha ao carregar dados iniciais', error);
      }
    };

    void hydrate();

    return () => {
      active = false;
    };
  }, []);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
