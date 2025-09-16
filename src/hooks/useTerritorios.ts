import { useContext } from 'react';
import { AppContext } from '../store/AppProvider';
import { selectTerritorios } from '../store/selectors';
import type { Territorio } from '../types/territorio';

/**
 * Custom hook for managing territories.
 * This hook provides access to the list of territories and a function to add a new territory.
 * @returns An object with the list of territories and a function to add a new territory.
 */
export const useTerritorios = () => {
  const { state, dispatch } = useContext(AppContext);
  return {
    /** The list of all territories. */
    territorios: selectTerritorios(state),
    /**
     * Adds a new territory.
     * @param t The territory to add.
     */
    addTerritorio: (t: Territorio) => dispatch({ type: 'ADD_TERRITORIO', payload: t }),
  } as const;
};
