import fs from 'fs';
import path from 'path';
import { dialog } from 'electron';
import db from '../db';

export async function listar(): Promise<any[]> {
  const { rows } = await db.query('SELECT id, nome, dia_semana FROM saidas ORDER BY id');
  return rows;
}

export async function adicionar(nome: string, dia_semana: string) {
  if (!nome || !dia_semana) throw new Error('Campos obrigatórios ausentes');
  await db.query('INSERT INTO saidas (nome, dia_semana) VALUES (?, ?)', [nome, dia_semana]);
  return { ok: true };
}

export async function editar(id: number, nome: string, dia_semana: string) {
  if (!id || !nome || !dia_semana) throw new Error('Campos obrigatórios ausentes');
  await db.query('UPDATE saidas SET nome = ?, dia_semana = ? WHERE id = ?', [nome, dia_semana, id]);
  return { ok: true };
}

export async function deletar(id: number) {
  if (!id) throw new Error('ID inválido');
  await db.query('DELETE FROM saidas WHERE id = ?', [id]);
  return { ok: true };
}

// Importa CSV simples com colunas: nome,dia_semana (com ou sem cabeçalho)
export async function importarCSV(filePath: string) {
  if (!filePath) throw new Error('Caminho do arquivo CSV não informado');
  const content = await fs.promises.readFile(filePath, 'utf8');
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
    await db.query('INSERT INTO saidas (nome, dia_semana) VALUES (?, ?)', [nome, dia]);
    imported++;
  }
  return { imported };
}

export async function exportarCSV() {
  const rows = await listar();
  const csv = ['nome,dia_semana', ...rows.map(r => `${escapeCSV(r.nome)},${escapeCSV(r.dia_semana)}`)].join('\n');

  // Abre diálogo para salvar arquivo
  const res = await dialog.showSaveDialog({
    title: 'Salvar Saídas (CSV)',
    defaultPath: path.join(process.cwd(), 'saidas.csv'),
    filters: [{ name: 'CSV', extensions: ['csv'] }],
  });
  if (res.canceled) return { canceled: true };
  await fs.promises.writeFile(res.filePath!, csv, 'utf8');
  return { canceled: false, filePath: res.filePath };
}

function escapeCSV(value: string) {
  const s = String(value ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}
