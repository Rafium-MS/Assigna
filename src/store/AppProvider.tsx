import { createContext, useEffect, useReducer, Dispatch, ReactNode } from 'react';
import {
  TerritorioRepository,
  SaidaRepository,
  DesignacaoRepository,
  SugestaoRepository,
  NaoEmCasaRepository
} from '../services/repositories';
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
        const [territorios, saidas, designacoes, sugestoes, naoEmCasa] = await Promise.all([
          TerritorioRepository.all(),
          SaidaRepository.all(),
          DesignacaoRepository.all(),
          SugestaoRepository.all(),
          NaoEmCasaRepository.all()
        ]);
        if (!active) return;
        dispatch({ type: 'SET_TERRITORIOS', payload: territorios });
        dispatch({ type: 'SET_SAIDAS', payload: saidas });
        dispatch({ type: 'SET_DESIGNACOES', payload: designacoes });
        dispatch({ type: 'SET_SUGESTOES', payload: sugestoes });
        dispatch({ type: 'SET_NAO_EM_CASA', payload: naoEmCasa });
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
