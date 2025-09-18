import { createContext, useEffect, useReducer, useState, Dispatch, ReactNode } from 'react';
import {
  TerritorioRepository,
  SaidaRepository,
  DesignacaoRepository,
  SugestaoRepository,
  NaoEmCasaRepository,
  UserRepository
} from '../services/repositories';
import { appReducer, initialState, AppState, Action } from './appReducer';
import { loadPersistedAuthState, persistAuthState, clearPersistedAuthState } from './localStore';

export const AppContext = createContext<{ state: AppState; dispatch: Dispatch<Action> }>(
  {
    state: initialState,
    dispatch: () => undefined,
  }
);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [authHydrated, setAuthHydrated] = useState(false);
  const currentUserId = state.auth.currentUser?.id ?? null;

  useEffect(() => {
    let active = true;
    const hydrate = async () => {
      try {
        const persistedAuth = loadPersistedAuthState();
        if (active && persistedAuth.currentUser) {
          dispatch({ type: 'SIGN_IN', payload: persistedAuth.currentUser });
        }
      } catch (error) {
        console.error('Falha ao carregar dados iniciais', error);
      } finally {
        if (active) {
          setAuthHydrated(true);
        }
      }
    };

    void hydrate();

    return () => {
      active = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!authHydrated) return;

    let active = true;

    const loadData = async () => {
      try {
        if (!currentUserId) {
          if (active) {
            dispatch({ type: 'SET_TERRITORIOS', payload: [] });
            dispatch({ type: 'SET_SAIDAS', payload: [] });
            dispatch({ type: 'SET_DESIGNACOES', payload: [] });
            dispatch({ type: 'SET_SUGESTOES', payload: [] });
            dispatch({ type: 'SET_NAO_EM_CASA', payload: [] });
            dispatch({ type: 'SET_USERS', payload: [] });
          }
          return;
        }

        const [territorios, saidas, designacoes, sugestoes, naoEmCasa, users] = await Promise.all([
          TerritorioRepository.forPublisher(currentUserId),
          SaidaRepository.forPublisher(currentUserId),
          DesignacaoRepository.forPublisher(currentUserId),
          SugestaoRepository.forPublisher(currentUserId),
          NaoEmCasaRepository.forPublisher(currentUserId),
          UserRepository.all()
        ]);

        if (!active) return;

        dispatch({ type: 'SET_TERRITORIOS', payload: territorios });
        dispatch({ type: 'SET_SAIDAS', payload: saidas });
        dispatch({ type: 'SET_DESIGNACOES', payload: designacoes });
        dispatch({ type: 'SET_SUGESTOES', payload: sugestoes });
        dispatch({ type: 'SET_NAO_EM_CASA', payload: naoEmCasa });
        dispatch({ type: 'SET_USERS', payload: users });
      } catch (error) {
        console.error('Falha ao carregar dados iniciais', error);
      }
    };

    void loadData();

    return () => {
      active = false;
    };
  }, [authHydrated, currentUserId, dispatch]);

  useEffect(() => {
    if (!authHydrated) return;

    if (state.auth.currentUser) {
      persistAuthState(state.auth);
    } else {
      clearPersistedAuthState();
    }
  }, [authHydrated, state.auth]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
