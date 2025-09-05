const { dialog } = require('electron');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const loadTerritories = require('../utils/loadTerritories');
const db = require('./db');
const logger = require('../logger');


async function listar() {
  return new Promise((resolve, reject) => {
    db.all('SELECT id FROM territorios', [], (err, rows) => {

      if (err) return reject(err);
      resolve(rows);

    });
  });
}

async function adicionar(descricao, latitude, longitude, enderecos = []) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO territorios (descricao, latitude, longitude) VALUES (?, ?, ?)', [descricao, latitude, longitude], function (err) {
      if (err) return reject(err);
      const territorioId = this.lastID;
      if (enderecos.length > 0) {
        const stmt = db.prepare('INSERT INTO enderecos (territorio_id, rua, numero) VALUES (?, ?, ?)');
        for (const e of enderecos) {
          stmt.run([territorioId, e.rua, e.numero]);
        }
        stmt.finalize(() => {
          resolve({ id: territorioId, descricao, latitude, longitude, enderecos });
        });
      } else {
        resolve({ id: territorioId, descricao, latitude, longitude, enderecos: [] });
      }
    });
  });
}

async function deletar(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM territorios WHERE id = ?', [id], function (err) {
      if (err) {
        logger.error(`Erro ao deletar territ��rio ${id}: ${err.message}`);
        reject(err);
      } else {
        logger.info(`Territ��rio ${id} deletado`);
        resolve(true);
      }
    });
  });
}

async function editar(id, descricao, latitude, longitude, enderecos = []) {
  return new Promise((resolve, reject) => {
    db.run('UPDATE territorios SET descricao = ?, latitude = ?, longitude = ? WHERE id = ?', [descricao, latitude, longitude, id], function (err) {
      if (err) {
        logger.error(`Erro ao editar territ��rio ${id}: ${err.message}`);
        return reject(err);
      }
      db.run('DELETE FROM enderecos WHERE territorio_id = ?', [id], delErr => {
        if (delErr) return reject(delErr);
        if (enderecos.length > 0) {
          const stmt = db.prepare('INSERT INTO enderecos (territorio_id, rua, numero) VALUES (?, ?, ?)');
          for (const e of enderecos) {
            stmt.run([id, e.rua, e.numero]);
          }
          stmt.finalize(() => {
            logger.info(`Territ��rio ${id} editado`);
            resolve(true);
          });
        } else {
          logger.info(`Territ��rio ${id} editado`);
          resolve(true);
        }
      });
    });
  });
}

async function importarCSV(filePath) {
  try {
    const csvData = fs.readFileSync(filePath, 'utf-8');
    const records = parse(csvData, { columns: true, skip_empty_lines: true });
    for (const record of records) {
      const descricao = record.descricao || record['Descri��ǜo'] || record['descricao'];
      if (descricao) {
        await new Promise((resolve, reject) => {
          db.run(`INSERT INTO territorios (descricao) VALUES (?)`, [descricao], function (err) {
            if (err) reject(err);
            else resolve();
          });
        });
      }
    }
    logger.info(`Importa��ǜo de territ��rios conclu��da com sucesso (${records.length} registros).`);
    return true;
  } catch (err) {
    logger.error(`Erro ao importar territ��rios: ${err.message}`);
    throw err;
  }
}

async function exportarCSV() {
  try {
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: 'territorios.csv',
      filters: [{ name: 'CSV', extensions: ['csv'] }]
    });
    if (canceled || !filePath) {
      return { canceled: true };
    }
    return new Promise((resolve, reject) => {
      db.all('SELECT id, descricao, latitude, longitude FROM territorios', [], (err, rows) => {
        if (err) return reject(err);
        const header = 'id,descricao,latitude,longitude\n';
        const csv = rows.map(r => {
          const descricao = (r.descricao || '').replace(/\"/g, '""').replace(/"/g, '""');
          const latitude = (r.latitude ?? '').toString();
          const longitude = (r.longitude ?? '').toString();
          return `${r.id},"${descricao}",${latitude},${longitude}`;
        }).join('\n');
        fs.writeFileSync(filePath, header + csv, 'utf8');
        logger.info(`Exportacao de territorios salva em ${filePath}`);
        resolve({ canceled: false, filePath });
      });
    });
  } catch (err) {
    logger.error(`Erro ao exportar territ��rios: ${err.message}`);
    throw err;
  }
}

async function carregarJSON(filePath) {
  try {
    await loadTerritories(filePath, db);
    return true;
  } catch (err) {
    logger.error(`Erro ao carregar territ��rios: ${err.message}`);
    throw err;
  }
}

async function agruparProximos(raioKm = 1) {
  return new Promise((resolve, reject) => {
    db.all('SELECT id FROM territorios', [], (err, rows) => {

      if (err) return reject(err);
      try {
        const grupos = agrupar(rows, raioKm);
        resolve(grupos);
      } catch (e) {
        reject(e);
      }
    });
  });
}

module.exports = {
  listar,
  adicionar,
  deletar,
  editar,
  importarCSV,
  exportarCSV,
  carregarJSON,
  agruparProximos,
};

