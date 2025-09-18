import { useCallback } from 'react';
import { useApp } from './useApp';
import { selectDesignacoes } from '../store/selectors';
import type { Designacao } from '../types/designacao';
import { DesignacaoRepository } from '../services/repositories';
import { useToast } from '../components/feedback/Toast';
import { generateId } from '../utils/id';

/**
 * Custom hook for managing designations.
 * This hook provides access to the list of designations and a function to add a new designation.
 * @returns An object with the list of designations and a function to add a new designation.
 */
export const useDesignacoes = () => {
  const { state, dispatch } = useApp();
  const toast = useToast();
  const designacoes = selectDesignacoes(state);
  const currentUserId = state.auth.currentUser?.id ?? '';

  return {
    /** The list of all designations. */
    designacoes,
    /**
     * Adds a new designation to the repository.
     * @param designacao The designation data to create.
     */
    addDesignacao: useCallback(
      async (designacao: Omit<Designacao, 'id' | 'publisherId'>) => {
        const record: Designacao = {
          id: generateId(),
          devolvido: false,
          ...designacao,
          publisherId: currentUserId,
        };
        await DesignacaoRepository.add(record);
        dispatch({ type: 'ADD_DESIGNACAO', payload: record });
        toast.success('Designação salva');
        return record;
      },
      [currentUserId, dispatch, toast]
    ),
    /**
     * Updates an existing designation.
     * @param id The identifier of the designation to update.
     * @param updates Partial data to merge with the current designation.
     */
    updateDesignacao: useCallback(
      async (id: string, updates: Partial<Omit<Designacao, 'id'>>) => {
        const current = designacoes.find((designacao) => designacao.id === id);
        if (!current) return undefined;
        const record: Designacao = { ...current, ...updates, id };
        await DesignacaoRepository.add(record);
        dispatch({ type: 'UPDATE_DESIGNACAO', payload: record });
        toast.success('Designação atualizada');
        return record;
      },
      [designacoes, dispatch, toast]
    ),
    /**
     * Removes a designation.
     * @param id The identifier of the designation to remove.
     */
    removeDesignacao: useCallback(
      async (id: string) => {
        await DesignacaoRepository.remove(id);
        dispatch({ type: 'REMOVE_DESIGNACAO', payload: id });
        toast.success('Designação removida');
      },
      [dispatch, toast]
    ),
  } as const;
};
