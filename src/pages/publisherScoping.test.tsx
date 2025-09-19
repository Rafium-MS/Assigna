import type { ReactNode } from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { cleanup, render, waitFor } from '@testing-library/react';

import type { BuildingVillage } from '../types/building_village';
import type { Territorio } from '../types/territorio';
import type { AuthUser } from '../store/appReducer';

const {
  useAuthMock,
  toastMock,
  confirmMock,
  buildingVillageRepositoryMock,
  territorioRepositoryMock,
  translationMock,
} = vi.hoisted(() => {
  const currentUser: AuthUser = {
    id: 'publisher-1',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  const villagesSeed: BuildingVillage[] = [
    {
      id: 'bv-1',
      territory_id: 'territory-1',
      publisherId: 'publisher-1',
      name: 'Alpha Tower',
      address_line: 'Av. Central, 100',
      type: 'building',
      number: '100',
      residences_count: 20,
      modality: 'vertical',
      reception_type: 'concierge',
      responsible: 'Alice',
      contact_method: 'Email',
      letter_status: 'sent',
      letter_history: [
        {
          id: 'letter-1',
          status: 'sent',
          sent_at: '2024-05-05',
          notes: 'Delivered',
        },
      ],
      assigned_at: '2024-05-01',
      returned_at: null,
      block: 'A',
      notes: 'Main lobby access',
      created_at: '2024-05-01',
    },
    {
      id: 'bv-2',
      territory_id: 'territory-2',
      publisherId: 'publisher-2',
      name: 'Beta Plaza',
      address_line: 'Rua Secundária, 200',
      type: 'building',
      number: '200',
      residences_count: 12,
      modality: 'vertical',
      reception_type: 'concierge',
      responsible: 'Bob',
      contact_method: 'Phone',
      letter_status: 'responded',
      letter_history: [
        {
          id: 'letter-2',
          status: 'responded',
          sent_at: '2024-04-10',
          notes: 'Confirmed',
        },
      ],
      assigned_at: '2024-04-01',
      returned_at: null,
      block: null,
      notes: null,
      created_at: '2024-04-01',
    },
    {
      id: 'bv-3',
      territory_id: 'territory-1',
      publisherId: 'publisher-1',
      name: 'Gamma Court',
      address_line: 'Praça das Flores, 50',
      type: 'village',
      number: '50',
      residences_count: 8,
      modality: 'horizontal',
      reception_type: 'gate',
      responsible: 'Alice',
      contact_method: 'Phone',
      letter_status: 'in_progress',
      letter_history: [],
      assigned_at: null,
      returned_at: null,
      block: 'B',
      notes: null,
      created_at: '2024-05-02',
    },
  ];

  const territoriesSeed: Territorio[] = [
    { id: 'territory-1', nome: 'Norte', publisherId: 'publisher-1' },
    { id: 'territory-2', nome: 'Sul', publisherId: 'publisher-2' },
  ];

  const useAuthMock = vi.fn(() => ({
    currentUser,
    isAuthenticated: true,
    signIn: vi.fn(),
    signOut: vi.fn(),
  }));

  const toastMock = { success: vi.fn(), error: vi.fn() };
  const confirmMock = vi.fn(async () => true);

  const cloneVillage = (village: BuildingVillage): BuildingVillage => ({
    ...village,
    letter_history: village.letter_history.map((entry) => ({ ...entry })),
  });

  const buildingVillageRepositoryMock = {
    forPublisher: vi.fn(async (publisherId: string) =>
      villagesSeed
        .filter((village) => village.publisherId === publisherId)
        .map((village) => cloneVillage(village)),
    ),
    add: vi.fn(),
    bulkAdd: vi.fn(),
    remove: vi.fn(),
    clear: vi.fn(),
  };

  const territorioRepositoryMock = {
    forPublisher: vi.fn(async (publisherId: string) =>
      territoriesSeed
        .filter((territory) => territory.publisherId === publisherId)
        .map((territory) => ({ ...territory })),
    ),
  };

  const translationMock = {
    t: (key: string, options?: Record<string, unknown>) => {
      if (!options) return key;
      return `${key} ${Object.values(options).join(' ')}`;
    },
  };

  return {
    useAuthMock,
    toastMock,
    confirmMock,
    buildingVillageRepositoryMock,
    territorioRepositoryMock,
    translationMock,
  };
});

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../components/feedback/Toast', () => ({
  useToast: () => toastMock,
}));

vi.mock('../components/feedback/ConfirmDialog', () => ({
  useConfirm: () => confirmMock,
}));

vi.mock('../components/layout/Modal', () => ({
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock('../services/repositories/buildings_villages', () => ({
  BuildingVillageRepository: buildingVillageRepositoryMock,
}));

vi.mock('../services/repositories/territorios', () => ({
  TerritorioRepository: territorioRepositoryMock,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => translationMock,
}));

let PrediosVilas: (typeof import('./PrediosVilas'))['default'];
let CartasPage: (typeof import('./CartasPage'))['default'];

beforeAll(async () => {
  ({ default: PrediosVilas } = await import('./PrediosVilas'));
  ({ default: CartasPage } = await import('./CartasPage'));
});

describe('Publisher scoping in pages', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('loads only the current publisher records in PrediosVilas', async () => {
    render(<PrediosVilas />);

    await waitFor(() => {
      expect(buildingVillageRepositoryMock.forPublisher).toHaveBeenCalledWith(
        'publisher-1',
      );
    });

    await waitFor(() => {
      const bodyText = document.body.textContent ?? '';
      expect(bodyText).toMatch(/Alpha Tower/);
      expect(bodyText).toMatch(/Gamma Court/);
    });

    expect(document.body.textContent ?? '').not.toMatch(/Beta Plaza/);
    expect(territorioRepositoryMock.forPublisher).toHaveBeenCalledWith(
      'publisher-1',
    );
  });

  it('groups only the current publisher records in CartasPage', async () => {
    render(<CartasPage />);

    await waitFor(() => {
      expect(buildingVillageRepositoryMock.forPublisher).toHaveBeenCalledWith(
        'publisher-1',
      );
    });

    await waitFor(() => {
      expect(document.body.textContent ?? '').toMatch(/Alice/);
    });

    expect(document.body.textContent ?? '').not.toMatch(/Bob/);
    expect(territorioRepositoryMock.forPublisher).toHaveBeenCalledWith(
      'publisher-1',
    );
  });
});
