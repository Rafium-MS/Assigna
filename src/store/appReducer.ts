import type { Territorio } from '../types/territorio';
import type { Saida } from '../types/saida';
import type { Designacao } from '../types/designacao';
import type { Sugestao } from '../types/sugestao';

export interface AppState {
  territorios: Territorio[];
  saidas: Saida[];
  designacoes: Designacao[];
  sugestoes: Sugestao[];
}

export const initialState: AppState = {
  territorios: [],
  saidas: [],
  designacoes: [],
  sugestoes: [],
};

export type Action =
  | { type: 'ADD_TERRITORIO'; payload: Territorio }
  | { type: 'ADD_SAIDA'; payload: Saida }
  | { type: 'ADD_DESIGNACAO'; payload: Designacao }
  | { type: 'ADD_SUGESTAO'; payload: Sugestao };

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TERRITORIO':
      return { ...state, territorios: [...state.territorios, action.payload] };
    case 'ADD_SAIDA':
      return { ...state, saidas: [...state.saidas, action.payload] };
    case 'ADD_DESIGNACAO':
      return { ...state, designacoes: [...state.designacoes, action.payload] };
    case 'ADD_SUGESTAO':
      return { ...state, sugestoes: [...state.sugestoes, action.payload] };
    default:
      return state;
  }
}
