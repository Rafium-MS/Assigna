const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');
const { all, run } = require('../db');

async function listar() {
  return await all('SELECT id, nome, dia_semana FROM saidas ORDER BY id');
}

async function adicionar(nome, dia_semana) {
  if (!nome || !dia_semana) throw new Error('Campos obrigatórios ausentes');
  await run('INSERT INTO saidas (nome, dia_semana) VALUES (?, ?)', [nome, dia_semana]);
  return { ok: true };
}

async function editar(id, nome, dia_semana) {
  if (!id || !nome || !dia_semana) throw new Error('Campos obrigatórios ausentes');
  await run('UPDATE saidas SET nome = ?, dia_semana = ? WHERE id = ?', [nome, dia_semana, id]);
  return { ok: true };
}

async function deletar(id) {
  if (!id) throw new Error('ID inválido');
  await run('DELETE FROM saidas WHERE id = ?', [id]);
  return { ok: true };
}

async function importarCSV(filePath) {
  if (!filePath) throw new Error('Caminho do arquivo CSV não informado');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return { imported: 0 };

  let start = 0;
  const header = lines[0].toLowerCase();
  if (header.includes('nome') && header.includes('dia')) start = 1;

  let imported = 0;
  for (let i = start; i < lines.length; i++) {
    const parts = lines[i].split(',');
    if (parts.length < 2) continue;
    const nome = parts[0].trim();
    const dia = parts[1].trim();
    if (!nome || !dia) continue;
    await run('INSERT INTO saidas (nome, dia_semana) VALUES (?, ?)', [nome, dia]);
    imported++;
  }
  return { imported };
}

async function exportarCSV() {
  const rows = await listar();
  const csv = ['nome,dia_semana', ...rows.map(r => `${escapeCSV(r.nome)},${escapeCSV(r.dia_semana)}`)].join('\n');
  const res = await dialog.showSaveDialog({
    title: 'Salvar Saídas (CSV)',
    defaultPath: path.join(process.cwd(), 'saidas.csv'),
    filters: [{ name: 'CSV', extensions: ['csv'] }],
  });
  if (res.canceled) return { canceled: true };
  fs.writeFileSync(res.filePath, csv, 'utf8');
  return { canceled: false, filePath: res.filePath };
}

function escapeCSV(value) {
  const s = String(value ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

module.exports = {
  listar,
  adicionar,
  editar,
  deletar,
  importarCSV,
  exportarCSV,
};

