import { useCallback } from 'react';
import { useApp } from './useApp';
import { selectCurrentUser } from '../store/selectors';
import type { AuthUser } from '../store/appReducer';
import { UserRepository } from '../services/repositories';
import { verifyPassword } from '../utils/password';

export interface SignInPayload {
  identifier: string;
  password: string;
}

export interface UseAuthResult {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (payload: SignInPayload) => Promise<AuthUser | null>;
  signOut: () => void;
}

export const useAuth = (): UseAuthResult => {
  const { state, dispatch } = useApp();
  const currentUser = selectCurrentUser(state);

  const signIn = useCallback(
    async ({ identifier, password }: SignInPayload) => {
      const trimmedIdentifier = identifier.trim();
      const trimmedPassword = password.trim();
      if (!trimmedIdentifier || !trimmedPassword) {
        return null;
      }

      try {
        const user =
          (await UserRepository.findByEmail(trimmedIdentifier)) ??
          (await UserRepository.findById(trimmedIdentifier));
        if (!user) {
          return null;
        }

        const isValid = await verifyPassword(trimmedPassword, user.passwordHash);
        if (!isValid) {
          return null;
        }

        const now = new Date().toISOString();
        const payload: AuthUser = {
          id: user.id,
          role: user.role,
          createdAt: currentUser?.id === user.id ? currentUser.createdAt : now,
          updatedAt: now,
        };

        dispatch({ type: 'SIGN_IN', payload });
        return payload;
      } catch (error) {
        console.error('Failed to sign in', error);
        return null;
      }
    },
    [currentUser, dispatch],
  );

  const signOut = useCallback(() => {
    dispatch({ type: 'SIGN_OUT' });
  }, [dispatch]);

  return {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    signIn,
    signOut,
  };
};
