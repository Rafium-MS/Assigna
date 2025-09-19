import { describe, expect, test } from 'vitest';
import { exportToCsv, importCsv } from './csv';

describe('csv utils', () => {
  test('exportToCsv adds header and date', () => {
    const csv = exportToCsv([{ id: 1, name: 'Ana' }], ['id', 'name']);
    const lines = csv.split('\n');
    expect(lines[0]).toMatch(/^generated_at,\d{4}-\d{2}-\d{2}$/);
    expect(lines[1]).toBe('id,name');
    expect(lines[2]).toBe('"1","Ana"');
  });

  test('importCsv maps columns and validates', () => {
    const csv = `generated_at,2024-07-01\ncol1,col2\n1,Ana\n2,`;
    const rows = importCsv<{ id: string; name: string }>(csv, {
      columnMap: { col1: 'id', col2: 'name' },
      validate: (r): r is { id: string; name: string } =>
        Boolean(r.id && r.name),
    });
    expect(rows).toEqual([{ id: '1', name: 'Ana' }]);
  });
});
