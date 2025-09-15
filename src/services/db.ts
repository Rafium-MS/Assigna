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

export interface Metadata {
  key: string;
  value: number;
}

interface DerivedTerritoryAddress {
  derivedTerritoryId: number;
  addressId: number;
}

class AppDB extends Dexie {
  territorios!: Table<Territorio, string>;
  saidas!: Table<Saida, string>;
  designacoes!: Table<Designacao, string>;
  sugestoes!: Table<Sugestao, string>;
  streets!: Table<Street, number>;
  propertyTypes!: Table<PropertyType, number>;
  addresses!: Table<Address, number>;
  buildingsVillages!: Table<BuildingVillage, string>;
  derivedTerritories!: Table<DerivedTerritory, number>;
  derivedTerritoryAddresses!: Table<DerivedTerritoryAddress, [number, number]>;
  metadata!: Table<Metadata, string>;

  constructor() {
    super('assigna');
    this.version(2).stores({
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

export const db = new AppDB();
export const SCHEMA_VERSION = 2;

export async function getSchemaVersion(): Promise<number> {
  await db.open();
  const meta = await db.metadata.get('schemaVersion');
  return meta?.value ?? 0;
}

export async function setSchemaVersion(version: number): Promise<void> {
  await db.metadata.put({ key: 'schemaVersion', value: version });
}

export async function migrate(): Promise<void> {
  const current = await getSchemaVersion();
  if (current < 2) {
    // Schema version 2 adds the buildingsVillages store; no data migrations necessary yet.
  }
  if (current < SCHEMA_VERSION) {
    await setSchemaVersion(SCHEMA_VERSION);
  }
}
