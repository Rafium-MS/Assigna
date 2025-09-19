import type { Territorio } from '../types/territorio';
import type { Street } from '../types/street';
import type { PropertyType } from '../types/property-type';
import type { Address } from '../types/address';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { ADDRESS_VISIT_COOLDOWN_MS } from '../constants/addresses';

const {
  territoriesStore,
  streetsStore,
  propertyTypesStore,
  addressesStore,
  defaultStreetsWhere,
  defaultAddressesWhere,
  dbMock,
  toastMock,
  useAuthMock,
  territorioRepositoryMock
} = vi.hoisted(() => {
  const territoriesStore: Territorio[] = [];
  const streetsStore: Street[] = [];
  const propertyTypesStore: PropertyType[] = [];
  const addressesStore: Address[] = [];

  const nextNumericId = (collection: Array<{ id?: number }>): number => {
    const maxId = collection.reduce((max, item) => {
      if (typeof item.id === 'number') {
        return Math.max(max, item.id);
      }
      return max;
    }, 0);
    return maxId + 1;
  };

  const defaultStreetsWhere = (field: keyof Street) => ({
    equals: (value: Street[keyof Street]) => ({
      async toArray() {
        return streetsStore
          .filter(street => street[field] === value)
          .map(street => ({ ...street }));
      }
    })
  });

  const defaultAddressesWhere = (field: keyof Address) => ({
    equals: (value: Address[keyof Address]) => ({
      async toArray() {
        return addressesStore
          .filter(address => address[field] === value)
          .map(address => ({ ...address }));
      }
    }),
    anyOf: (...values: Array<Address[keyof Address]>) => ({
      async toArray() {
        const normalizedValues = ((): Address[keyof Address][] => {
          if (values.length === 1 && Array.isArray(values[0])) {
            return values[0] as unknown as Address[keyof Address][];
          }
          return values;
        })();
        const valueSet = new Set(normalizedValues);
        return addressesStore
          .filter(address => valueSet.has(address[field]))
          .map(address => ({ ...address }));
      }
    })
  });

  const toastMock = { success: vi.fn(), error: vi.fn() };

  const useAuthMock = vi.fn();
  const territorioRepositoryMock = {
    forPublisher: vi.fn(async (publisherId: string) =>
      territoriesStore
        .filter(territory => territory.publisherId === publisherId)
        .map(territory => ({ ...territory }))
    )
  };

  const dbMock = {
    territorios: {
      toArray: vi.fn(async () => territoriesStore.map(territory => ({ ...territory })))
    },
    streets: {
      toArray: vi.fn(async () => streetsStore.map(street => ({ ...street }))),
      where: vi.fn(defaultStreetsWhere),
      put: vi.fn(async (street: Street) => {
        const id = typeof street.id === 'number' ? street.id : nextNumericId(streetsStore);
        const record: Street = { id, ...street };
        const index = streetsStore.findIndex(item => item.id === id);
        if (index >= 0) {
          streetsStore[index] = record;
        } else {
          streetsStore.push(record);
        }
        return id;
      })
    },
    propertyTypes: {
      toArray: vi.fn(async () => propertyTypesStore.map(type => ({ ...type }))),
      put: vi.fn(async (type: PropertyType) => {
        const id = typeof type.id === 'number' ? type.id : nextNumericId(propertyTypesStore);
        const record: PropertyType = { id, ...type };
        const index = propertyTypesStore.findIndex(item => item.id === id);
        if (index >= 0) {
          propertyTypesStore[index] = record;
        } else {
          propertyTypesStore.push(record);
        }
        return id;
      }),
      delete: vi.fn(async (id: number) => {
        const index = propertyTypesStore.findIndex(item => item.id === id);
        if (index >= 0) {
          propertyTypesStore.splice(index, 1);
        }
      })
    },
    addresses: {
      toArray: vi.fn(async () => addressesStore.map(address => ({ ...address }))),
      where: vi.fn(defaultAddressesWhere),
      put: vi.fn(async (address: Address) => {
        const id = typeof address.id === 'number' ? address.id : nextNumericId(addressesStore);
        const record: Address = { id, ...address };
        const index = addressesStore.findIndex(item => item.id === id);
        if (index >= 0) {
          addressesStore[index] = record;
        } else {
          addressesStore.push(record);
        }
        return id;
      }),
      update: vi.fn(async (id: number, changes: Partial<Address>) => {
        const index = addressesStore.findIndex(item => item.id === id);
        if (index >= 0) {
          addressesStore[index] = { ...addressesStore[index], ...changes };
          return 1;
        }
        return 0;
      })
    }
  };

  return {
    territoriesStore,
    streetsStore,
    propertyTypesStore,
    addressesStore,
    defaultStreetsWhere,
    defaultAddressesWhere,
    dbMock,
    toastMock,
    useAuthMock,
    territorioRepositoryMock
  };
});

