/**
 * Saves a value to local storage.
 * @param key The key to save the value under.
 * @param value The value to save.
 * @template T The type of the value.
 */
export const save = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Loads a value from local storage.
 * @param key The key to load the value from.
 * @returns The loaded value, or null if the key is not found.
 * @template T The type of the value.
 */
export const load = <T>(key: string): T | null => {
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : null;
};
