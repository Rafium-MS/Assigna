import { useContext } from 'react';
import { AppContext } from '../store/AppProvider';
import { selectSugestoes } from '../store/selectors';
import type { Sugestao } from '../types/sugestao';

/**
 * Custom hook for managing suggestions.
 * This hook provides access to the list of suggestions and a function to add a new suggestion.
 * @returns An object with the list of suggestions and a function to add a new suggestion.
 */
export const useSugestoes = () => {
  const { state, dispatch } = useContext(AppContext);
  return {
    /** The list of all suggestions. */
    sugestoes: selectSugestoes(state),
    /**
     * Adds a new suggestion.
     * @param s The suggestion to add.
     */
    addSugestao: (s: Sugestao) => dispatch({ type: 'ADD_SUGESTAO', payload: s }),
  } as const;
};
