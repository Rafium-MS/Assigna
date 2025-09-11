import { useContext } from 'react';
import { AppContext } from '../store/AppProvider';
import { selectDesignacoes } from '../store/selectors';
import type { Designacao } from '../types/designacao';

export const useDesignacoes = () => {
  const { state, dispatch } = useContext(AppContext);
  return {
    designacoes: selectDesignacoes(state),
    addDesignacao: (d: Designacao) => dispatch({ type: 'ADD_DESIGNACAO', payload: d }),
  } as const;
};
