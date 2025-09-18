import type { ComponentType } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';

import { RouteGuard } from './App';
import { routes } from './routes';

describe('RouteGuard', () => {
  const fallbackLabel = 'Acesso negado';
  const ManagementComponent = () => <div>Gestão</div>;
  const LettersComponent = () => <div>Cartas</div>;

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
});
