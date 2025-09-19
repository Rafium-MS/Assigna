const textEncoder = new TextEncoder();

const bufferToHex = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const hexToUint8Array = (hex: string): Uint8Array | null => {
  const normalized = hex.trim().toLowerCase();
  if (normalized.length === 0 || normalized.length % 2 !== 0) {
    return null;
  }

  const length = normalized.length / 2;
  const bytes = new Uint8Array(length);

  for (let index = 0; index < length; index++) {
    const start = index * 2;
    const value = Number.parseInt(normalized.slice(start, start + 2), 16);
    if (Number.isNaN(value)) {
      return null;
    }
    bytes[index] = value;
  }

  return bytes;
};

const timingSafeEqual = (a: Uint8Array, b: Uint8Array): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let index = 0; index < a.length; index++) {
    result |= a[index] ^ b[index];
  }
  return result === 0;
};

const getSubtleCrypto = async (): Promise<SubtleCrypto> => {
  const globalCrypto = (
    globalThis as { crypto?: Crypto & { webcrypto?: Crypto } }
  ).crypto;
  const subtle = globalCrypto?.subtle ?? globalCrypto?.webcrypto?.subtle;
  if (subtle) {
    return subtle;
  }

  const processInfo = (
    globalThis as { process?: { versions?: { node?: string } } }
  ).process;
  if (typeof processInfo?.versions?.node === 'string') {
    const { webcrypto } = await import('node:crypto');
    if (webcrypto?.subtle) {
      return webcrypto.subtle;
    }
  }

  throw new Error('SubtleCrypto API is not available in this environment');
};

/**
 * Generates a SHA-256 hash for a password using the Web Crypto API.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const subtle = await getSubtleCrypto();
  const normalized = password.normalize('NFKC');
  const data = textEncoder.encode(normalized);
  const digest = await subtle.digest('SHA-256', data);
  return bufferToHex(digest);
};

/**
 * Verifies whether the provided password matches the stored hash.
 */
export const verifyPassword = async (
  password: string,
  expectedHash: string | null | undefined,
): Promise<boolean> => {
  if (typeof expectedHash !== 'string' || expectedHash.trim().length === 0) {
    return false;
  }

  const storedBytes = hexToUint8Array(expectedHash);
  if (!storedBytes) {
    return false;
  }

  const candidateHash = await hashPassword(password);
  const candidateBytes = hexToUint8Array(candidateHash);
  if (!candidateBytes) {
    return false;
  }

  return timingSafeEqual(storedBytes, candidateBytes);
};
