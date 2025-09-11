import { createContext, useReducer, Dispatch, ReactNode } from 'react';
import type { Territorio } from '../types';

interface AppState {
  territorios: Territorio[];
}

const initialState: AppState = {
  territorios: [],
};

type Action = { type: 'ADD_TERRITORIO'; payload: Territorio };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TERRITORIO':
      return { ...state, territorios: [...state.territorios, action.payload] };
    default:
      return state;
  }
}

export const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const AppProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
