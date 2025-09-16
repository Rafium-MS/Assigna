import Dexie, { Table } from 'dexie';
import type { Territorio } from '../types/territorio';
import type { Saida } from '../types/saida';
import type { Designacao } from '../types/designacao';
import type { Sugestao } from '../types/sugestao';
import type { Street } from '../types/street';
import type { PropertyType } from '../types/property-type';
import type { Address } from '../types/address';
import type { BuildingVillage } from '../types/building_village';
import type { DerivedTerritory } from '../types/derived-territory';

/**
 * Represents a key-value pair for storing metadata in the database.
 */
export interface Metadata {
  /** The key for the metadata entry. */
  key: string;
  /** The value for the metadata entry. */
  value: number;
}

/**
 * Represents the legacy persisted structure for buildings and villages
 * that used to live inside the territorios store before schema version 2.
 */
interface LegacyBuilding {
  id?: string;
  territoryId?: string;
  territorioId?: string;
  name?: string | null;
  addressLine?: string | null;
  address_line?: string | null;
  type?: string | null;
  number?: string | null;
  residencesCount?: number | null;
  residences_count?: number | null;
  modality?: string | null;
  receptionType?: string | null;
  reception_type?: string | null;
  responsible?: string | null;
  assignedAt?: string | null;
  assigned_at?: string | null;
  returnedAt?: string | null;
  returned_at?: string | null;
  block?: string | null;
  notes?: string | null;
  createdAt?: string | null;
  created_at?: string | null;
}

/**
 * Extends the territorio type with the legacy array of buildings and allows
 * unknown fields so the migration can preserve forward-compatible data.
 */
interface LegacyTerritorio extends Territorio {
  legacyBuildings?: LegacyBuilding[];
  [key: string]: unknown;
}

/**
 * Represents the join table for DerivedTerritory and Address.
 */
interface DerivedTerritoryAddress {
  /** The ID of the derived territory. */
  derivedTerritoryId: number;
  /** The ID of the address. */
  addressId: number;
}

/**
 * The main database class for the application.
 * It uses Dexie.js as the underlying IndexedDB wrapper.
 */
class AppDB extends Dexie {
  /** Table for storing Territorio data. */
  territorios!: Table<Territorio, string>;
  /** Table for storing Saida data. */
  saidas!: Table<Saida, string>;
  /** Table for storing Designacao data. */
  designacoes!: Table<Designacao, string>;
  /** Table for storing Sugestao data. */
  sugestoes!: Table<Sugestao, [string, string]>;
  /** Table for storing Street data. */
  streets!: Table<Street, number>;
  /** Table for storing PropertyType data. */
  propertyTypes!: Table<PropertyType, number>;
  /** Table for storing Address data. */
  addresses!: Table<Address, number>;
  /** Table for storing BuildingVillage data. */
  buildingsVillages!: Table<BuildingVillage, string>;
  /** Table for storing DerivedTerritory data. */
  derivedTerritories!: Table<DerivedTerritory, number>;
  /** Join table for DerivedTerritory and Address. */
  derivedTerritoryAddresses!: Table<DerivedTerritoryAddress, [number, number]>;
  /** Table for storing metadata. */
  metadata!: Table<Metadata, string>;

  constructor() {
    super('assigna');
    this.version(3).stores({
      territorios: 'id, nome',
      saidas: 'id, nome, diaDaSemana',
      designacoes: 'id, territorioId, saidaId',
      sugestoes: '[territorioId+saidaId]',
      metadata: 'key',
      streets: '++id, territoryId, name',
      property_types: '++id, name',
      addresses: '++id, streetId, numberStart, numberEnd',
      buildingsVillages: 'id, territory_id',
      derived_territories: '++id, baseTerritoryId, name',
      derived_territory_addresses: '[derivedTerritoryId+addressId]'
    });
    this.buildingsVillages = this.table('buildingsVillages');
    this.propertyTypes = this.table('property_types');
    this.derivedTerritories = this.table('derived_territories');
    this.derivedTerritoryAddresses = this.table('derived_territory_addresses');
  }
}

/**
 * The singleton instance of the AppDB class.
 */
export const db = new AppDB();
/**
 * The current version of the database schema.
 */
export const SCHEMA_VERSION = 3;

/**
 * Gets the current schema version from the database.
 * @returns The current schema version.
 */
export async function getSchemaVersion(): Promise<number> {
  await db.open();
  const meta = await db.metadata.get('schemaVersion');
  return meta?.value ?? 0;
}

/**
 * Sets the schema version in the database.
 * @param version The schema version to set.
 */
export async function setSchemaVersion(version: number): Promise<void> {
  await db.metadata.put({ key: 'schemaVersion', value: version });
}

/**
 * Migrates the database to the latest schema version.
 */
