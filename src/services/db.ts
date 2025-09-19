import Dexie, { Table } from 'dexie';
import type { Territorio } from '../types/territorio';
import type { Saida } from '../types/saida';
import type { Designacao } from '../types/designacao';
import type { Sugestao } from '../types/sugestao';
import type { Street } from '../types/street';
import type { PropertyType } from '../types/property-type';
import type { Address } from '../types/address';
import {
  LETTER_STATUS_VALUES,
  type BuildingVillage,
  type BuildingVillageLetterHistoryEntry,
  type BuildingVillageLetterStatus
} from '../types/building_village';
import type { DerivedTerritory } from '../types/derived-territory';
import type { NaoEmCasaRegistro } from '../types/nao-em-casa';
import { ADDRESS_VISIT_COOLDOWN_MS } from '../constants/addresses';
import type { User } from '../types/user';
import {
  ADMIN_MASTER_DEFAULT_EMAIL,
  ADMIN_MASTER_DEFAULT_NAME,
  ADMIN_MASTER_DEFAULT_PASSWORD,
  ADMIN_MASTER_DEFAULT_ROLE,
  ADMIN_MASTER_USERNAME
} from '../constants/auth';
import { hashPassword } from '../utils/password';

export const DEFAULT_PROPERTY_TYPE_NAMES = [
  'Prédio',
  'Vila',
  'Residência',
  'Comércio'
] as const;

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
  /** Table for storing not-at-home records. */
  naoEmCasa!: Table<NaoEmCasaRegistro, string>;
  /** Table for storing application users. */
  users!: Table<User, string>;

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
    this.version(4).stores({
      territorios: 'id, nome',
      saidas: 'id, nome, diaDaSemana',
      designacoes: 'id, territorioId, saidaId',
      sugestoes: '[territorioId+saidaId]',
      metadata: 'key',
      streets: '++id, territoryId, name',
      property_types: '++id, name',
      addresses: '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
      buildingsVillages: 'id, territory_id',
      derived_territories: '++id, baseTerritoryId, name',
      derived_territory_addresses: '[derivedTerritoryId+addressId]'
    });
    this.version(5).stores({
      territorios: 'id, nome',
      saidas: 'id, nome, diaDaSemana',
      designacoes: 'id, territorioId, saidaId',
      sugestoes: '[territorioId+saidaId]',
      metadata: 'key',
      streets: '++id, territoryId, name',
      property_types: '++id, name',
      addresses: '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
      buildingsVillages: 'id, territory_id',
      derived_territories: '++id, baseTerritoryId, name',
      derived_territory_addresses: '[derivedTerritoryId+addressId]',
      nao_em_casa: 'id, territorioId, followUpAt, completedAt'
    });
    this.version(6).stores({
      territorios: 'id, nome',
      saidas: 'id, nome, diaDaSemana',
      designacoes: 'id, territorioId, saidaId',
      sugestoes: '[territorioId+saidaId]',
      metadata: 'key',
      streets: '++id, territoryId, name',
      property_types: '++id, name',
      addresses: '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
      buildingsVillages: 'id, territory_id',
      derived_territories: '++id, baseTerritoryId, name',
      derived_territory_addresses: '[derivedTerritoryId+addressId]',
      nao_em_casa: 'id, territorioId, followUpAt, completedAt'
    });
    this.version(7)
      .stores({
        territorios: 'id, nome, publisherId',
        saidas: 'id, nome, diaDaSemana, publisherId',
        designacoes: 'id, territorioId, saidaId, publisherId',
        sugestoes: '[territorioId+saidaId], territorioId, saidaId, publisherId',
        metadata: 'key',
        streets: '++id, territoryId, name',
        property_types: '++id, name',
        addresses: '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
        buildingsVillages: 'id, territory_id, publisherId',
        derived_territories: '++id, baseTerritoryId, name',
        derived_territory_addresses: '[derivedTerritoryId+addressId]',
        nao_em_casa: 'id, territorioId, followUpAt, completedAt, publisherId'
      })
      .upgrade(async (transaction) => {
        const fallbackPublisherId = '';
        const tables = [
          'territorios',
          'saidas',
          'designacoes',
          'sugestoes',
          'buildingsVillages',
          'nao_em_casa'
        ] as const;

        await Promise.all(
          tables.map((name) =>
            transaction
              .table(name)
              .toCollection()
              .modify((record: Record<string, unknown>) => {
                if (typeof record.publisherId !== 'string') {
                  record.publisherId = fallbackPublisherId;
                }
              })
          )
        );
      });
    this.version(8).stores({
      territorios: 'id, nome, publisherId',
      saidas: 'id, nome, diaDaSemana, publisherId',
      designacoes: 'id, territorioId, saidaId, publisherId',
      sugestoes: '[territorioId+saidaId], territorioId, saidaId, publisherId',
      metadata: 'key',
      streets: '++id, territoryId, name',
      property_types: '++id, name',
      addresses: '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
      buildingsVillages: 'id, territory_id, publisherId',
      derived_territories: '++id, baseTerritoryId, name',
      derived_territory_addresses: '[derivedTerritoryId+addressId]',
      nao_em_casa: 'id, territorioId, followUpAt, completedAt, publisherId'
    });
    this.version(9).stores({
      territorios: 'id, nome, publisherId',
      saidas: 'id, nome, diaDaSemana, publisherId',
      designacoes: 'id, territorioId, saidaId, publisherId',
      sugestoes: '[territorioId+saidaId], territorioId, saidaId, publisherId',
      metadata: 'key',
      streets: '++id, territoryId, name',
      property_types: '++id, name',
      addresses: '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
      buildingsVillages: 'id, territory_id, publisherId',
      derived_territories: '++id, baseTerritoryId, name',
      derived_territory_addresses: '[derivedTerritoryId+addressId]',
      nao_em_casa: 'id, territorioId, followUpAt, completedAt, publisherId',
      users: 'id, email, role'
    });
    this.version(10)
      .stores({
        territorios: 'id, nome, publisherId',
        saidas: 'id, nome, diaDaSemana, publisherId',
        designacoes: 'id, territorioId, saidaId, publisherId',
        sugestoes: '[territorioId+saidaId], territorioId, saidaId, publisherId',
        metadata: 'key',
        streets: '++id, territoryId, name',
        property_types: '++id, name',
        addresses: '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
        buildingsVillages: 'id, territory_id, publisherId',
        derived_territories: '++id, baseTerritoryId, name',
        derived_territory_addresses: '[derivedTerritoryId+addressId]',
        nao_em_casa: 'id, territorioId, followUpAt, completedAt, conversationConfirmed, publisherId',
        users: 'id, email, role'
      })
      .upgrade(async (transaction) => {
        await transaction
          .table('nao_em_casa')
          .toCollection()
          .modify((record: Record<string, unknown>) => {
            if (typeof record.conversationConfirmed !== 'boolean') {
              record.conversationConfirmed = false;
            }
          });
      });
    this.version(11)
      .stores({
        territorios: 'id, nome, publisherId',
        saidas: 'id, nome, diaDaSemana, publisherId',
        designacoes: 'id, territorioId, saidaId, publisherId',
        sugestoes: '[territorioId+saidaId], territorioId, saidaId, publisherId',
        metadata: 'key',
        streets: '++id, territoryId, name',
        property_types: '++id, name',
        addresses: '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
        buildingsVillages: 'id, territory_id, publisherId',
        derived_territories: '++id, baseTerritoryId, name',
        derived_territory_addresses: '[derivedTerritoryId+addressId]',
        nao_em_casa: 'id, territorioId, followUpAt, completedAt, conversationConfirmed, publisherId',
        users: 'id, email, role'
      })
      .upgrade(async (transaction) => {
        await transaction
          .table('users')
          .toCollection()
          .modify((record: Record<string, unknown>) => {
            if (typeof record.passwordHash !== 'string') {
              record.passwordHash = '';
            }
          });
      });
    this.buildingsVillages = this.table('buildingsVillages');
    this.propertyTypes = this.table('property_types');
    this.derivedTerritories = this.table('derived_territories');
    this.derivedTerritoryAddresses = this.table('derived_territory_addresses');
    this.naoEmCasa = this.table('nao_em_casa');
    this.users = this.table('users');
  }
}

