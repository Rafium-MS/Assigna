import { useContext } from 'react';
import { AppContext } from '../store/AppProvider';
import { selectSaidas } from '../store/selectors';
import type { Saida } from '../types/saida';

/**
 * Custom hook for managing Saidas (field service groups).
 * This hook provides access to the list of Saidas and a function to add a new Saida.
 * @returns An object with the list of Saidas and a function to add a new Saida.
 */
export const useSaidas = () => {
  const { state, dispatch } = useContext(AppContext);
  return {
    /** The list of all Saidas. */
    saidas: selectSaidas(state),
    /**
     * Adds a new Saida.
     * @param s The Saida to add.
     */
    addSaida: (s: Saida) => dispatch({ type: 'ADD_SAIDA', payload: s }),
  } as const;
};
