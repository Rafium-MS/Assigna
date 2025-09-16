import { ZodError } from 'zod';
import { exportedDataSchema, type ExportedData } from '../data-transfer';
import {
  DesignacaoRepository,
  SaidaRepository,
  SugestaoRepository,
  TerritorioRepository
} from '../repositories';
import { BuildingVillageRepository } from '../repositories/buildings_villages';
import { db, SCHEMA_VERSION } from '../db';

type ImportSource = File | Blob | string;

const readSource = async (source: ImportSource): Promise<string> => {
  if (typeof source === 'string') {
    return source;
  }

  return source.text();
};

const prepareMetadata = (data: ExportedData) => {
  const entries = data.metadata.filter((item) => item.key !== 'schemaVersion');
  entries.push({ key: 'schemaVersion', value: SCHEMA_VERSION });
  return entries;
};

/**
 * Imports application data from a JSON file and persists it in IndexedDB.
 * @param source The file, blob or JSON string containing the exported data.
 * @returns The data that was imported.
 */
export const importData = async (source: ImportSource): Promise<ExportedData> => {
  const rawContent = await readSource(source);

  let parsedContent: unknown;
  try {
    parsedContent = JSON.parse(rawContent);
  } catch {
    throw new Error('INVALID_JSON');
  }

  let data: ExportedData;
  try {
    data = exportedDataSchema.parse(parsedContent);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error('INVALID_EXPORT_DATA');
    }
    throw error;
  }

  const metadataRecords = prepareMetadata(data);

  await db.transaction(
    'rw',
    db.territorios,
    db.saidas,
    db.designacoes,
    db.sugestoes,
    db.buildingsVillages,
    db.streets,
    db.propertyTypes,
    db.addresses,
    db.derivedTerritories,
    db.derivedTerritoryAddresses,
    db.metadata,
    async () => {
      await Promise.all([
        TerritorioRepository.clear(),
        SaidaRepository.clear(),
        DesignacaoRepository.clear(),
        SugestaoRepository.clear(),
        BuildingVillageRepository.clear(),
        db.streets.clear(),
        db.propertyTypes.clear(),
        db.addresses.clear(),
        db.derivedTerritories.clear(),
        db.derivedTerritoryAddresses.clear(),
        db.metadata.clear()
      ]);

      if (data.territorios.length > 0) {
        await TerritorioRepository.bulkAdd(data.territorios);
      }
      if (data.saidas.length > 0) {
        await SaidaRepository.bulkAdd(data.saidas);
      }
      if (data.designacoes.length > 0) {
        await DesignacaoRepository.bulkAdd(data.designacoes);
      }
      if (data.sugestoes.length > 0) {
        await SugestaoRepository.bulkAdd(data.sugestoes);
      }
      if (data.buildingsVillages.length > 0) {
        await BuildingVillageRepository.bulkAdd(data.buildingsVillages);
      }
      if (data.streets.length > 0) {
        await db.streets.bulkPut(data.streets);
      }
      if (data.propertyTypes.length > 0) {
        await db.propertyTypes.bulkPut(data.propertyTypes);
      }
      if (data.addresses.length > 0) {
        await db.addresses.bulkPut(data.addresses);
      }
      if (data.derivedTerritories.length > 0) {
        await db.derivedTerritories.bulkPut(data.derivedTerritories);
      }
      if (data.derivedTerritoryAddresses.length > 0) {
        await db.derivedTerritoryAddresses.bulkPut(data.derivedTerritoryAddresses);
      }

      await db.metadata.bulkPut(metadataRecords);
    }
  );

  return { ...data, metadata: metadataRecords, version: SCHEMA_VERSION };
};
