import type { Territorio } from '../types/territorio';
import type { Street } from '../types/street';
import type { PropertyType } from '../types/property-type';
import type { Address } from '../types/address';
import type { AddressForm } from './RuasNumeracoesPage';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';

const {
  territoriesStore,
  streetsStore,
  propertyTypesStore,
  addressesStore,
  defaultStreetsWhere,
  defaultAddressesWhere,
  dbMock,
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
          .filter((street) => street[field] === value)
          .map((street) => ({ ...street }));
      },
    }),
  });

  const defaultAddressesWhere = (field: keyof Address) => ({
    anyOf: (values: number[]) => ({
      async toArray() {
        const allowed = new Set(values);
        return addressesStore
          .filter((address) => allowed.has(address[field] as number))
          .map((address) => ({ ...address }));
      },
    }),
  });

  const dbMock = {
    territorios: {
      toArray: vi.fn(async () => territoriesStore.map((territory) => ({ ...territory }))),
    },
    streets: {
      toArray: vi.fn(async () => streetsStore.map((street) => ({ ...street }))),
      where: vi.fn(defaultStreetsWhere),
      put: vi.fn(async (street: Street) => {
        const id = typeof street.id === 'number' ? street.id : nextNumericId(streetsStore);
        const record: Street = { id, ...street };
        const index = streetsStore.findIndex((item) => item.id === id);
        if (index >= 0) {
          streetsStore[index] = record;
        } else {
          streetsStore.push(record);
        }
        return id;
      }),
    },
    propertyTypes: {
      toArray: vi.fn(async () => propertyTypesStore.map((type) => ({ ...type }))),
    },
    addresses: {
      toArray: vi.fn(async () => addressesStore.map((address) => ({ ...address }))),
      where: vi.fn(defaultAddressesWhere),
      put: vi.fn(async (address: Address) => {
        const id = typeof address.id === 'number' ? address.id : nextNumericId(addressesStore);
        const record: Address = { id, ...address };
        const index = addressesStore.findIndex((item) => item.id === id);
        if (index >= 0) {
          addressesStore[index] = record;
        } else {
          addressesStore.push(record);
        }
        return id;
      }),
    },
  };

  return {
    territoriesStore,
    streetsStore,
    propertyTypesStore,
    addressesStore,
    defaultStreetsWhere,
    defaultAddressesWhere,
    dbMock,
  };
});

vi.mock('../services/db', () => ({
  db: dbMock,
}));

vi.mock('../components/ImageAnnotator', () => ({
  __esModule: true,
  default: ({
    onAdd,
    onUpdate,
    onDelete,
  }: {
    onAdd?: () => void;
    onUpdate?: () => void;
    onDelete?: () => void;
  }) => (
    <div>
      <button type="button" data-testid="annotator-add" onClick={() => onAdd?.()}>
        Annotator Add
      </button>
      <button type="button" data-testid="annotator-update" onClick={() => onUpdate?.()}>
        Annotator Update
      </button>
      <button type="button" data-testid="annotator-delete" onClick={() => onDelete?.()}>
        Annotator Delete
      </button>
    </div>
  ),
}));

vi.mock('react-hook-form', () => ({
  useForm: () => {
    const values: Partial<AddressForm> = {};

    const register = (name: keyof AddressForm) => {
      const handler = (event: Event) => {
        const target = event.target as HTMLInputElement | HTMLSelectElement;
        values[name] = target.value as never;
      };

      return {
        name,
        onChange: handler,
        onInput: handler,
      };
    };

    const toNumber = (value: unknown): number => {
      return value === undefined || value === '' ? NaN : Number(value);
    };

    const handleSubmit = (callback: (data: AddressForm) => unknown) => async (event?: Event) => {
      event?.preventDefault();
      await callback({
        streetId: toNumber(values.streetId),
        propertyTypeId: toNumber(values.propertyTypeId),
        numberStart: toNumber(values.numberStart),
        numberEnd: toNumber(values.numberEnd),
        id: values.id === undefined ? undefined : toNumber(values.id),
      });
    };

    const reset = () => {
      Object.keys(values).forEach((key) => {
        values[key as keyof AddressForm] = undefined as never;
      });
    };

    return { register, handleSubmit, reset };
  },
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      if (options?.count !== undefined) {
        return `${key} (${options.count})`;
      }
      return key;
    },
  }),
}));

import RuasNumeracoesPage from './RuasNumeracoesPage';

const baseTerritories: Territorio[] = [
  { id: 'territorio-1', nome: 'Território 1', imageUrl: 'image-1.png' },
  { id: 'territorio-2', nome: 'Território 2', imageUrl: 'image-2.png' },
];

const baseStreets: Street[] = [
  { id: 1, territoryId: 'territorio-1', name: 'Rua Principal' },
  { id: 2, territoryId: 'territorio-2', name: 'Avenida Secundária' },
];

const basePropertyTypes: PropertyType[] = [
  { id: 10, name: 'Casa' },
  { id: 20, name: 'Apartamento' },
];

const baseAddresses: Address[] = [
  { id: 5, streetId: 1, numberStart: 1, numberEnd: 10, propertyTypeId: 10 },
];

