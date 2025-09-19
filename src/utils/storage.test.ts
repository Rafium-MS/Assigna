import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { load, save } from './storage';

type LocalStorageMock = {
  localStorageMock: Storage;
  getItem: ReturnType<typeof vi.fn>;
  setItem: ReturnType<typeof vi.fn>;
};

const createLocalStorageMock = (): LocalStorageMock => {
  const store = new Map<string, string>();
  const getItem = vi.fn((key: string) =>
    store.has(key) ? store.get(key)! : null,
  );
  const setItem = vi.fn((key: string, value: string) => {
    store.set(key, value);
  });
  const removeItem = vi.fn((key: string) => {
    store.delete(key);
  });
  const clear = vi.fn(() => {
    store.clear();
  });
  const key = vi.fn((index: number) => Array.from(store.keys())[index] ?? null);
  const localStorageMock = {
    getItem,
    setItem,
    removeItem,
    clear,
    key,
  };
  Object.defineProperty(localStorageMock, 'length', {
    get: () => store.size,
  });
  return {
    localStorageMock: localStorageMock as unknown as Storage,
    getItem,
    setItem,
  };
};

describe('storage utils', () => {
  let storageMock: LocalStorageMock;

  beforeEach(() => {
    storageMock = createLocalStorageMock();
    vi.stubGlobal('localStorage', storageMock.localStorageMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('save stores serialized values and load returns parsed data', () => {
    const payload = { id: 1, name: 'Ana' };

    save('user', payload);
    expect(storageMock.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify(payload),
    );

    const loaded = load<typeof payload>('user');
    expect(loaded).toEqual(payload);
  });

  test('load returns null when the key does not exist', () => {
    const result = load('missing');
    expect(result).toBeNull();
    expect(storageMock.getItem).toHaveBeenCalledWith('missing');
  });
});
