declare module 'node:crypto' {
  export const webcrypto: {
    subtle: SubtleCrypto;
  };
}
