import fs from 'fs';
import path from 'path';
import { dialog } from 'electron';
import db from '../db';
import logger from '../logger';
import type { Saida } from '../models';

export async function listar(): Promise<Saida[]> {
  try {
    const { rows } = await db.query<Saida>('SELECT id, nome, dia_semana FROM saidas ORDER BY id');
    return rows;
  } catch (err) {
    logger.error(`Erro ao listar saídas: ${(err as Error).message}`);
    throw new Error('Erro ao listar saídas');
  }
}

export async function adicionar(nome: string, dia_semana: string): Promise<{ ok: true }> {
  if (!nome || !dia_semana) throw new Error('Campos obrigatórios ausentes');
  try {
    await db.query('INSERT INTO saidas (nome, dia_semana) VALUES (?, ?)', [nome, dia_semana]);
    return { ok: true };
  } catch (err) {
    logger.error(`Erro ao adicionar saída: ${(err as Error).message}`);
    throw new Error('Erro ao adicionar saída');
  }
}

export async function editar(id: number, nome: string, dia_semana: string): Promise<{ ok: true }> {
  if (!id || !nome || !dia_semana) throw new Error('Campos obrigatórios ausentes');
  try {
    await db.query('UPDATE saidas SET nome = ?, dia_semana = ? WHERE id = ?', [nome, dia_semana, id]);
    return { ok: true };
  } catch (err) {
    logger.error(`Erro ao editar saída: ${(err as Error).message}`);
    throw new Error('Erro ao editar saída');
  }
}

export async function deletar(id: number): Promise<{ ok: true }> {
  if (!id) throw new Error('ID inválido');
  try {
    await db.query('DELETE FROM saidas WHERE id = ?', [id]);
    return { ok: true };
  } catch (err) {
    logger.error(`Erro ao deletar saída: ${(err as Error).message}`);
    throw new Error('Erro ao deletar saída');
  }
}

// Importa CSV simples com colunas: nome,dia_semana (com ou sem cabeçalho)
export async function importarCSV(filePath: string): Promise<{ imported: number }> {
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

export async function exportarCSV(): Promise<{ canceled: boolean; filePath?: string }> {
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

function escapeCSV(value: string): string {
  const s = String(value ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}
