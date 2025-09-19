import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import type { AuthUser } from './store/appReducer';
import { ADMIN_MASTER_ROLE } from './constants/roles';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockAuthState = {
  currentUser: null as AuthUser | null,
  isAuthenticated: false,
  signIn: vi.fn().mockResolvedValue(null),
  signOut: vi.fn(),
};

vi.mock('./hooks/useAuth', () => ({
  useAuth: () => mockAuthState,
}));

vi.mock('./hooks/useApp', () => ({
  useApp: () => ({
    state: {
      auth: { currentUser: mockAuthState.currentUser },
      territorios: [],
      saidas: [],
      designacoes: [],
      sugestoes: [],
      naoEmCasa: [],
    },
    dispatch: vi.fn(),
  }),
}));

vi.mock('./components/feedback/Toast', () => ({
  useToast: () => ({ success: vi.fn(), error: vi.fn() }),
}));

vi.mock('./components/layout/Shell', () => ({
  Shell: ({ children }: { children: ReactNode }) => (
    <div data-testid="shell">{children}</div>
  ),
}));

vi.mock('./components/calendar/SchedulerControls', () => ({
  SchedulerControls: () => <div data-testid="scheduler-controls">Scheduler Controls</div>,
}));

import { AppContent } from './App';

const renderApp = () =>
  render(
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>,
  );

describe('AppContent scheduler controls visibility', () => {
  const baseUser: AuthUser = {
    id: 'user-1',
    role: 'publisher',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    mockAuthState.currentUser = null;
    mockAuthState.isAuthenticated = false;
    mockAuthState.signIn.mockResolvedValue(null);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders scheduler controls for the admin master role', () => {
    mockAuthState.currentUser = {
      ...baseUser,
      role: ADMIN_MASTER_ROLE.toUpperCase(),
    };
    mockAuthState.isAuthenticated = true;

    renderApp();

    expect(screen.getByText('Scheduler Controls')).toBeDefined();
  });

  it('hides scheduler controls for other roles', () => {
    mockAuthState.currentUser = {
      ...baseUser,
      role: 'manager',
    };
    mockAuthState.isAuthenticated = true;

    renderApp();

    expect(screen.queryByText('Scheduler Controls')).toBeNull();
  });
});
