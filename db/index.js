const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const logger = require('../logger');

const dbPath = process.env.DB_PATH || path.resolve(__dirname, 'db.sqlite');
let db;

function connect() {
  if (!db) {
    db = new sqlite3.Database(dbPath);
    inicializarBanco(db);
  }
  return db;
}

function disconnect() {
  if (db) {
    db.close();
    db = null;
  }
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    connect().all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows || []);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    connect().get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    connect().run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes, lastID: this.lastID });
    });
  });
}

async function query(sql, params = []) {
  const isSelect = /^\s*select/i.test(sql);
  if (isSelect) {
    const rows = await all(sql, params);
    return { rows, rowCount: rows.length };
  }
  const result = await run(sql, params);
  return { rows: [], rowCount: result.changes, lastID: result.lastID };
}

async function transaction(fn) {
  await run('BEGIN');
  try {
    const result = await fn({ query });
    await run('COMMIT');
    return result;
  } catch (err) {
    await run('ROLLBACK');
    throw err;
  }
}

function inicializarBanco(database) {
  database.serialize(() => {
    // Criar tabelas se não existirem
    database.run(`
    CREATE TABLE IF NOT EXISTS territorios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        latitude REAL,
        longitude REAL
            )
        `);
    database.run(`
    CREATE TABLE IF NOT EXISTS enderecos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        territorio_id INTEGER,
        rua TEXT,
        numero TEXT,
        FOREIGN KEY (territorio_id) REFERENCES territorios(id)
    )
        `);
    // Adiciona colunas de coordenadas se estiver usando um banco existente
    database.all("PRAGMA table_info(territorios)", (err, rows) => {
      if (!err) {
        const cols = rows.map(r => r.name);
        if (!cols.includes('latitude')) {
          database.run('ALTER TABLE territorios ADD COLUMN latitude REAL');
        }
        if (!cols.includes('longitude')) {
          database.run('ALTER TABLE territorios ADD COLUMN longitude REAL');
        }
      }
    });

    database.run(`
    CREATE TABLE IF NOT EXISTS saidas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        dia_semana TEXT NOT NULL
            )
        `);

    database.run(`
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

    // Tabela de visitas
    database.run(`
    CREATE TABLE IF NOT EXISTS visitas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        territorio_id INTEGER,
        data_visita TEXT,
        FOREIGN KEY (territorio_id) REFERENCES territorios(id)
            )
        `);

    logger.info('✅ Banco de dados inicializado com sucesso!');
  });
}

module.exports = {
  connect,
  disconnect,
  all,
  get,
  run,
  query,
  transaction,
};
