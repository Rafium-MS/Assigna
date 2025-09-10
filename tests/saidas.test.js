process.env.DB_PATH = ':memory:';
require('../register-ts');
const test = require('node:test');
const assert = require('node:assert');
const { adicionar, listar, deletar } = require('../services/saidas.ts');
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