/**
 * The singleton instance of the AppDB class.
 */
export const db = new AppDB();
/**
 * The current version of the database schema.
 */
export const SCHEMA_VERSION = 11;

async function ensureDefaultPropertyTypes(): Promise<void> {
  await db.transaction('rw', db.propertyTypes, async () => {
    const existing = await db.propertyTypes.toArray();
    const existingNames = new Set(
      existing
        .map((type) =>
          typeof type.name === 'string' ? type.name.trim().toLowerCase() : ''
        )
        .filter((name) => name.length > 0)
    );

    const missing = DEFAULT_PROPERTY_TYPE_NAMES.filter(
      (name) => !existingNames.has(name.trim().toLowerCase())
    );

    const valuesToInsert =
      existing.length === 0 ? DEFAULT_PROPERTY_TYPE_NAMES : missing;

    if (valuesToInsert.length > 0) {
      await db.propertyTypes.bulkAdd(
        valuesToInsert.map((name) => ({ name }))
      );
    }
  });
}

/**
 * Ensures the default property types exist, repopulating the table when it is
 * empty or missing any default entries.
 */
export async function ensureDefaultPropertyTypesSeeded(): Promise<void> {
  await ensureDefaultPropertyTypes();
}

/**
 * Ensures the default admin master user exists with a valid password hash.
 */
