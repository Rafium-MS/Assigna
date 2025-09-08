// Reexporta o módulo consolidado do banco de dados (implementado em JS
// convencional) garantindo tipagem para uso nos módulos em TypeScript.
import * as RealDB from '../../../db';
import type { DB } from './types';

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

// Exporta a instância já tipada para os demais módulos.
export const db: DB = RealDB as unknown as DB;
