import { useContext } from 'react';
import { AppContext } from '../store/AppProvider';
import { selectSugestoes } from '../store/selectors';
import type { Sugestao } from '../types/sugestao';

export const useSugestoes = () => {
  const { state, dispatch } = useContext(AppContext);
  return {
    sugestoes: selectSugestoes(state),
    addSugestao: (s: Sugestao) => dispatch({ type: 'ADD_SUGESTAO', payload: s }),
  } as const;
};
