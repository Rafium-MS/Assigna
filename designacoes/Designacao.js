const { dialog } = require('electron');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const db = require('../modulos/db');
const logger = require('../logger');
const { verificarRegrasDesignacao } = require('../utils/helpers');

async function listar() {
  return new Promise((resolve, reject) => {
    db.all(`
            SELECT d.id, d.territorio_id AS territorio, s.nome AS saida, s.dia_semana,
                   d.data_designacao, d.data_devolucao,
                   d.territorio_id, d.saida_id
            FROM designacoes d
            JOIN territorios t ON d.territorio_id = t.id
            JOIN saidas s ON d.saida_id = s.id
        `, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function adicionar(territorio_id, saida_id, data_designacao, data_devolucao) {
  await verificarRegrasDesignacao(territorio_id, saida_id, data_designacao, data_devolucao);
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO designacoes (territorio_id, saida_id, data_designacao, data_devolucao) VALUES (?, ?, ?, ?)`,
      [territorio_id, saida_id, data_designacao, data_devolucao],
      function(err) {
        if (err) {
          logger.error(`Erro ao adicionar designação: ${err.message}`);
          reject(err);
        } else {
          logger.info(`Designação ${this.lastID} adicionada`);
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

async function deletar(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM designacoes WHERE id = ?', [id], function(err) {
      if (err) {
        logger.error(`Erro ao deletar designação ${id}: ${err.message}`);
        reject(err);
      } else {
        logger.info(`Designação ${id} deletada`);
        resolve(true);
      }
    });
  });
}

async function editar(id, territorio_id, saida_id, data_designacao, data_devolucao) {
  await verificarRegrasDesignacao(territorio_id, saida_id, data_designacao, data_devolucao);
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE designacoes SET territorio_id = ?, saida_id = ?, data_designacao = ?, data_devolucao = ? WHERE id = ?`,
      [territorio_id, saida_id, data_designacao, data_devolucao, id],
      function(err) {
        if (err) {
          logger.error(`Erro ao editar designação ${id}: ${err.message}`);
          reject(err);
        } else {
          logger.info(`Designação ${id} editada`);
          resolve(true);
        }
      }
    );
  });
}

async function importarCSV(filePath) {
  try {
    const csvData = fs.readFileSync(filePath, 'utf-8');
    const records = parse(csvData, { columns: true, skip_empty_lines: true });
    for (const record of records) {
      const territorioId = record.territorio_id || record['Territorio_id'] || record['territorio'];
      const saidaId = record.saida_id || record['Saida_id'] || record['saida'];
      const dataDesignacao = record.data_designacao || record['Data_designacao'];
      const dataDevolucao = record.data_devolucao || record['Data_devolucao'];
      if (territorioId && saidaId && dataDesignacao && dataDevolucao) {
        await new Promise((resolve, reject) => {
          db.run(`INSERT INTO designacoes (territorio_id, saida_id, data_designacao, data_devolucao) VALUES (?, ?, ?, ?)`,
            [territorioId, saidaId, dataDesignacao, dataDevolucao], function(err) {
              if (err) reject(err);
              else resolve();
            });
        });
      }
    }
    logger.info(`Importação de designações concluída com sucesso (${records.length} registros).`);
    return true;
  } catch (err) {
    logger.error(`Erro ao importar designações: ${err.message}`);
    throw err;
  }
}

async function exportarCSV() {
  try {
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: 'designacoes.csv',
      filters: [{ name: 'CSV', extensions: ['csv'] }]
    });
    if (canceled || !filePath) {
      return { canceled: true };
    }
a,
                        s.dia_semana, d.data_designacao, d.data_devolucao
                   FROM designacoes d
                          JOIN saidas s ON d.saida_id = s.id`;
    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) return reject(err);
        const header = 'id,territorio,saida,dia_semana,data_designacao,data_devolucao\n';
        const csv = rows.map(r => {
          const territorio = r.territorio.replace(/"/g, '""');
          const saida = r.saida.replace(/"/g, '""');
          return `${r.id},"${territorio}","${saida}",${r.dia_semana},${r.data_designacao},${r.data_devolucao}`;
        }).join('\n');
        fs.writeFileSync(filePath, header + csv, 'utf8');
        resolve({ canceled: false, filePath });
      });
    });
  } catch (err) {
    logger.error(`Erro ao exportar designações: ${err.message}`);
    throw err;
  }
}

async function historicoTerritorio(id) {
  const limite = new Date();
  limite.setMonth(limite.getMonth() - 12);
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT s.nome AS saida, d.data_designacao, d.data_devolucao
       FROM designacoes d
       JOIN saidas s ON s.id = d.saida_id
       WHERE d.territorio_id = ? AND d.data_designacao >= ?
       ORDER BY d.data_designacao DESC`,
      [id, limite.toISOString().split('T')[0]],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

async function historicoSaida(id) {
  const limite = new Date();
  limite.setMonth(limite.getMonth() - 12);
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT d.territorio_id AS territorio, d.data_designacao, d.data_devolucao
       FROM designacoes d
       WHERE d.saida_id = ? AND d.data_designacao >= ?
       ORDER BY d.data_designacao DESC`,
      [id, limite.toISOString().split('T')[0]],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

module.exports = {
  listar,
  adicionar,
  deletar,
  editar,
  importarCSV,
  exportarCSV,
  historicoTerritorio,
  historicoSaida,
};
