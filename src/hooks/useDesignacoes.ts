import { useContext } from 'react';
import { AppContext } from '../store/AppProvider';
import { selectDesignacoes } from '../store/selectors';
import type { Designacao } from '../types/designacao';

/**
 * Custom hook for managing designations.
 * This hook provides access to the list of designations and a function to add a new designation.
 * @returns An object with the list of designations and a function to add a new designation.
 */
export const useDesignacoes = () => {
  const { state, dispatch } = useContext(AppContext);
  return {
    /** The list of all designations. */
    designacoes: selectDesignacoes(state),
    /**
     * Adds a new designation.
     * @param d The designation to add.
     */
    addDesignacao: (d: Designacao) => dispatch({ type: 'ADD_DESIGNACAO', payload: d }),
  } as const;
};
