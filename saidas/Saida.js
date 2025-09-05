const { dialog } = require('electron');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const db = require('../modulos/db');
const logger = require('../logger');

async function listar() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM saidas', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function adicionar(nome, dia_semana) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO saidas (nome, dia_semana) VALUES (?, ?)', [nome, dia_semana], function(err) {
      if (err) {
        logger.error(`Erro ao adicionar saída: ${err.message}`);
        reject(err);
      } else {
        logger.info(`Saída ${this.lastID} adicionada`);
        resolve({ id: this.lastID, nome, dia_semana });
      }
    });
  });
}

async function deletar(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM saidas WHERE id = ?', [id], function(err) {
      if (err) {
        logger.error(`Erro ao deletar saída ${id}: ${err.message}`);
        reject(err);
      } else {
        logger.info(`Saída ${id} deletada`);
        resolve(true);
      }
    });
  });
}

async function editar(id, nome, dia_semana) {
  return new Promise((resolve, reject) => {
    db.run('UPDATE saidas SET nome = ?, dia_semana = ? WHERE id = ?', [nome, dia_semana, id], function(err) {
      if (err) {
        logger.error(`Erro ao editar saída ${id}: ${err.message}`);
        reject(err);
      } else {
        logger.info(`Saída ${id} editada`);
        resolve(true);
      }
    });
  });
}

async function importarCSV(filePath) {
  try {
    const csvData = fs.readFileSync(filePath, 'utf-8');
    const records = parse(csvData, { columns: true, skip_empty_lines: true });
    for (const record of records) {
      const nome = record.nome || record['Nome'];
      const dia = record.dia_semana || record['Dia_semana'] || record['dia'] || record['Dia'];
      if (nome && dia) {
        await new Promise((resolve, reject) => {
          db.run(`INSERT INTO saidas (nome, dia_semana) VALUES (?, ?)`, [nome, dia], function(err) {
            if (err) reject(err);
            else resolve();
          });
        });
      }
    }
    logger.info(`Importação de saídas concluida com sucesso (${records.length} registros).`);
    return true;
  } catch (err) {
    logger.error(`Erro ao importar saídas: ${err.message}`);
    throw err;
  }
}

async function exportarCSV() {
  try {
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: 'saidas.csv',
      filters: [{ name: 'CSV', extensions: ['csv'] }]
    });
    if (canceled || !filePath) {
      return { canceled: true };
    }
    return new Promise((resolve, reject) => {
      db.all('SELECT id, nome, dia_semana FROM saidas', [], (err, rows) => {
        if (err) return reject(err);
        const header = 'id,nome,dia_semana\n';
        const csv = rows.map(r => `${r.id},"${r.nome.replace(/"/g, '""')}",${r.dia_semana}`).join('\n');
        fs.writeFileSync(filePath, header + csv, 'utf8');
        resolve({ canceled: false, filePath });
      });
    });
  } catch (err) {
    logger.error(`Erro ao exportar saídas: ${err.message}`);
    throw err;
  }
}

module.exports = {
  listar,
  adicionar,
  deletar,
  editar,
  importarCSV,
  exportarCSV,
};
