import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from './useApp';
import { selectUsers } from '../store/selectors';
import type { User } from '../types/user';
import { UserRepository } from '../services/repositories';
import { useToast } from '../components/feedback/Toast';
import { generateId } from '../utils/id';
import { hashPassword } from '../utils/password';

type NewUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'passwordHash'> & {
  password: string;
};

type UpdateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'passwordHash'> & {
  password?: string | null;
};

export const useUsers = () => {
  const { state, dispatch } = useApp();
  const toast = useToast();
  const { t } = useTranslation();
  const users = selectUsers(state);

  return {
    users,
    addUser: useCallback(
      async (user: NewUserInput) => {
        const now = new Date().toISOString();
        const password = user.password.trim();
        if (!password) {
          throw new Error('PASSWORD_REQUIRED');
        }
        const passwordHash = await hashPassword(password);
        const { password: _password, ...userWithoutPassword } = user;
        void _password;
        const record: User = {
          id: generateId(),
          createdAt: now,
          updatedAt: now,
          passwordHash,
          ...userWithoutPassword,
        };
        await UserRepository.add(record);
        dispatch({ type: 'ADD_USER', payload: record });
        toast.success(t('users.toast.createSuccess'));
        return record;
      },
      [dispatch, t, toast]
    ),
    updateUser: useCallback(
      async (id: string, user: UpdateUserInput) => {
        const existing = users.find((item) => item.id === id);
        const createdAt = existing?.createdAt ?? new Date().toISOString();
        const password = user.password?.trim();
        const passwordHash = password && password.length > 0
          ? await hashPassword(password)
          : existing?.passwordHash ?? '';
        const { password: _password, ...userWithoutPassword } = user;
        void _password;
        const record: User = {
          id,
          createdAt,
          updatedAt: new Date().toISOString(),
          passwordHash,
          ...userWithoutPassword,
        };
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
