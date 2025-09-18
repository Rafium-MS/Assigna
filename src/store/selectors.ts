import type { AppState } from './appReducer';

export const selectTerritorios = (state: AppState) => state.territorios;
export const selectSaidas = (state: AppState) => state.saidas;
export const selectDesignacoes = (state: AppState) => state.designacoes;
export const selectSugestoes = (state: AppState) => state.sugestoes;
export const selectNaoEmCasa = (state: AppState) => state.naoEmCasa;
export const selectCurrentUser = (state: AppState) => state.auth.currentUser;
export const selectUsers = (state: AppState) => state.users;
