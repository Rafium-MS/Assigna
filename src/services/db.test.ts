import 'fake-indexeddb/auto';
import Dexie from 'dexie';
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

  it('migrates legacy territorios buildings into the dedicated store', async () => {
    const legacyDb = new Dexie('assigna');
    legacyDb.version(1).stores({
      territorios: 'id, nome',
      saidas: 'id, nome, diaDaSemana',
      designacoes: 'id, territorioId, saidaId',
      sugestoes: '[territorioId+saidaId]',
      metadata: 'key'
    });

    await legacyDb.open();

    // Simulate schema v1 where buildings were embedded inside territorios records.
    const legacyTerritories: Array<Record<string, unknown>> = [
      {
        id: 'legacy-territory',
        nome: 'Legacy Territory',
        legacyBuildings: [
          {
            id: 'legacy-building-1',
            name: 'Legacy Tower',
            addressLine: 'Rua Principal',
            number: '10',
            residencesCount: 40,
            modality: 'vertical',
            type: 'building',
            receptionType: 'concierge',
            responsible: 'Ana',
            assignedAt: '2023-01-10T00:00:00.000Z',
            returnedAt: null,
            block: 'A',
            notes: 'Migrated from territorios',
            createdAt: '2023-01-05T00:00:00.000Z'
          },
          {
            name: 'Village Beta',
            number: '200',
            residencesCount: null,
            modality: null,
            receptionType: null,
            responsible: null,
            assignedAt: '2023-02-01T00:00:00.000Z',
            returnedAt: null,
            block: null,
            notes: null
          }
        ]
      },
      {
        id: 'regular-territory',
        nome: 'Regular Territory'
      }
    ];

    await legacyDb.table('territorios').bulkPut(legacyTerritories);
    await legacyDb.close();

    await migrate();

    const migrated = await db.buildingsVillages.toArray();
    expect(migrated).toHaveLength(2);
    expect(migrated).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'legacy-building-1',
          territory_id: 'legacy-territory',
          created_at: '2023-01-05T00:00:00.000Z'
        }),
        expect.objectContaining({
          id: 'legacy-territory-2',
          territory_id: 'legacy-territory',
          created_at: '2023-02-01T00:00:00.000Z'
        })
      ])
    );

    const updatedTerritory = await db.territorios.get('legacy-territory');
    expect(updatedTerritory).toMatchObject({ id: 'legacy-territory', nome: 'Legacy Territory' });
    expect((updatedTerritory as Record<string, unknown>).legacyBuildings).toBeUndefined();

    const migratedMetadata = await db.metadata.get('buildingsVillagesMigrated');
    expect(migratedMetadata?.value).toBe(2);
  });

  it('upgrades legacy schema to add new support stores', async () => {
    const legacyDb = new Dexie('assigna');
    legacyDb.version(2).stores({
      territorios: 'id, nome',
      saidas: 'id, nome, diaDaSemana',
      designacoes: 'id, territorioId, saidaId',
      sugestoes: '[territorioId+saidaId]',
      metadata: 'key',
      buildingsVillages: 'id, territory_id'
    });

    await legacyDb.open();
    // Simulate schema v2 data that already has the dedicated buildings table without support tables.
    await legacyDb.table('buildingsVillages').bulkPut([
      {
        id: 'legacy-bv-1',
        territory_id: 'legacy-territory',
        name: 'Legacy Building',
        address_line: 'Legacy Street',
        number: '10',
        residences_count: 12,
        modality: 'vertical',
        reception_type: 'porteiro',
        responsible: 'Carlos',
        assigned_at: '2023-03-01T00:00:00.000Z',
        returned_at: null,
        block: 'A',
        notes: 'Migrated building',
        created_at: '2023-03-05T00:00:00.000Z'
      },
      {
        id: 'legacy-bv-2',
        territory_id: 'legacy-territory',
        name: 'Ignored Building',
        address_line: 'Legacy Street',
        number: '10A',
        residences_count: 5,
        modality: 'horizontal',
        reception_type: null,
        responsible: null,
        assigned_at: null,
        returned_at: null,
        block: null,
        notes: null,
        created_at: null
      }
    ]);
    await legacyDb.table('metadata').put({ key: 'schemaVersion', value: 2 });
    await legacyDb.close();

    await migrate();

    const version = await getSchemaVersion();
    expect(version).toBe(SCHEMA_VERSION);

    const propertyType = await db.propertyTypes.where('name').equals('Building/Village').first();
    expect(propertyType).toMatchObject({ name: 'Building/Village' });
    expect(typeof propertyType?.id).toBe('number');

    const streets = await db.streets.toArray();
    expect(streets).toEqual([
      expect.objectContaining({ territoryId: 'legacy-territory', name: 'Legacy Street' })
    ]);

    const addresses = await db.addresses.toArray();
    expect(addresses).toHaveLength(1);
    const [address] = addresses;
    expect(address).toMatchObject({
      streetId: streets[0]?.id,
      numberStart: 10,
      numberEnd: 10,
      propertyTypeId: propertyType?.id
    });

    const derivedTerritories = await db.derivedTerritories.toArray();
    expect(derivedTerritories).toEqual([
      expect.objectContaining({ baseTerritoryId: 'legacy-territory', name: 'Legacy Building' })
    ]);

    const mappings = await db.derivedTerritoryAddresses.toArray();
    expect(mappings).toEqual([
      {
        derivedTerritoryId: derivedTerritories[0]?.id,
        addressId: address?.id
      }
    ]);

    const migrationMetadata = await db.metadata.get('derivedTerritoriesMigrated');
    expect(migrationMetadata?.value).toBe(1);
  });
});
