import type { Territorio } from '../types/territorio';
import type { Saida } from '../types/saida';
import type { Designacao } from '../types/designacao';
import type { Sugestao } from '../types/sugestao';
import type { NaoEmCasaRegistro } from '../types/nao-em-casa';
import type { User } from '../types/user';

export interface AuthUser {
  id: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  currentUser: AuthUser | null;
}

export interface AppState {
  auth: AuthState;
  territorios: Territorio[];
  saidas: Saida[];
  designacoes: Designacao[];
  sugestoes: Sugestao[];
  naoEmCasa: NaoEmCasaRegistro[];
  users: User[];
}

export const initialState: AppState = {
  auth: {
    currentUser: null,
  },
  territorios: [],
  saidas: [],
  designacoes: [],
  sugestoes: [],
  naoEmCasa: [],
  users: [],
};

export type Action =
  | { type: 'SIGN_IN'; payload: AuthUser }
  | { type: 'SIGN_OUT' }
  | { type: 'SET_TERRITORIOS'; payload: Territorio[] }
  | { type: 'ADD_TERRITORIO'; payload: Territorio }
  | { type: 'UPDATE_TERRITORIO'; payload: Territorio }
  | { type: 'REMOVE_TERRITORIO'; payload: string }
  | { type: 'SET_SAIDAS'; payload: Saida[] }
  | { type: 'ADD_SAIDA'; payload: Saida }
  | { type: 'UPDATE_SAIDA'; payload: Saida }
  | { type: 'REMOVE_SAIDA'; payload: string }
  | { type: 'SET_DESIGNACOES'; payload: Designacao[] }
  | { type: 'ADD_DESIGNACAO'; payload: Designacao }
  | { type: 'UPDATE_DESIGNACAO'; payload: Designacao }
  | { type: 'REMOVE_DESIGNACAO'; payload: string }
  | { type: 'SET_SUGESTOES'; payload: Sugestao[] }
  | { type: 'ADD_SUGESTAO'; payload: Sugestao }
  | { type: 'UPDATE_SUGESTAO'; payload: Sugestao }
  | {
      type: 'REMOVE_SUGESTAO';
      payload: { territorioId: string; saidaId: string };
    }
  | { type: 'SET_NAO_EM_CASA'; payload: NaoEmCasaRegistro[] }
  | { type: 'ADD_NAO_EM_CASA'; payload: NaoEmCasaRegistro }
  | { type: 'UPDATE_NAO_EM_CASA'; payload: NaoEmCasaRegistro }
  | { type: 'REMOVE_NAO_EM_CASA'; payload: string }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'REMOVE_USER'; payload: string }
  | { type: 'RESET_STATE' };

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        auth: { currentUser: action.payload },
      };
    case 'SIGN_OUT':
      return initialState;
    case 'SET_TERRITORIOS':
      return { ...state, territorios: [...action.payload] };
    case 'ADD_TERRITORIO':
      return { ...state, territorios: [...state.territorios, action.payload] };
    case 'UPDATE_TERRITORIO':
      return {
        ...state,
        territorios: state.territorios.map((territorio) =>
          territorio.id === action.payload.id ? action.payload : territorio,
        ),
      };
    case 'REMOVE_TERRITORIO':
      return {
        ...state,
        territorios: state.territorios.filter(
          (territorio) => territorio.id !== action.payload,
        ),
      };
    case 'SET_SAIDAS':
      return { ...state, saidas: [...action.payload] };
    case 'ADD_SAIDA':
      return { ...state, saidas: [...state.saidas, action.payload] };
    case 'UPDATE_SAIDA':
      return {
        ...state,
        saidas: state.saidas.map((saida) =>
          saida.id === action.payload.id ? action.payload : saida,
        ),
      };
    case 'REMOVE_SAIDA':
      return {
        ...state,
        saidas: state.saidas.filter((saida) => saida.id !== action.payload),
      };
    case 'SET_DESIGNACOES':
      return { ...state, designacoes: [...action.payload] };
    case 'ADD_DESIGNACAO':
      return { ...state, designacoes: [...state.designacoes, action.payload] };
    case 'UPDATE_DESIGNACAO':
      return {
        ...state,
        designacoes: state.designacoes.map((designacao) =>
          designacao.id === action.payload.id ? action.payload : designacao,
        ),
      };
    case 'REMOVE_DESIGNACAO':
      return {
        ...state,
        designacoes: state.designacoes.filter(
          (designacao) => designacao.id !== action.payload,
        ),
      };
    case 'SET_SUGESTOES':
      return { ...state, sugestoes: [...action.payload] };
    case 'ADD_SUGESTAO':
      return { ...state, sugestoes: [...state.sugestoes, action.payload] };
    case 'UPDATE_SUGESTAO':
      return {
        ...state,
        sugestoes: state.sugestoes.map((sugestao) =>
          sugestao.territorioId === action.payload.territorioId &&
          sugestao.saidaId === action.payload.saidaId
            ? action.payload
            : sugestao,
        ),
      };
    case 'REMOVE_SUGESTAO':
      return {
        ...state,
        sugestoes: state.sugestoes.filter(
          (sugestao) =>
            sugestao.territorioId !== action.payload.territorioId ||
            sugestao.saidaId !== action.payload.saidaId,
        ),
      };
    case 'SET_NAO_EM_CASA':
      return { ...state, naoEmCasa: [...action.payload] };
    case 'ADD_NAO_EM_CASA':
      return { ...state, naoEmCasa: [...state.naoEmCasa, action.payload] };
    case 'UPDATE_NAO_EM_CASA':
      return {
        ...state,
        naoEmCasa: state.naoEmCasa.map((registro) =>
          registro.id === action.payload.id ? action.payload : registro,
        ),
      };
    case 'REMOVE_NAO_EM_CASA':
      return {
        ...state,
        naoEmCasa: state.naoEmCasa.filter(
          (registro) => registro.id !== action.payload,
        ),
      };
    case 'SET_USERS':
      return { ...state, users: [...action.payload] };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        ),
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}
