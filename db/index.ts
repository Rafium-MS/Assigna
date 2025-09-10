import path from 'path';
import logger from '../logger';
import { sqliteAdapter, SQLiteDB } from '../electron/main/db/adapters';
import type { QueryParams, QueryResult, Tx } from '../electron/main/db/types';

const dbPath = process.env.DB_PATH || path.resolve(__dirname, 'db.sqlite');
const adapter: SQLiteDB = sqliteAdapter(dbPath);

let initialized = false;

async function initialize() {
  await adapter.query(`
    CREATE TABLE IF NOT EXISTS territorios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      latitude REAL,
      longitude REAL
    )
  `);

  await adapter.query(`
    CREATE TABLE IF NOT EXISTS enderecos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      territorio_id INTEGER,
      rua TEXT,
      numero TEXT,
      FOREIGN KEY (territorio_id) REFERENCES territorios(id)
    )
  `);

  const info = await adapter.query<{ name: string }>('PRAGMA table_info(territorios)');
  const cols = info.rows.map(r => r.name);
  if (!cols.includes('latitude')) {
    await adapter.query('ALTER TABLE territorios ADD COLUMN latitude REAL');
  }
  if (!cols.includes('longitude')) {
    await adapter.query('ALTER TABLE territorios ADD COLUMN longitude REAL');
  }

  await adapter.query(`
    CREATE TABLE IF NOT EXISTS saidas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      dia_semana TEXT NOT NULL
    )
  `);

  await adapter.query(`
    CREATE TABLE IF NOT EXISTS designacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      territorio_id INTEGER,
      saida_id INTEGER,
      data_designacao TEXT,
      data_devolucao TEXT,
      FOREIGN KEY (territorio_id) REFERENCES territorios(id),
      FOREIGN KEY (saida_id) REFERENCES saidas(id)
    )
  `);

  await adapter.query(`
    CREATE TABLE IF NOT EXISTS visitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      territorio_id INTEGER,
      data_visita TEXT,
      FOREIGN KEY (territorio_id) REFERENCES territorios(id)
    )
  `);

  logger.info('✅ Banco de dados inicializado com sucesso!');
}

async function ensure() {
  if (!initialized) {
    adapter.connect();
    await initialize();
    initialized = true;
  }
}

export async function connect() {
  await ensure();
}

export function disconnect() {
  adapter.disconnect();
  initialized = false;
}

export async function query<Row = any>(
  sql: string,
  params: QueryParams = []
): Promise<QueryResult<Row> & { lastID?: number }> {
  await ensure();
  return adapter.query<Row>(sql, params);
}

export async function transaction<T>(fn: (tx: Tx) => Promise<T>): Promise<T> {
  await ensure();
  return adapter.transaction(fn);
}

const db: SQLiteDB = { connect, disconnect, query, transaction };
export = db;

