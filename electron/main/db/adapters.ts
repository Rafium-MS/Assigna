import { DB, QueryParams, QueryResult, Tx } from './types';

// sqlite3 não possui tipagens padrão no projeto, então usamos require
// para obter a instância e ativar o modo verbose para melhor depuração.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sqlite3 = require('sqlite3').verbose();

/**
 * Interface estendida de `DB` que expõe a propriedade `lastID` em queries de
 * escrita. Isso é útil para recuperar o identificador do último registro
 * inserido em operações `INSERT`.
 */
export interface SQLiteDB extends DB {
  query<Row = any>(
    sql: string,
    params?: QueryParams
  ): Promise<QueryResult<Row> & { lastID?: number }>;
}

/**
 * Cria um adaptador simplificado para o driver `sqlite3`, expondo a interface
 * `DB` utilizada pelo restante da aplicação.
 */
export function sqliteAdapter(filename: string): SQLiteDB {
  let database: any = null;

  function connect() {
    if (!database) {
      database = new sqlite3.Database(filename);
    }
  }

  function disconnect() {
    if (database) {
      database.close();
      database = null;
    }
  }

  function run(sql: string, params: QueryParams = []) {
    return new Promise<{ changes: number; lastID?: number }>((resolve, reject) => {
      database.run(sql, params as any, function (err: any) {
        if (err) return reject(err);
        resolve({ changes: this.changes, lastID: this.lastID });
      });
    });
  }

  function all(sql: string, params: QueryParams = []) {
    return new Promise<any[]>((resolve, reject) => {
      database.all(sql, params as any, (err: any, rows: any[]) => {
        if (err) return reject(err);
        resolve(rows || []);
      });
    });
  }

  async function query<Row = any>(
    sql: string,
    params: QueryParams = []
  ): Promise<QueryResult<Row> & { lastID?: number }> {
    if (!database) connect();
    const isSelect = /^\s*select/i.test(sql);
    if (isSelect) {
      const rows = await all(sql, params);
      return { rows, rowCount: rows.length };
    }
    const result = await run(sql, params);
    return { rows: [], rowCount: result.changes, lastID: result.lastID };
  }

  async function transaction<T>(fn: (tx: Tx) => Promise<T>): Promise<T> {
    await query('BEGIN');
    try {
      const res = await fn({ query });
      await query('COMMIT');
      return res;
    } catch (err) {
      await query('ROLLBACK');
      throw err;
    }
  }

  return { connect, disconnect, query, transaction };
}

