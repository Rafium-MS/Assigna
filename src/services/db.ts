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
  sugestoes!: Table<Sugestao, string>;
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
    // Schema version 2 adds the buildingsVillages store; no data migrations necessary yet.
  }
  if (current < 3) {
    // Schema version 3 adds support tables for streets, addresses and derived territories.
  }
  if (current < SCHEMA_VERSION) {
    await setSchemaVersion(SCHEMA_VERSION);
  }
}
