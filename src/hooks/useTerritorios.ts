import { useCallback } from 'react';
import { useApp } from './useApp';
import { selectTerritorios } from '../store/selectors';
import type { Territorio } from '../types/territorio';
import { TerritorioRepository } from '../services/repositories';
import { useToast } from '../components/feedback/Toast';
import { generateId } from '../utils/id';

/**
 * Custom hook for managing territories.
 * This hook provides access to the list of territories and a function to add a new territory.
 * @returns An object with the list of territories and a function to add a new territory.
 */
export const useTerritorios = () => {
  const { state, dispatch } = useApp();
  const toast = useToast();
  const territorios = selectTerritorios(state);
  const currentUserId = state.auth.currentUser?.id ?? '';

  return {
    /** The list of all territories. */
    territorios,
    /**
     * Adds a new territory and persists it to the repository.
     * @param territorio The territory data to create.
     */
    addTerritorio: useCallback(
      async (territorio: Omit<Territorio, 'id' | 'publisherId'>) => {
        const record: Territorio = {
          id: generateId(),
          publisherId: currentUserId,
          ...territorio,
        };
        await TerritorioRepository.add(record);
        dispatch({ type: 'ADD_TERRITORIO', payload: record });
        toast.success('Território salvo');
        return record;
      },
      [currentUserId, dispatch, toast],
    ),
    /**
     * Updates an existing territory.
     * @param id The identifier of the territory.
     * @param territorio Updated territory data.
     */
    updateTerritorio: useCallback(
      async (
        id: string,
        territorio: Omit<Territorio, 'id' | 'publisherId'>,
      ) => {
        const existing = territorios.find((item) => item.id === id);
        const publisherId = existing?.publisherId ?? currentUserId;
        const record: Territorio = { id, publisherId, ...territorio };
        await TerritorioRepository.add(record);
        dispatch({ type: 'UPDATE_TERRITORIO', payload: record });
        toast.success('Território atualizado');
        return record;
      },
      [currentUserId, dispatch, territorios, toast],
    ),
    /**
     * Removes a territory from the repository.
     * @param id The identifier of the territory to remove.
     */
    removeTerritorio: useCallback(
      async (id: string) => {
        await TerritorioRepository.remove(id);
        dispatch({ type: 'REMOVE_TERRITORIO', payload: id });
        toast.success('Território removido');
      },
      [dispatch, toast],
    ),
  } as const;
};
