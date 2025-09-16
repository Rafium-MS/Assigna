import { useCallback } from 'react';
import { useApp } from './useApp';
import { selectSugestoes } from '../store/selectors';
import type { Sugestao } from '../types/sugestao';
import { SugestaoRepository } from '../services/repositories';
import { useToast } from '../components/feedback/Toast';

/**
 * Custom hook for managing suggestions.
 * This hook provides access to the list of suggestions and a function to add a new suggestion.
 * @returns An object with the list of suggestions and a function to add a new suggestion.
 */
export const useSugestoes = () => {
  const { state, dispatch } = useApp();
  const toast = useToast();
  const sugestoes = selectSugestoes(state);

  return {
    /** The list of all suggestions. */
    sugestoes,
    /**
     * Adds a new suggestion to the repository.
     * @param sugestao The suggestion to add.
     */
    addSugestao: useCallback(
      async (sugestao: Sugestao) => {
        await SugestaoRepository.add(sugestao);
        dispatch({ type: 'ADD_SUGESTAO', payload: sugestao });
        toast.success('Sugestão salva');
        return sugestao;
      },
      [dispatch, toast],
    ),
    /**
     * Updates an existing suggestion.
     * @param sugestao The suggestion with updated information.
     */
    updateSugestao: useCallback(
      async (sugestao: Sugestao) => {
        await SugestaoRepository.add(sugestao);
        dispatch({ type: 'UPDATE_SUGESTAO', payload: sugestao });
        toast.success('Sugestão atualizada');
        return sugestao;
      },
      [dispatch, toast],
    ),
    /**
     * Removes a stored suggestion.
     * @param territorioId The territory identifier.
     * @param saidaId The saída identifier.
     */
    removeSugestao: useCallback(
      async (territorioId: string, saidaId: string) => {
        await SugestaoRepository.remove(territorioId, saidaId);
        dispatch({ type: 'REMOVE_SUGESTAO', payload: { territorioId, saidaId } });
        toast.success('Sugestão removida');
      },
      [dispatch, toast],
    ),
  } as const;
};
