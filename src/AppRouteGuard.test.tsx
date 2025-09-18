import type { ComponentType } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';

import { RouteGuard } from './App';
import { routes } from './routes';
import { ADMIN_MASTER_ROLE } from './constants/roles';

describe('RouteGuard', () => {
  const fallbackLabel = 'Acesso negado';
  const ManagementComponent = () => <div>Gestão</div>;
  const LettersComponent = () => <div>Cartas</div>;
  const UsersComponent = () => <div>Usuários</div>;

  afterEach(() => {
    cleanup();
    window.history.replaceState({}, '', '/');
  });

  const renderGuard = ({
    component,
    allowedRoles,
    currentRole,
    path,
  }: {
    component: ComponentType;
    allowedRoles: ReadonlyArray<string>;
    currentRole: string | null;
    path: string;
  }) => {
    window.history.replaceState({}, '', path);

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path={path}
            element={
              <RouteGuard
                component={component}
                allowedRoles={allowedRoles}
                currentRole={currentRole}
                path={path}
              />
            }
          />
          <Route path="/unauthorized" element={<div>{fallbackLabel}</div>} />
        </Routes>
      </BrowserRouter>
    );
  };

  it('redirects management-only routes when the user role is not permitted', async () => {
    expect(RouteGuard).toBeDefined();

    renderGuard({
      component: ManagementComponent,
      allowedRoles: routes.buildingsVillages.allowedRoles,
      currentRole: 'publisher',
      path: routes.buildingsVillages.path,
    });

    await waitFor(() => {
      expect(screen.getByText(fallbackLabel)).toBeDefined();
    });
  });

  it('redirects publisher routes when a viewer visits the page', async () => {
    expect(RouteGuard).toBeDefined();

    renderGuard({
      component: LettersComponent,
      allowedRoles: routes.letters.allowedRoles,
      currentRole: 'viewer',
      path: routes.letters.path,
    });

    await waitFor(() => {
      expect(screen.getByText(fallbackLabel)).toBeDefined();
    });
  });

  it('redirects admin users without master privileges from the users route', async () => {
    expect(RouteGuard).toBeDefined();

    renderGuard({
      component: UsersComponent,
      allowedRoles: routes.users.allowedRoles,
      currentRole: 'admin',
      path: routes.users.path,
    });

    await waitFor(() => {
      expect(screen.getByText(fallbackLabel)).toBeDefined();
    });
  });

  it('allows the admin master role to access management routes', async () => {
    expect(RouteGuard).toBeDefined();

    renderGuard({
      component: ManagementComponent,
      allowedRoles: routes.buildingsVillages.allowedRoles,
      currentRole: ADMIN_MASTER_ROLE.toUpperCase(),
      path: routes.buildingsVillages.path,
    });

    await waitFor(() => {
      expect(screen.getByText('Gestão')).toBeDefined();
    });
    expect(screen.queryByText(fallbackLabel)).toBeNull();
  });

  it('allows the admin master role to access the users route', async () => {
    expect(RouteGuard).toBeDefined();

    renderGuard({
      component: UsersComponent,
      allowedRoles: routes.users.allowedRoles,
      currentRole: ADMIN_MASTER_ROLE,
      path: routes.users.path,
    });

    await waitFor(() => {
      expect(screen.getByText('Usuários')).toBeDefined();
    });
    expect(screen.queryByText(fallbackLabel)).toBeNull();
  });
});
