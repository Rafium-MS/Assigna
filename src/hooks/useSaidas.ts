import { useContext } from 'react';
import { AppContext } from '../store/AppProvider';
import { selectSaidas } from '../store/selectors';
import type { Saida } from '../types/saida';

export const useSaidas = () => {
  const { state, dispatch } = useContext(AppContext);
  return {
    saidas: selectSaidas(state),
    addSaida: (s: Saida) => dispatch({ type: 'ADD_SAIDA', payload: s }),
  } as const;
};
