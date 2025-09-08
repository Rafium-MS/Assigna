process.env.DB_PATH = ':memory:';
const test = require('node:test');
const assert = require('node:assert');
const db = require('../db');

test('conecta e executa SELECT simples', async () => {
  await db.connect();
  const res = await db.query('SELECT 1 as value');
  assert.strictEqual(res.rows[0].value, 1);
  await db.disconnect();
});

test('insere e consulta registro', async () => {
  await db.connect();
  await db.query('INSERT INTO territorios (descricao) VALUES (?)', ['Teste']);
  const { rows } = await db.query('SELECT descricao FROM territorios');
  assert.ok(rows.some(r => r.descricao === 'Teste'));
  await db.disconnect();
});
