const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const logger = require('../logger');

const dbPath = process.env.DB_PATH || path.resolve(__dirname, '..', 'db.sqlite');
const db = new sqlite3.Database(dbPath);

// Executar migrations ou inicialização de tabelas aqui
function inicializarBanco() {
    db.serialize(() => {

        // Criar tabelas se não existirem
      db.run(`
    CREATE TABLE IF NOT EXISTS territorios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        latitude REAL,
        longitude REAL
            )
        `);
        db.run(`
    CREATE TABLE IF NOT EXISTS enderecos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        territorio_id INTEGER,
        rua TEXT,
        numero TEXT,
        FOREIGN KEY (territorio_id) REFERENCES territorios(id)
    )
        `);
      // Adiciona colunas de coordenadas se estiver usando um banco existente
      db.all("PRAGMA table_info(territorios)", (err, rows) => {
        if (!err) {
          const cols = rows.map(r => r.name);
          if (!cols.includes('latitude')) {
            db.run('ALTER TABLE territorios ADD COLUMN latitude REAL');
          }
          if (!cols.includes('longitude')) {
            db.run('ALTER TABLE territorios ADD COLUMN longitude REAL');
          }
        }
      });

        db.run(`
    CREATE TABLE IF NOT EXISTS saidas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        dia_semana TEXT NOT NULL
            )
        `);

        db.run(`
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
        db.run(`
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

inicializarBanco();

module.exports = db;