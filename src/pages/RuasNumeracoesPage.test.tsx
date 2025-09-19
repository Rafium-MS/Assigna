import type { Territorio } from '../types/territorio';
import type { Street } from '../types/street';
import type { PropertyType } from '../types/property-type';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';

const {
  territoriesStore,
  streetsStore,
  propertyTypesStore,
  defaultStreetsWhere,
  dbMock,
  toastMock,
  useAuthMock,
  territorioRepositoryMock
} = vi.hoisted(() => {
  const territoriesStore: Territorio[] = [];
  const streetsStore: Street[] = [];
  const propertyTypesStore: PropertyType[] = [];

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
    }
  };

  return {
    territoriesStore,
    streetsStore,
    propertyTypesStore,
    defaultStreetsWhere,
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
    signIn: vi.fn(),
    signOut: vi.fn()
  });

  territoriesStore.splice(0, territoriesStore.length, ...baseTerritories.map(territory => ({ ...territory })));
  streetsStore.splice(0, streetsStore.length, ...baseStreets.map(street => ({ ...street })));
  propertyTypesStore.splice(0, propertyTypesStore.length, ...basePropertyTypes.map(type => ({ ...type })));

  dbMock.territorios.toArray.mockClear();
  dbMock.streets.toArray.mockClear();
  dbMock.streets.where.mockClear();
  dbMock.streets.put.mockClear();
  dbMock.propertyTypes.toArray.mockClear();
  dbMock.propertyTypes.put.mockClear();
  dbMock.propertyTypes.delete.mockClear();

  territorioRepositoryMock.forPublisher.mockClear();

  toastMock.success.mockClear();
  toastMock.error.mockClear();

  dbMock.streets.where.mockImplementation(defaultStreetsWhere);
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

    expect(screen.getByText('ruasNumeracoes.summary.totalStreets (1)')).toBeTruthy();
    expect(screen.getByText('ruasNumeracoes.summary.totalPropertyTypes (2)')).toBeTruthy();
    expect(screen.queryByText('ruasNumeracoes.summary.totalAddresses')).toBeNull();
  });
});