export async function ensureAdminMasterUserSeeded(): Promise<void> {
  const existing = await db.users.get(ADMIN_MASTER_USERNAME);
  const now = new Date().toISOString();

  if (!existing) {
    const passwordHash = await hashPassword(ADMIN_MASTER_DEFAULT_PASSWORD);
    const record: User = {
      id: ADMIN_MASTER_USERNAME,
      name: ADMIN_MASTER_DEFAULT_NAME,
      email: ADMIN_MASTER_DEFAULT_EMAIL,
      role: ADMIN_MASTER_DEFAULT_ROLE,
      passwordHash,
      createdAt: now,
      updatedAt: now
    };
    await db.users.put(record);
    return;
  }

  const updates: Partial<User> = {};
  let shouldUpdate = false;

  if (typeof existing.passwordHash !== 'string' || existing.passwordHash.trim().length === 0) {
    updates.passwordHash = await hashPassword(ADMIN_MASTER_DEFAULT_PASSWORD);
    shouldUpdate = true;
  }

  if (existing.role !== ADMIN_MASTER_DEFAULT_ROLE) {
    updates.role = ADMIN_MASTER_DEFAULT_ROLE;
    shouldUpdate = true;
  }

  if (typeof existing.name !== 'string' || existing.name.trim().length === 0) {
    updates.name = ADMIN_MASTER_DEFAULT_NAME;
    shouldUpdate = true;
  }

  if (typeof existing.email !== 'string' || existing.email.trim().length === 0) {
    updates.email = ADMIN_MASTER_DEFAULT_EMAIL;
    shouldUpdate = true;
  }

  if (typeof existing.createdAt !== 'string' || existing.createdAt.trim().length === 0) {
    updates.createdAt = now;
    shouldUpdate = true;
  }

  if (shouldUpdate) {
    updates.updatedAt = now;
    await db.users.put({ ...existing, ...updates, id: existing.id });
  } else if (typeof existing.updatedAt !== 'string' || existing.updatedAt.trim().length === 0) {
    await db.users.put({ ...existing, updatedAt: now });
  }
}

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
        void _legacyBuildings;
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
            publisherId: '',
            name: pickString(legacy.name),
            address_line: pickString(legacy.addressLine, legacy.address_line),
            type: pickString(legacy.type),
            number: pickString(legacy.number),
            residences_count: pickNumber(legacy.residencesCount, legacy.residences_count),
            modality: pickString(legacy.modality),
            reception_type: pickString(legacy.receptionType, legacy.reception_type),
            responsible: pickString(legacy.responsible),
            contact_method: null,
            letter_status: null,
            letter_history: [],
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
      [
        db.buildingsVillages,
        db.streets,
        db.addresses,
        db.propertyTypes,
        db.derivedTerritories,
        db.derivedTerritoryAddresses,
        db.metadata
      ],
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
  if (current < 4) {
    // Schema version 4 introduces visit tracking metadata for addresses.
    await db.transaction('rw', db.addresses, db.metadata, async () => {
      const addresses = await db.addresses.toArray();
      let updatedCount = 0;

      for (const address of addresses) {
        const id = address.id;
        if (id === undefined) {
          continue;
        }

        const rawLast = address.lastSuccessfulVisit;
        const lastDate = typeof rawLast === 'string' ? new Date(rawLast) : null;
        const sanitizedLast =
          lastDate && !Number.isNaN(lastDate.getTime()) ? lastDate.toISOString() : null;

        const rawNext = address.nextVisitAllowed;
        const nextDateCandidate = typeof rawNext === 'string' ? new Date(rawNext) : null;
        const sanitizedNextInitial =
          nextDateCandidate && !Number.isNaN(nextDateCandidate.getTime())
            ? nextDateCandidate.toISOString()
            : null;

        let sanitizedNext = sanitizedNextInitial;
        if (!sanitizedNext && sanitizedLast) {
          const calculated = new Date(new Date(sanitizedLast).getTime() + ADDRESS_VISIT_COOLDOWN_MS);
          sanitizedNext = calculated.toISOString();
        }

        const update: Partial<Address> = {};
        if (address.lastSuccessfulVisit !== sanitizedLast) {
          update.lastSuccessfulVisit = sanitizedLast;
        }
        if (address.nextVisitAllowed !== sanitizedNext) {
          update.nextVisitAllowed = sanitizedNext;
        }

        if (Object.keys(update).length > 0) {
          await db.addresses.update(id, update);
          updatedCount++;
        }
      }

      if (updatedCount > 0) {
        const existing = await db.metadata.get('addressVisitsMigrated');
        const total = (existing?.value ?? 0) + updatedCount;
        await db.metadata.put({ key: 'addressVisitsMigrated', value: total });
      }
    });
  }
  if (current < 5) {
    // Schema version 5 introduces correspondence tracking fields for buildings/villages.
    await db.transaction('rw', db.buildingsVillages, db.metadata, async () => {
      const statusSet = new Set<BuildingVillageLetterStatus>(LETTER_STATUS_VALUES);
      const sanitizeText = (value: unknown): string | null => {
        if (typeof value !== 'string') {
          return null;
        }
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : null;
      };
      const sanitizeDate = (value: unknown): string | null => {
        if (typeof value !== 'string') {
          return null;
        }
        const trimmed = value.trim();
        if (trimmed.length === 0) {
          return null;
        }
        if (/^\d{4}-\d{2}-\d{2}/.test(trimmed) && trimmed.length > 10) {
          return trimmed.slice(0, 10);
        }
        return trimmed;
      };
      const sanitizeHistoryEntry = (
        buildingId: string,
        entry: unknown,
        index: number
      ): BuildingVillageLetterHistoryEntry | null => {
        if (typeof entry !== 'object' || entry === null) {
          return null;
        }
        const candidate = entry as Record<string, unknown>;
        const rawId = candidate.id;
        const fallbackId = `${buildingId}-letter-${index + 1}`;
        const id = typeof rawId === 'string' && rawId.trim().length > 0 ? rawId.trim() : fallbackId;

        const rawStatus = candidate.status;
        const status =
          typeof rawStatus === 'string' && statusSet.has(rawStatus as BuildingVillageLetterStatus)
            ? (rawStatus as BuildingVillageLetterStatus)
            : 'sent';

        const sent_at = sanitizeDate(
          typeof candidate.sent_at === 'string'
            ? candidate.sent_at
            : typeof candidate.sentAt === 'string'
            ? (candidate.sentAt as string)
            : null
        );

        const notes = sanitizeText(
          typeof candidate.notes === 'string'
            ? candidate.notes
            : typeof candidate.description === 'string'
            ? (candidate.description as string)
            : null
        );

        return { id, status, sent_at, notes };
      };

      const buildings = await db.buildingsVillages.toArray();
      let updatedCount = 0;

      for (const building of buildings) {
        const update: Partial<BuildingVillage> = {};

        const rawContact = (building as { contact_method?: unknown }).contact_method;
        if (typeof rawContact === 'string') {
          const trimmed = rawContact.trim();
          if (trimmed.length === 0) {
            update.contact_method = null;
          } else if (trimmed !== rawContact) {
            update.contact_method = trimmed;
          }
        } else if (rawContact === undefined) {
          update.contact_method = null;
        } else if (rawContact !== null) {
          update.contact_method = null;
        }

        const rawStatus = (building as { letter_status?: unknown }).letter_status;
        let normalizedStatus: BuildingVillageLetterStatus | null = null;
        if (typeof rawStatus === 'string' && statusSet.has(rawStatus as BuildingVillageLetterStatus)) {
          normalizedStatus = rawStatus as BuildingVillageLetterStatus;
        }
        if (rawStatus !== normalizedStatus) {
          update.letter_status = normalizedStatus;
        }

        const historyRaw = (building as { letter_history?: unknown }).letter_history;
        const normalizedHistory = Array.isArray(historyRaw)
          ? historyRaw
              .map((entry, index) => sanitizeHistoryEntry(building.id, entry, index))
              .filter((entry): entry is BuildingVillageLetterHistoryEntry => entry !== null)
          : [];

        let historyChanged = true;
        if (Array.isArray(historyRaw)) {
          historyChanged =
            historyRaw.length !== normalizedHistory.length ||
            historyRaw.some((entry, index) => {
              const normalizedEntry = normalizedHistory[index];
              if (!normalizedEntry) {
                return true;
              }
              const candidate = entry as Partial<BuildingVillageLetterHistoryEntry> & {
                sentAt?: unknown;
                description?: unknown;
              };
              const currentSentAt =
                typeof candidate?.sent_at === 'string'
                  ? candidate.sent_at
                  : typeof candidate?.sentAt === 'string'
                  ? (candidate.sentAt as string)
                  : null;
              const currentNotes =
                typeof candidate?.notes === 'string'
                  ? candidate.notes
                  : typeof candidate?.description === 'string'
                  ? (candidate.description as string)
                  : null;
              return (
                candidate?.id !== normalizedEntry.id ||
                candidate?.status !== normalizedEntry.status ||
                currentSentAt !== normalizedEntry.sent_at ||
                currentNotes !== normalizedEntry.notes
              );
            });
        }
        if (historyChanged) {
          update.letter_history = normalizedHistory;
        }

        if (Object.keys(update).length > 0) {
          await db.buildingsVillages.update(building.id, update);
          updatedCount++;
        }
      }

      if (updatedCount > 0) {
        const existing = await db.metadata.get('buildingsVillagesLettersMigrated');
        const total = (existing?.value ?? 0) + updatedCount;
        await db.metadata.put({ key: 'buildingsVillagesLettersMigrated', value: total });
      }
    });
  }
  if (current < 7) {
    await db.transaction(
      'rw',
      [
        db.territorios,
        db.saidas,
        db.designacoes,
        db.sugestoes,
        db.buildingsVillages,
        db.naoEmCasa
      ],
      async () => {
        const fallbackPublisherId = '';
        const ensurePublisherId = async <T extends { publisherId?: unknown }>(
          table: Table<T, unknown>
        ) => {
          await table.toCollection().modify((record) => {
            if (typeof record.publisherId !== 'string') {
              (record as T & { publisherId: string }).publisherId = fallbackPublisherId;
            }
          });
        };

        await Promise.all([
          ensurePublisherId(db.territorios),
          ensurePublisherId(db.saidas),
          ensurePublisherId(db.designacoes),
          ensurePublisherId(db.sugestoes),
          ensurePublisherId(db.buildingsVillages),
          ensurePublisherId(db.naoEmCasa),
        ]);
      }
    );
  }
  if (current < 8) {
    await ensureDefaultPropertyTypesSeeded();
  }
  await ensureAdminMasterUserSeeded();
  if (current < SCHEMA_VERSION) {
    await setSchemaVersion(SCHEMA_VERSION);
  }
}