export async function migrate(): Promise<void> {
  const current = await getSchemaVersion();
  if (current < 2) {
    // Schema version 2 moves embedded legacy building data into its own store using a Dexie transaction.
    await db.transaction('rw', db.territorios, db.buildingsVillages, db.metadata, async () => {
      const territorios = (await db.territorios.toArray()) as LegacyTerritorio[];
      let migratedCount = 0;

      for (const territorio of territorios) {
        const legacyBuildings = Array.isArray(territorio.legacyBuildings) ? territorio.legacyBuildings : [];
        if (legacyBuildings.length === 0) {
          continue;
        }

        const { legacyBuildings: _legacyBuildings, ...territorioWithoutLegacy } = territorio;
        await db.territorios.put(territorioWithoutLegacy as Territorio);

        const pickString = (...values: Array<string | null | undefined>): string | null => {
          for (const value of values) {
            if (value !== undefined && value !== null) {
              return value;
            }
          }
          return null;
        };
        const pickNumber = (
          ...values: Array<number | string | null | undefined>
        ): number | null => {
          for (const value of values) {
            if (value === undefined || value === null) {
              continue;
            }
            const parsed = typeof value === 'number' ? value : Number(value);
            if (!Number.isNaN(parsed)) {
              return parsed;
            }
          }
          return null;
        };

        const normalizedRecords: BuildingVillage[] = legacyBuildings.map((legacy, index) => {
          const fallbackId = `${territorio.id}-${index + 1}`;
          const recordId = legacy.id ?? fallbackId;
          const territoryId = legacy.territoryId ?? legacy.territorioId ?? territorio.id;

          return {
            id: recordId,
            territory_id: territoryId,
            name: pickString(legacy.name),
            address_line: pickString(legacy.addressLine, legacy.address_line),
            type: pickString(legacy.type),
            number: pickString(legacy.number),
            residences_count: pickNumber(legacy.residencesCount, legacy.residences_count),
            modality: pickString(legacy.modality),
            reception_type: pickString(legacy.receptionType, legacy.reception_type),
            responsible: pickString(legacy.responsible),
            assigned_at: pickString(legacy.assignedAt, legacy.assigned_at),
            returned_at: pickString(legacy.returnedAt, legacy.returned_at),
            block: pickString(legacy.block),
            notes: pickString(legacy.notes),
            created_at: pickString(
              legacy.createdAt,
              legacy.created_at,
              legacy.assignedAt,
              legacy.assigned_at
            )
          };
        });

        if (normalizedRecords.length > 0) {
          await db.buildingsVillages.bulkPut(normalizedRecords);
          migratedCount += normalizedRecords.length;
        }
      }

      if (migratedCount > 0) {
        const existing = await db.metadata.get('buildingsVillagesMigrated');
        const total = (existing?.value ?? 0) + migratedCount;
        await db.metadata.put({ key: 'buildingsVillagesMigrated', value: total });
      }
    });
  }
  if (current < 3) {
    // Schema version 3 introduces streets/addresses/derived territories for buildings, also wrapped in a Dexie transaction.
    await db.transaction(
      'rw',
      db.buildingsVillages,
      db.streets,
      db.addresses,
      db.propertyTypes,
      db.derivedTerritories,
      db.derivedTerritoryAddresses,
      db.metadata,
      async () => {
        const propertyTypeName = 'Building/Village';
        const existingPropertyType = await db.propertyTypes.where('name').equals(propertyTypeName).first();
        let propertyTypeId: number;

        if (existingPropertyType?.id !== undefined) {
          propertyTypeId = existingPropertyType.id;
        } else {
          propertyTypeId = await db.propertyTypes.add({ name: propertyTypeName });
        }

        const buildings = await db.buildingsVillages.toArray();
        const streetCache = new Map<string, number>();
        let derivedCount = 0;

        for (const building of buildings) {
          if (!building.territory_id) {
            continue;
          }

          const streetName = building.address_line?.trim();
          const numberRaw = building.number?.trim();
          if (!streetName || !numberRaw || !/^\d+$/.test(numberRaw)) {
            continue;
          }

          const streetKey = `${building.territory_id}::${streetName.toLowerCase()}`;
          let streetId = streetCache.get(streetKey);
          if (streetId === undefined) {
            streetId = await db.streets.add({
              territoryId: building.territory_id,
              name: streetName
            });
            streetCache.set(streetKey, streetId);
          }

          const numberValue = Number.parseInt(numberRaw, 10);
          const addressId = await db.addresses.add({
            streetId,
            numberStart: numberValue,
            numberEnd: numberValue,
            propertyTypeId
          });

          const derivedTerritoryId = await db.derivedTerritories.add({
            baseTerritoryId: building.territory_id,
            name: building.name ?? `Derived territory ${building.id}`
          });

          await db.derivedTerritoryAddresses.put({
            derivedTerritoryId,
            addressId
          });
          derivedCount++;
        }

        if (derivedCount > 0) {
          const existing = await db.metadata.get('derivedTerritoriesMigrated');
          const total = (existing?.value ?? 0) + derivedCount;
          await db.metadata.put({ key: 'derivedTerritoriesMigrated', value: total });
        }
      }
    );
  }
  if (current < SCHEMA_VERSION) {
    await setSchemaVersion(SCHEMA_VERSION);
  }
}