vi.mock('../services/db', () => ({
  db: dbMock
}));

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock()
}));

vi.mock('../services/repositories/territorios', () => ({
  TerritorioRepository: territorioRepositoryMock
}));

vi.mock('../components/feedback/Toast', () => ({
  useToast: () => toastMock
}));

vi.mock('../components/ImageAnnotator', () => ({
  __esModule: true,
  default: ({ imageUrl }: { imageUrl: string }) => (
    <div data-testid="image-annotator">{imageUrl}</div>
  )
}));

const translationMock = vi.hoisted(() => ({
  t: (key: string, options?: Record<string, unknown>) => {
    if (options?.count !== undefined) {
      return `${key} (${options.count})`;
    }
    return key;
  }
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => translationMock
}));

import RuasNumeracoesPage from './RuasNumeracoesPage';

const baseTerritories: Territorio[] = [
  { id: 'territorio-1', nome: 'Território 1', imageUrl: 'image-1.png', publisherId: 'publisher-1' },
  { id: 'territorio-2', nome: 'Território 2', imageUrl: 'image-2.png', publisherId: 'publisher-1' }
];

const baseStreets: Street[] = [
  { id: 1, territoryId: 'territorio-1', name: 'Rua Principal' },
  { id: 2, territoryId: 'territorio-2', name: 'Avenida Secundária' }
];

const basePropertyTypes: PropertyType[] = [
  { id: 10, name: 'Casa' },
  { id: 20, name: 'Apartamento' }
];

const baseAddresses: Address[] = [
  {
    id: 100,
    streetId: 1,
    numberStart: 1,
    numberEnd: 1,
    propertyTypeId: 10,
    lastSuccessfulVisit: null,
    nextVisitAllowed: null
  },
  {
    id: 200,
    streetId: 2,
    numberStart: 100,
    numberEnd: 100,
    propertyTypeId: 20,
    lastSuccessfulVisit: null,
    nextVisitAllowed: null
  }
];

const setInputValue = (input: HTMLInputElement, value: string): void => {
  const prototype = Object.getPrototypeOf(input) as HTMLInputElement;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
  const setter = descriptor?.set ?? Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  if (setter) {
    setter.call(input, value);
  } else {
    input.value = value;
  }
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
};

const setSelectValue = (select: HTMLSelectElement, value: string): void => {
  const prototype = Object.getPrototypeOf(select) as HTMLSelectElement;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
  const setter = descriptor?.set ?? Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')?.set;
  if (setter) {
    setter.call(select, value);
  } else {
    select.value = value;
  }
  select.dispatchEvent(new Event('change', { bubbles: true }));
};

const getSelectWithinLabel = (labelText: string): HTMLSelectElement => {
  const labelNode = screen.getByText(labelText);
  const label = labelNode.closest('label');
  if (!label) {
    throw new Error(`Unable to find label element for text: ${labelText}`);
  }
  const select = label.querySelector('select');
  if (!select) {
    throw new Error(`Unable to find select for label: ${labelText}`);
  }
  return select;
};

