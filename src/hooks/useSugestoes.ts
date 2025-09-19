import { useCallback } from 'react';
import { useApp } from './useApp';
import { selectSugestoes } from '../store/selectors';
import type { Sugestao } from '../types/sugestao';
import { SugestaoRepository } from '../services/repositories';
import { useToast } from '../components/feedback/Toast';

type SugestaoInput = Omit<Sugestao, 'publisherId'> & { publisherId?: string };

/**
 * Custom hook for managing suggestions.
 * This hook provides access to the list of suggestions and a function to add a new suggestion.
 * @returns An object with the list of suggestions and a function to add a new suggestion.
 */
export const useSugestoes = () => {
  const { state, dispatch } = useApp();
  const toast = useToast();
  const sugestoes = selectSugestoes(state);
  const currentUserId = state.auth.currentUser?.id ?? '';

  return {
    /** The list of all suggestions. */
    sugestoes,
    /**
     * Adds a new suggestion to the repository.
     * @param sugestao The suggestion to add.
     */
    addSugestao: useCallback(
      async (sugestao: SugestaoInput) => {
        const record: Sugestao = {
          ...sugestao,
          publisherId: sugestao.publisherId ?? currentUserId,
        };
        await SugestaoRepository.add(record);
        dispatch({ type: 'ADD_SUGESTAO', payload: record });
        toast.success('Sugestão salva');
        return record;
      },
      [currentUserId, dispatch, toast],
    ),
    /**
     * Updates an existing suggestion.
     * @param sugestao The suggestion with updated information.
     */
    updateSugestao: useCallback(
      async (sugestao: SugestaoInput) => {
        const record: Sugestao = {
          ...sugestao,
          publisherId: sugestao.publisherId ?? currentUserId,
        };
        await SugestaoRepository.add(record);
        dispatch({ type: 'UPDATE_SUGESTAO', payload: record });
        toast.success('Sugestão atualizada');
        return record;
      },
      [currentUserId, dispatch, toast],
    ),
    /**
     * Removes a stored suggestion.
     * @param territorioId The territory identifier.
     * @param saidaId The saída identifier.
     */
    removeSugestao: useCallback(
      async (territorioId: string, saidaId: string) => {
        await SugestaoRepository.remove(territorioId, saidaId);
        dispatch({
          type: 'REMOVE_SUGESTAO',
          payload: { territorioId, saidaId },
        });
        toast.success('Sugestão removida');
      },
      [dispatch, toast],
    ),
  } as const;
};
