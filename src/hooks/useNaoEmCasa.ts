import { useCallback } from 'react';
import { useApp } from './useApp';
import { selectNaoEmCasa } from '../store/selectors';
import type { NaoEmCasaRegistro } from '../types/nao-em-casa';
import { NaoEmCasaRepository } from '../services/repositories';
import { useToast } from '../components/feedback/Toast';
import { generateId } from '../utils/id';

/**
 * Hook for managing "not at home" records.
 */
export const useNaoEmCasa = () => {
  const { state, dispatch } = useApp();
  const toast = useToast();
  const registros = selectNaoEmCasa(state);
  const currentUserId = state.auth.currentUser?.id ?? '';

  return {
    registros,
    addNaoEmCasa: useCallback(
      async (registro: Omit<NaoEmCasaRegistro, 'id' | 'publisherId'>) => {
        const record: NaoEmCasaRegistro = {
          id: generateId(),
          completedAt: registro.completedAt ?? null,
          ...registro,
          publisherId: currentUserId,
        };
        await NaoEmCasaRepository.add(record);
        dispatch({ type: 'ADD_NAO_EM_CASA', payload: record });
        toast.success('Retorno agendado');
        return record;
      },
      [currentUserId, dispatch, toast]
    ),
    updateNaoEmCasa: useCallback(
      async (id: string, updates: Partial<Omit<NaoEmCasaRegistro, 'id'>>) => {
        const current = registros.find((registro) => registro.id === id);
        if (!current) return undefined;
        const record: NaoEmCasaRegistro = {
          ...current,
          ...updates,
          id,
        };
        await NaoEmCasaRepository.add(record);
        dispatch({ type: 'UPDATE_NAO_EM_CASA', payload: record });
        toast.success('Registro atualizado');
        return record;
      },
      [dispatch, registros, toast]
    ),
    removeNaoEmCasa: useCallback(
      async (id: string) => {
        await NaoEmCasaRepository.remove(id);
        dispatch({ type: 'REMOVE_NAO_EM_CASA', payload: id });
        toast.success('Registro removido');
      },
      [dispatch, toast]
    ),
  } as const;
};
