import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';

import type { Territorio } from '../types/territorio';
import type { Street } from '../types/street';

const {
  useAuthMock,
  toastMock,
  territorioRepositoryMock,
  dbMock,
  translationMock,
  requestedStreetTerritories,
  requestedAddressStreetIds,
} = vi.hoisted(() => {
  const currentUser = {
    id: 'publisher-1',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  } as const;

  const territoriesSeed: Territorio[] = [
    { id: 'territory-1', nome: 'Norte', publisherId: currentUser.id, imageUrl: 'norte.png' },
    { id: 'territory-2', nome: 'Sul', publisherId: 'publisher-2', imageUrl: 'sul.png' },
  ];

  const streetsSeed: Street[] = [
    { id: 1, territoryId: 'territory-1', name: 'Rua Norte 1' },
    { id: 2, territoryId: 'territory-2', name: 'Rua Sul 1' },
  ];

  const requestedStreetTerritories: string[] = [];

  const useAuthMock = vi.fn(() => ({
    currentUser,
    isAuthenticated: true,
    signIn: vi.fn(),
    signOut: vi.fn(),
  }));

  const toastMock = { success: vi.fn(), error: vi.fn() };

  const territorioRepositoryMock = {
    forPublisher: vi.fn(async (publisherId: string) =>
      territoriesSeed
        .filter((territory) => territory.publisherId === publisherId)
        .map((territory) => ({ ...territory }))
    ),
  };

  const dbMock = {
    propertyTypes: {
      toArray: vi.fn(async () => [{ id: 10, name: 'Residencial' }]),
    },
    streets: {
      where: vi.fn((field: keyof Street) => ({
        equals: (value: Street[keyof Street]) => {
          if (field === 'territoryId' && typeof value === 'string') {
            requestedStreetTerritories.push(value);
          }
          return {
            async toArray() {
              return streetsSeed
                .filter((street) => street[field] === value)
                .map((street) => ({ ...street }));
            },
          };
        },
      })),
      put: vi.fn(),
    },
  };

  const translationMock = {
    t: (key: string) => key,
  };

  return {
    useAuthMock,
    toastMock,
    territorioRepositoryMock,
    dbMock,
    translationMock,
    requestedStreetTerritories,
  };
});

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../services/repositories/territorios', () => ({
  TerritorioRepository: territorioRepositoryMock,
}));

vi.mock('../services/db', () => ({
  db: dbMock,
}));

vi.mock('../components/feedback/Toast', () => ({
  useToast: () => toastMock,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => translationMock,
}));

vi.mock('../components/ImageAnnotator', () => ({
  __esModule: true,
  default: () => <div>Annotator</div>,
}));

import RuasNumeracoesPage from './RuasNumeracoesPage';

const publisherId = 'publisher-1';

describe('RuasNumeracoesPage publisher scoping', () => {
  afterEach(() => {
    cleanup();
    requestedStreetTerritories.length = 0;
    vi.clearAllMocks();
  });

  it('loads only the current publisher territories and streets', async () => {
    render(<RuasNumeracoesPage />);

    await waitFor(() => {
      expect(territorioRepositoryMock.forPublisher).toHaveBeenCalledWith(publisherId);
    });

    const territorySelect = document.getElementById('territory-select') as HTMLSelectElement | null;
    expect(territorySelect).not.toBeNull();
    const optionLabels = Array.from(territorySelect!.options).map((option) => option.textContent);
    expect(optionLabels).toContain('Norte');
    expect(optionLabels).not.toContain('Sul');

    await waitFor(() => {
      expect(screen.getByText('Rua Norte 1')).toBeTruthy();
    });
    expect(screen.queryByText('Rua Sul 1')).toBeNull();

    expect(requestedStreetTerritories).toEqual(['territory-1']);
  });
});