const getInputWithinLabel = (labelText: string): HTMLInputElement => {
  const labelNode = screen.getByText(labelText);
  const label = labelNode.closest('label');
  if (!label) {
    throw new Error(`Unable to find label element for text: ${labelText}`);
  }
  const input = label.querySelector('input');
  if (!input) {
    throw new Error(`Unable to find input for label: ${labelText}`);
  }
  return input as HTMLInputElement;
};

beforeEach(() => {
  useAuthMock.mockReset();
  useAuthMock.mockReturnValue({
    currentUser: {
      id: 'publisher-1',
      role: 'admin',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
    isAuthenticated: true,
    signIn: vi.fn().mockResolvedValue(null),
    signOut: vi.fn()
  });

  territoriesStore.splice(0, territoriesStore.length, ...baseTerritories.map(territory => ({ ...territory })));
  streetsStore.splice(0, streetsStore.length, ...baseStreets.map(street => ({ ...street })));
  propertyTypesStore.splice(0, propertyTypesStore.length, ...basePropertyTypes.map(type => ({ ...type })));
  addressesStore.splice(0, addressesStore.length, ...baseAddresses.map(address => ({ ...address })));

  dbMock.territorios.toArray.mockClear();
  dbMock.streets.toArray.mockClear();
  dbMock.streets.where.mockClear();
  dbMock.streets.put.mockClear();
  dbMock.propertyTypes.toArray.mockClear();
  dbMock.propertyTypes.put.mockClear();
  dbMock.propertyTypes.delete.mockClear();
  dbMock.addresses.toArray.mockClear();
  dbMock.addresses.where.mockClear();
  dbMock.addresses.put.mockClear();
  dbMock.addresses.update.mockClear();

  territorioRepositoryMock.forPublisher.mockClear();

  toastMock.success.mockClear();
  toastMock.error.mockClear();

  dbMock.streets.where.mockImplementation(defaultStreetsWhere);
  dbMock.addresses.where.mockImplementation(defaultAddressesWhere);
});

afterEach(() => {
  cleanup();
});

describe('RuasNumeracoesPage', () => {
  it('loads data from the database and filters streets by territory', async () => {
    render(<RuasNumeracoesPage />);

    await waitFor(() => {
      expect(territorioRepositoryMock.forPublisher).toHaveBeenCalledWith('publisher-1');
    });

    await waitFor(() => {
      expect(screen.getByText('Rua Principal')).toBeTruthy();
    });

    expect(screen.queryByText('Avenida Secundária')).toBeNull();
    const streetsTab = screen.getByRole('button', { name: 'ruasNumeracoes.tabs.streets' });
    expect(streetsTab.className).toContain('font-bold');
  });

  it('adds a new street for the active territory', async () => {
    render(<RuasNumeracoesPage />);

    await waitFor(() => {
      expect(territorioRepositoryMock.forPublisher).toHaveBeenCalledWith('publisher-1');
    });

    await waitFor(() => {
      expect(screen.getByText('Rua Principal')).toBeTruthy();
    });

    const input = screen.getByPlaceholderText(
      'ruasNumeracoes.streetsForm.streetNamePlaceholder'
    ) as HTMLInputElement;
    input.value = 'Nova Rua';

    const form = input.closest('form');
    expect(form).toBeTruthy();

    await act(async () => {
      form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });

    await waitFor(() => {
      expect(screen.getByText('Nova Rua')).toBeTruthy();
    });

    expect(dbMock.streets.put).toHaveBeenCalledWith({
      territoryId: 'territorio-1',
      name: 'Nova Rua'
    });
  });

  it('creates a property type and displays it in the list', async () => {
    render(<RuasNumeracoesPage />);

    await waitFor(() => {
      expect(territorioRepositoryMock.forPublisher).toHaveBeenCalledWith('publisher-1');
    });

    const propertyTypesTab = screen.getByRole('button', {
      name: 'ruasNumeracoes.tabs.propertyTypes'
    });

    await act(async () => {
      propertyTypesTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const input = screen.getByPlaceholderText(
      'ruasNumeracoes.propertyTypesForm.namePlaceholder'
    ) as HTMLInputElement;
    input.value = 'Residencial Nova';

    const form = input.closest('form');
    expect(form).toBeTruthy();

    await act(async () => {
      form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(dbMock.propertyTypes.put).toHaveBeenCalledWith({ name: 'Residencial Nova' });
    });

    await waitFor(() => {
      expect(screen.getByText('Residencial Nova')).toBeTruthy();
    });

    await waitFor(() => {
      expect(toastMock.success).toHaveBeenCalledWith('ruasNumeracoes.feedback.createSuccess');
    });
  });

  it('edits an existing property type', async () => {
    render(<RuasNumeracoesPage />);

    await waitFor(() => {
      expect(territorioRepositoryMock.forPublisher).toHaveBeenCalledWith('publisher-1');
    });

    const propertyTypesTab = screen.getByRole('button', {
      name: 'ruasNumeracoes.tabs.propertyTypes'
    });

    await act(async () => {
      propertyTypesTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await waitFor(() => {
      expect(screen.getByText('Casa')).toBeTruthy();
    });
    const targetCell = screen.getByText('Casa');
    const targetRow = targetCell.closest('tr');
    expect(targetRow).not.toBeNull();

    const editButton = screen
      .getAllByRole('button', { name: 'common.edit' })
      .find(button => button.closest('tr') === targetRow);
    expect(editButton).toBeDefined();

    await act(async () => {
      editButton!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const editInput = targetRow!.querySelector('input') as HTMLInputElement;

    await act(async () => {
      setInputValue(editInput, 'Casa Atualizada');
      await Promise.resolve();
    });

    const saveButton = screen
      .getAllByRole('button', { name: 'common.save' })
      .find(button => button.closest('tr') === targetRow);
    expect(saveButton).toBeDefined();

    await act(async () => {
      saveButton!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(dbMock.propertyTypes.put).toHaveBeenCalledWith({ id: 10, name: 'Casa Atualizada' });
    });

    await waitFor(() => {
      expect(screen.getByText('Casa Atualizada')).toBeTruthy();
    });

    await waitFor(() => {
      expect(toastMock.success).toHaveBeenCalledWith('ruasNumeracoes.feedback.updateSuccess');
    });
  });

  it('deletes a property type', async () => {
    render(<RuasNumeracoesPage />);

    await waitFor(() => {
      expect(territorioRepositoryMock.forPublisher).toHaveBeenCalledWith('publisher-1');
    });

    const propertyTypesTab = screen.getByRole('button', {
      name: 'ruasNumeracoes.tabs.propertyTypes'
    });

    await act(async () => {
      propertyTypesTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await waitFor(() => {
      expect(screen.getByText('Apartamento')).toBeTruthy();
    });
    const targetCell = screen.getByText('Apartamento');
    const targetRow = targetCell.closest('tr');
    expect(targetRow).not.toBeNull();

    const deleteButton = screen
      .getAllByRole('button', { name: 'common.delete' })
      .find(button => button.closest('tr') === targetRow);
    expect(deleteButton).toBeDefined();

    await act(async () => {
      deleteButton!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(dbMock.propertyTypes.delete).toHaveBeenCalledWith(20);
    });

    await waitFor(() => {
      expect(screen.queryByText('Apartamento')).toBeNull();
    });

    await waitFor(() => {
      expect(toastMock.success).toHaveBeenCalledWith('ruasNumeracoes.feedback.deleteSuccess');
    });
  });

  it('displays a summary with street and property type counts', async () => {
    render(<RuasNumeracoesPage />);

    await waitFor(() => {
      expect(territorioRepositoryMock.forPublisher).toHaveBeenCalledWith('publisher-1');
    });

    const summaryTab = screen.getByRole('button', {
      name: 'ruasNumeracoes.tabs.summary'
    });

    await act(async () => {
      summaryTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await waitFor(() => {
      expect(screen.getByText('ruasNumeracoes.summary.totalStreets (1)')).toBeTruthy();
      expect(screen.getByText('ruasNumeracoes.summary.totalAddresses (1)')).toBeTruthy();
      expect(screen.getByText('ruasNumeracoes.summary.totalPropertyTypes (2)')).toBeTruthy();
    });
  });

  it('lists addresses for the active territory', async () => {
    render(<RuasNumeracoesPage />);

    await waitFor(() => {
      expect(territorioRepositoryMock.forPublisher).toHaveBeenCalledWith('publisher-1');
    });

    const addressesTab = screen.getByRole('button', {
      name: 'ruasNumeracoes.tabs.addresses'
    });

    await act(async () => {
      addressesTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await waitFor(() => {
      const rows = Array.from(document.querySelectorAll('table tbody tr'));
      expect(rows).toHaveLength(1);
    });

    const rows = Array.from(document.querySelectorAll('table tbody tr'));
    const [row] = rows;
    const rowText = row.textContent ?? '';
    expect(rowText).toContain('Rua Principal');
    expect(rowText).toContain('1');
    expect(rowText).toContain('Casa');
    expect(rowText).toContain('ruasNumeracoes.addressesTable.neverVisited');
    expect(rowText).toContain('ruasNumeracoes.addressesTable.cooldownNotScheduled');
    expect(rowText).not.toContain('200');
  });

  it('creates an address for the current territory', async () => {
    render(<RuasNumeracoesPage />);

    await waitFor(() => {
      expect(territorioRepositoryMock.forPublisher).toHaveBeenCalledWith('publisher-1');
    });

    const addressesTab = screen.getByRole('button', {
      name: 'ruasNumeracoes.tabs.addresses'
    });

    await act(async () => {
      addressesTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const streetSelect = getSelectWithinLabel('ruasNumeracoes.addressesForm.selectStreet');
    const typeSelect = getSelectWithinLabel('ruasNumeracoes.addressesForm.selectType');
    const numberInput = getInputWithinLabel('ruasNumeracoes.addressesForm.number');

    setSelectValue(streetSelect, '1');
    setSelectValue(typeSelect, '20');
    setInputValue(numberInput, '50');

    const form = streetSelect.closest('form');
    expect(form).toBeTruthy();

    await act(async () => {
      form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });

    await waitFor(() => {
      expect(dbMock.addresses.put).toHaveBeenCalledWith({
        streetId: 1,
        numberStart: 50,
        numberEnd: 50,
        propertyTypeId: 20
      });
    });

    await waitFor(() => {
      const rows = Array.from(document.querySelectorAll('table tbody tr'));
      const hasNewRow = rows.some(row => row.textContent?.includes('50'));
      expect(hasNewRow).toBe(true);
    });
  });

  it('marks an address as successfully visited', async () => {
    vi.useFakeTimers();
    const now = new Date('2024-05-01T12:00:00.000Z');
    vi.setSystemTime(now);

    try {
      render(<RuasNumeracoesPage />);

      await waitFor(() => {
        expect(territorioRepositoryMock.forPublisher).toHaveBeenCalledWith('publisher-1');
      });

      const addressesTab = screen.getByRole('button', {
        name: 'ruasNumeracoes.tabs.addresses'
      });

      await act(async () => {
        addressesTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      await waitFor(() => {
        expect(
          screen.getByRole('button', {
            name: 'ruasNumeracoes.addressesTable.markVisit'
          })
        ).toBeTruthy();
      });

      const markButton = screen.getByRole('button', {
        name: 'ruasNumeracoes.addressesTable.markVisit'
      });

      await act(async () => {
        markButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      const expectedLast = now.toISOString();
      const expectedNext = new Date(
        now.getTime() + ADDRESS_VISIT_COOLDOWN_MS
      ).toISOString();

      await waitFor(() => {
        expect(dbMock.addresses.update).toHaveBeenCalledWith(100, {
          lastSuccessfulVisit: expectedLast,
          nextVisitAllowed: expectedNext
        });
      });
    } finally {
      vi.useRealTimers();
    }
  });
});
