import type { Address } from '../types/address';
import type { Designacao } from '../types/designacao';
import type { PropertyType } from '../types/property-type';
import type { Street } from '../types/street';
import type { Territorio } from '../types/territorio';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, waitFor } from '@testing-library/react';

const {
  translationMock,
  useTerritoriosMock,
  useDesignacoesMock,
  useNaoEmCasaMock,
  dbMock,
  streetsData,
  addressesData,
} = vi.hoisted(() => {
  const translationMock = {
    t: vi.fn((key: string, options?: Record<string, unknown>) => {
      if (key === 'naoEmCasa.confirmConversation') {
        return options?.date
          ? `confirm-conversation ${String(options.date)}`
          : 'confirm-conversation';
      }
      if (options?.count !== undefined) {
        return `${key} (${String(options.count)})`;
      }
      if (options?.date !== undefined) {
        return `${key} ${String(options.date)}`;
      }
      if (options?.street !== undefined || options?.range !== undefined) {
        const street = options?.street ? String(options.street) : '';
        const range = options?.range ? String(options.range) : '';
        const combined = `${street}${range ? ` ${range}` : ''}`.trim();
        return combined ? `${key} ${combined}` : key;
      }
      if (options?.name !== undefined) {
        return `${key} ${String(options.name)}`;
      }
      return key;
    }),
  };

  const territoriosData: Territorio[] = [
    { id: 'territory-1', nome: 'Território 1', publisherId: 'publisher-1' },
  ];

  const designacoesData: Designacao[] = [
    {
      id: 'designacao-1',
      territorioId: 'territory-1',
      saidaId: 'saida-1',
      dataInicial: '2024-01-01',
      dataFinal: '2024-12-31',
      publisherId: 'publisher-1',
      devolvido: false,
    },
  ];

  const propertyTypesData: PropertyType[] = [{ id: 1, name: 'Residencial' }];

  const streetsData: Street[] = [
    { id: 10, territoryId: 'territory-1', name: 'Rua Principal' },
  ];

  const addressesData: Address[] = [
    { id: 100, streetId: 10, numberStart: 1, numberEnd: 1, propertyTypeId: 1 },
  ];

  const dbMock = {
    propertyTypes: {
      toArray: vi.fn(async () =>
        propertyTypesData.map((type) => ({ ...type })),
      ),
    },
    streets: {
      where: vi.fn((field: keyof Street) => {
        if (field !== 'territoryId') {
          throw new Error(`Unexpected where field: ${String(field)}`);
        }
        return {
          equals: (value: string) => ({
            async toArray() {
              return streetsData
                .filter((street) => street.territoryId === value)
                .map((street) => ({ ...street }));
            },
          }),
        };
      }),
    },
    addresses: {
      where: vi.fn((field: keyof Address) => {
        if (field !== 'streetId') {
          throw new Error(`Unexpected where field: ${String(field)}`);
        }
        return {
          equals: (value: number) => ({
            async toArray() {
              return addressesData
                .filter((address) => address.streetId === value)
                .map((address) => ({ ...address }));
            },
          }),
          anyOf: (...values: Array<number | number[]>) => {
            const normalized = values.flat();
            const allowed = new Set(normalized);
            return {
              async toArray() {
                return addressesData
                  .filter((address) => allowed.has(address.streetId))
                  .map((address) => ({ ...address }));
              },
            };
          },
        };
      }),
    },
  };

  const useTerritoriosMock = vi.fn(() => ({ territorios: territoriosData }));
  const useDesignacoesMock = vi.fn(() => ({ designacoes: designacoesData }));
  const useNaoEmCasaMock = vi.fn(() => ({
    registros: [],
    addNaoEmCasa: vi.fn(),
    updateNaoEmCasa: vi.fn(),
  }));

  return {
    translationMock,
    useTerritoriosMock,
    useDesignacoesMock,
    useNaoEmCasaMock,
    dbMock,
    streetsData,
    addressesData,
  };
});

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react');
  let stateCallCount = 0;
  const useStateOverride: typeof actual.useState = (initialState: never) => {
    stateCallCount += 1;
    if (stateCallCount === 2) {
      const preloaded = {
        'territory-1': {
          streets: streetsData.map((street) => ({ ...street })),
          addresses: addressesData.map((address) => ({ ...address })),
        },
      } as never;
      return actual.useState(preloaded);
    }
    return actual.useState(initialState);
  };
  return {
    ...actual,
    useState: useStateOverride,
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => translationMock,
}));

vi.mock('../hooks/useTerritorios', () => ({
  useTerritorios: () => useTerritoriosMock(),
}));

vi.mock('../hooks/useDesignacoes', () => ({
  useDesignacoes: () => useDesignacoesMock(),
}));

vi.mock('../hooks/useNaoEmCasa', () => ({
  useNaoEmCasa: () => useNaoEmCasaMock(),
}));

vi.mock('../services/db', () => ({
  db: dbMock,
}));

vi.mock('../utils/calendar', async () => {
  const actual =
    await vi.importActual<typeof import('../utils/calendar')>(
      '../utils/calendar',
    );
  return {
    ...actual,
    todayLocalIso: () => '2024-02-10',
    formatIsoDate: (iso: string) => `formatted-${iso}`,
  };
});

import NaoEmCasaPage from './NaoEmCasaPage';

describe('NaoEmCasaPage', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders the confirm conversation label with the formatted date', async () => {
    render(<NaoEmCasaPage />);

    await waitFor(() => {
      const checkbox = document.body.querySelector(
        'label input[type="checkbox"]',
      );
      if (!checkbox) {
        throw new Error('Checkbox not found');
      }
      const label = checkbox.closest('label');
      expect(label?.textContent?.trim()).toBe(
        'confirm-conversation formatted-2024-02-10',
      );
    });
  });
});
