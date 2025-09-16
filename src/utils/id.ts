/**
 * Generates a unique ID using the crypto.randomUUID() method.
 * @returns A unique ID string.
 */
export const generateId = (): string => crypto.randomUUID();
