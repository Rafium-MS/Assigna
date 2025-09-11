import { createContext, useReducer, Dispatch, ReactNode } from 'react';
import { appReducer, initialState, AppState, Action } from './appReducer';

export const AppContext = createContext<{ state: AppState; dispatch: Dispatch<Action> }>(
  {
    state: initialState,
    dispatch: () => undefined,
  }
);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
