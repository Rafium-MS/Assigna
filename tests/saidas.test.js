process.env.DB_PATH = ':memory:';
require('../register-ts');
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const { adicionar, listar, deletar, importarCSV } = require('../services/saidas.ts');
const db = require('../db');

test('adiciona e lista saidas', async () => {
  db.disconnect();
  await adicionar('Teste', 'Segunda');
  const rows = await listar();
  assert.ok(rows.some(r => r.nome === 'Teste'));
  db.disconnect();
});

test('deleta saida', async () => {
  db.disconnect();
  await adicionar('Apagar', 'Terça');
  let rows = await listar();
  const id = rows[0].id;
  await deletar(id);
  rows = await listar();
  assert.ok(!rows.some(r => r.id === id));
  db.disconnect();
});

test('nao adiciona saida com campos obrigatorios ausentes', async () => {
  await assert.rejects(() => adicionar('', ''), /Campos obrigatórios ausentes/);
});

test('importarCSV ignora linhas invalidas', async () => {
  const originalReadFile = fs.promises.readFile;
  fs.promises.readFile = async () => 'linha-invalida\noutra';
  const res = await importarCSV('dummy.csv');
  assert.strictEqual(res.imported, 0);
  fs.promises.readFile = originalReadFile;
});

test('importarCSV falha em erro de leitura', async () => {
  const originalReadFile = fs.promises.readFile;
  fs.promises.readFile = async () => { throw new Error('EIO'); };
  await assert.rejects(() => importarCSV('dummy.csv'), /EIO/);
  fs.promises.readFile = originalReadFile;
});

test('adicionar trata erro do banco de dados', async () => {
  const originalQuery = db.query;
  db.query = async () => { throw new Error('falha'); };
  await assert.rejects(() => adicionar('X', 'Y'), /Erro ao adicionar saída/);
  db.query = originalQuery;
});

test('listar trata erro do banco de dados', async () => {
  const originalQuery = db.query;
  db.query = async () => { throw new Error('falha'); };
  await assert.rejects(() => listar(), /Erro ao listar saídas/);
  db.query = originalQuery;
});