beforeEach(() => {
  territoriesStore.splice(0, territoriesStore.length, ...baseTerritories.map((territory) => ({ ...territory })));
  streetsStore.splice(0, streetsStore.length, ...baseStreets.map((street) => ({ ...street })));
  propertyTypesStore.splice(
    0,
    propertyTypesStore.length,
    ...basePropertyTypes.map((type) => ({ ...type })),
  );
  addressesStore.splice(0, addressesStore.length, ...baseAddresses.map((address) => ({ ...address })));

  dbMock.territorios.toArray.mockClear();
  dbMock.streets.toArray.mockClear();
  dbMock.streets.where.mockClear();
  dbMock.streets.put.mockClear();
  dbMock.propertyTypes.toArray.mockClear();
  dbMock.addresses.toArray.mockClear();
  dbMock.addresses.where.mockClear();
  dbMock.addresses.put.mockClear();

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
      expect(dbMock.territorios.toArray).toHaveBeenCalled();
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
      expect(dbMock.territorios.toArray).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Rua Principal')).toBeTruthy();
    });

    const input = screen.getByPlaceholderText(
      'ruasNumeracoes.streetsForm.streetNamePlaceholder',
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
      name: 'Nova Rua',
    });
  });

  it('focuses the addresses tab via annotator callbacks and saves new addresses', async () => {
    render(<RuasNumeracoesPage />);

    await waitFor(() => {
      expect(dbMock.territorios.toArray).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Rua Principal')).toBeTruthy();
    });

    const streetsTab = screen.getByRole('button', { name: 'ruasNumeracoes.tabs.streets' });
    const addressesTab = screen.getByRole('button', { name: 'ruasNumeracoes.tabs.addresses' });

    expect(streetsTab.className).toContain('font-bold');

    await act(async () => {
      screen.getByTestId('annotator-add').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(addressesTab.className).toContain('font-bold');

    await act(async () => {
      streetsTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(streetsTab.className).toContain('font-bold');

    await act(async () => {
      screen.getByTestId('annotator-update').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(addressesTab.className).toContain('font-bold');

    await act(async () => {
      streetsTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(streetsTab.className).toContain('font-bold');

    await act(async () => {
      screen.getByTestId('annotator-delete').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(addressesTab.className).toContain('font-bold');

    const streetSelect = document.querySelector('select[name="streetId"]') as HTMLSelectElement | null;
    const propertyTypeSelect = document.querySelector('select[name="propertyTypeId"]') as HTMLSelectElement | null;

    expect(streetSelect).not.toBeNull();
    expect(propertyTypeSelect).not.toBeNull();

    await act(async () => {
      streetSelect!.value = '1';
      streetSelect!.dispatchEvent(new Event('change', { bubbles: true }));
    });

    await act(async () => {
      propertyTypeSelect!.value = '10';
      propertyTypeSelect!.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const numberStartInput = screen.getByPlaceholderText(
      'ruasNumeracoes.addressesForm.numberStart',
    ) as HTMLInputElement;
    const numberEndInput = screen.getByPlaceholderText(
      'ruasNumeracoes.addressesForm.numberEnd',
    ) as HTMLInputElement;

    await act(async () => {
      numberStartInput.value = '100';
      numberStartInput.dispatchEvent(new Event('input', { bubbles: true }));
      numberStartInput.dispatchEvent(new Event('change', { bubbles: true }));
    });

    await act(async () => {
      numberEndInput.value = '200';
      numberEndInput.dispatchEvent(new Event('input', { bubbles: true }));
      numberEndInput.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const saveButton = screen.getByRole('button', { name: 'common.save' }) as HTMLButtonElement;

    await act(async () => {
      saveButton.click();
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(dbMock.addresses.put).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('200')).toBeTruthy();
    });

    expect(dbMock.addresses.put).toHaveBeenCalledWith({
      streetId: 1,
      propertyTypeId: 10,
      numberStart: 100,
      numberEnd: 200,
    });
  });

  it('filters addresses for the active territory and updates the summary counts', async () => {
    addressesStore.push({
      id: 6,
      streetId: 2,
      numberStart: 20,
      numberEnd: 30,
      propertyTypeId: 20,
    });

    const originalImplementation = dbMock.addresses.where.getMockImplementation();

    dbMock.addresses.where.mockImplementation((_field: keyof Address) => ({
      anyOf: () => ({
        async toArray() {
          // Return all addresses regardless of the provided filter to simulate stale data.
          return addressesStore.map((address) => ({ ...address }));
        },
      }),
    }));

    try {
      render(<RuasNumeracoesPage />);

      await waitFor(() => {
        expect(dbMock.territorios.toArray).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(screen.getByText('Rua Principal')).toBeTruthy();
      });

      const addressesTab = screen.getByRole('button', { name: 'ruasNumeracoes.tabs.addresses' });

      await act(async () => {
        addressesTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(screen.getByText('Rua Principal')).toBeTruthy();
      expect(screen.queryByText('Avenida Secundária')).toBeNull();

      const summaryTab = screen.getByRole('button', { name: 'ruasNumeracoes.tabs.summary' });

      await act(async () => {
        summaryTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(screen.getByText('ruasNumeracoes.summary.totalStreets (1)')).toBeTruthy();
      expect(screen.getByText('ruasNumeracoes.summary.totalAddresses (1)')).toBeTruthy();
      expect(screen.getByText('ruasNumeracoes.summary.totalPropertyTypes (1)')).toBeTruthy();
    } finally {
      if (originalImplementation) {
        dbMock.addresses.where.mockImplementation(originalImplementation);
      } else {
        dbMock.addresses.where.mockImplementation(defaultAddressesWhere);
      }
    }
  });
});
