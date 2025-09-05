// Reexporta o módulo real do DB, mas em ESM/TS, e já tipa a interface.
// Ajuste o caminho real do seu módulo DB aqui:
import * as RealDB from '../../../db/db';

export type { DB, QueryResult, Tx } from './types';

// Opcional: validação leve/guard (caso o RealDB não exponha algo em dev)
function ensure<T extends object>(obj: T, keys: (keyof T)[]) {
  for (const k of keys) {
    if (!(k in obj)) throw new Error(`DB: método ausente: ${String(k)}`);
  }
}

// Enumere os métodos “públicos” que você usa nos controllers:
ensure(RealDB as any, [
  'connect', 'disconnect', 'query', 'transaction',
  // 'migrate', 'seed', ... se existirem
]);

export const db = RealDB;
