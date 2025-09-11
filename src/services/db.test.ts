import 'fake-indexeddb/auto';
import { describe, it, expect, beforeAll } from 'vitest';
import { db, migrate } from './db';
import { TerritorioRepository } from './repositories';

describe('IndexedDB persistence', () => {
  beforeAll(async () => {
    await db.delete();
    await migrate();
  });

  it('stores and retrieves many territorios', async () => {
    const territorios = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i}`,
      nome: `Territorio ${i}`
    }));
    await TerritorioRepository.bulkAdd(territorios);
    const all = await TerritorioRepository.all();
    expect(all.length).toBe(territorios.length);
  });
});
