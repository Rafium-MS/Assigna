import { useCallback } from 'react';
import { useApp } from './useApp';
import { selectCurrentUser } from '../store/selectors';
import type { AuthUser } from '../store/appReducer';

export interface SignInPayload {
  id: string;
  role: string;
}

export interface UseAuthResult {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (payload: SignInPayload) => AuthUser | null;
  signOut: () => void;
}

export const useAuth = (): UseAuthResult => {
  const { state, dispatch } = useApp();
  const currentUser = selectCurrentUser(state);

  const signIn = useCallback(
    ({ id, role }: SignInPayload) => {
      const trimmedId = id.trim();
      const trimmedRole = role.trim();
      if (!trimmedId || !trimmedRole) {
        return null;
      }

      const now = new Date().toISOString();
      const payload: AuthUser = {
        id: trimmedId,
        role: trimmedRole,
        createdAt: currentUser?.id === trimmedId ? currentUser.createdAt : now,
        updatedAt: now,
      };

      dispatch({ type: 'SIGN_IN', payload });
      return payload;
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
