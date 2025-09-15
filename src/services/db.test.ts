import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { db, migrate, getSchemaVersion, SCHEMA_VERSION } from './db';
import { TerritorioRepository, BuildingVillageRepository } from './repositories';

describe('IndexedDB persistence', () => {
  beforeEach(async () => {
    await db.delete();
  });

  it('stores and retrieves many territorios', async () => {
    await migrate();
    const territorios = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i}`,
      nome: `Territorio ${i}`
    }));
    await TerritorioRepository.bulkAdd(territorios);
    const all = await TerritorioRepository.all();
    expect(all.length).toBe(territorios.length);
  });

  it('stores and retrieves buildings villages', async () => {
    await migrate();
    const buildingVillages = [
      {
        id: 'bv-1',
        territory_id: 'territory-1',
        name: 'Building One',
        address_line: '123 Main St',
        type: 'building',
        number: '123',
        residences_count: 10,
        modality: 'vertical',
        reception_type: 'concierge',
        responsible: 'John Doe',
        assigned_at: '2024-01-01T00:00:00.000Z',
        returned_at: null,
        block: 'A',
        notes: 'Primary building',
        created_at: '2024-01-01T00:00:00.000Z'
      },
      {
        id: 'bv-2',
        territory_id: 'territory-2',
        name: 'Village Alpha',
        address_line: null,
        type: null,
        number: null,
        residences_count: null,
        modality: null,
        reception_type: null,
        responsible: null,
        assigned_at: null,
        returned_at: null,
        block: null,
        notes: null,
        created_at: null
      }
    ];

    await BuildingVillageRepository.bulkAdd(buildingVillages);
    const stored = await BuildingVillageRepository.all();

    expect(stored).toHaveLength(buildingVillages.length);
    expect(stored).toEqual(expect.arrayContaining(buildingVillages));
  });

  it('migrate updates schema version and ensures new store exists', async () => {
    const initialVersion = await getSchemaVersion();
    expect(initialVersion).toBe(0);

    await migrate();

    const updatedVersion = await getSchemaVersion();
    expect(updatedVersion).toBe(SCHEMA_VERSION);

    const buildingVillage = {
      id: 'bv-migrate',
      territory_id: 'territory-migrate',
      name: 'Migration Building',
      address_line: '456 Migration Rd',
      type: 'building',
      number: '456',
      residences_count: 5,
      modality: 'horizontal',
      reception_type: 'intercom',
      responsible: 'Migration Tester',
      assigned_at: null,
      returned_at: null,
      block: null,
      notes: 'Created during migration test',
      created_at: '2024-01-02T00:00:00.000Z'
    };

    await BuildingVillageRepository.add(buildingVillage);
    const stored = await BuildingVillageRepository.all();
    expect(stored).toContainEqual(buildingVillage);
  });
});
