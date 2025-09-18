import { useCallback } from 'react';
import { useApp } from './useApp';
import { selectSaidas } from '../store/selectors';
import type { Saida } from '../types/saida';
import { SaidaRepository } from '../services/repositories';
import { useToast } from '../components/feedback/Toast';
import { generateId } from '../utils/id';

/**
 * Custom hook for managing Saidas (field service groups).
 * This hook provides access to the list of Saidas and a function to add a new Saida.
 * @returns An object with the list of Saidas and a function to add a new Saida.
 */
export const useSaidas = () => {
  const { state, dispatch } = useApp();
  const toast = useToast();
  const saidas = selectSaidas(state);
  const currentUserId = state.auth.currentUser?.id ?? '';

  return {
    /** The list of all Saidas. */
    saidas,
    /**
     * Adds a new Saida and persists it.
     * @param saida The Saida to add.
     */
    addSaida: useCallback(
      async (saida: Omit<Saida, 'id' | 'publisherId'>) => {
        const record: Saida = { id: generateId(), publisherId: currentUserId, ...saida };
        await SaidaRepository.add(record);
        dispatch({ type: 'ADD_SAIDA', payload: record });
        toast.success('Saída salva');
        return record;
      },
      [currentUserId, dispatch, toast]
    ),
    /**
     * Updates an existing Saida.
     * @param id The identifier of the Saida to update.
     * @param saida Updated Saida data.
     */
    updateSaida: useCallback(
      async (id: string, saida: Omit<Saida, 'id' | 'publisherId'>) => {
        const existing = saidas.find((item) => item.id === id);
        const publisherId = existing?.publisherId ?? currentUserId;
        const record: Saida = { id, publisherId, ...saida };
        await SaidaRepository.add(record);
        dispatch({ type: 'UPDATE_SAIDA', payload: record });
        toast.success('Saída atualizada');
        return record;
      },
      [currentUserId, dispatch, saidas, toast]
    ),
    /**
     * Removes a Saida from persistence.
     * @param id The identifier of the Saida to remove.
     */
    removeSaida: useCallback(
      async (id: string) => {
        await SaidaRepository.remove(id);
        dispatch({ type: 'REMOVE_SAIDA', payload: id });
        toast.success('Saída removida');
      },
      [dispatch, toast]
    ),
  } as const;
};
