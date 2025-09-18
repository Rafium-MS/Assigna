import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from './useApp';
import { selectUsers } from '../store/selectors';
import type { User } from '../types/user';
import { UserRepository } from '../services/repositories';
import { useToast } from '../components/feedback/Toast';
import { generateId } from '../utils/id';

export const useUsers = () => {
  const { state, dispatch } = useApp();
  const toast = useToast();
  const { t } = useTranslation();
  const users = selectUsers(state);

  return {
    users,
    addUser: useCallback(
      async (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
        const now = new Date().toISOString();
        const record: User = { id: generateId(), createdAt: now, updatedAt: now, ...user };
        await UserRepository.add(record);
        dispatch({ type: 'ADD_USER', payload: record });
        toast.success(t('users.toast.createSuccess'));
        return record;
      },
      [dispatch, t, toast]
    ),
    updateUser: useCallback(
      async (id: string, user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
        const existing = users.find((item) => item.id === id);
        const createdAt = existing?.createdAt ?? new Date().toISOString();
        const record: User = { id, createdAt, updatedAt: new Date().toISOString(), ...user };
        await UserRepository.update(record);
        dispatch({ type: 'UPDATE_USER', payload: record });
        toast.success(t('users.toast.updateSuccess'));
        return record;
      },
      [dispatch, t, toast, users]
    ),
    removeUser: useCallback(
      async (id: string) => {
        await UserRepository.remove(id);
        dispatch({ type: 'REMOVE_USER', payload: id });
        toast.success(t('users.toast.deleteSuccess'));
      },
      [dispatch, t, toast]
    ),
  } as const;
};
