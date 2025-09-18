import {
  DesignacaoRepository,
  SaidaRepository,
  SugestaoRepository,
  TerritorioRepository,
  NaoEmCasaRepository
} from '../repositories';
import { BuildingVillageRepository } from '../repositories/buildings_villages';
import { db, SCHEMA_VERSION } from '../db';
import type { ExportedData } from '../data-transfer';

const formatTimestamp = (date: Date): string => {
  const pad = (value: number) => value.toString().padStart(2, '0');
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds())
  ].join('');
};

const buildExportPayload = async (publisherId: string): Promise<ExportedData> => {
  const [territorios, saidas, designacoes, sugestoes, naoEmCasa, buildingsVillages] = await Promise.all([
    TerritorioRepository.forPublisher(publisherId),
    SaidaRepository.forPublisher(publisherId),
    DesignacaoRepository.forPublisher(publisherId),
    SugestaoRepository.forPublisher(publisherId),
    NaoEmCasaRepository.forPublisher(publisherId),
    BuildingVillageRepository.forPublisher(publisherId)
  ]);

  const [streets, propertyTypes, addresses, derivedTerritories, derivedTerritoryAddresses, metadata] =
    await Promise.all([
      db.streets.toArray(),
      db.propertyTypes.toArray(),
      db.addresses.toArray(),
      db.derivedTerritories.toArray(),
      db.derivedTerritoryAddresses.toArray(),
      db.metadata.toArray()
    ]);

  return {
    version: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    territorios,
    saidas,
    designacoes,
    sugestoes,
    naoEmCasa,
    buildingsVillages,
    streets,
    propertyTypes,
    addresses,
    derivedTerritories,
    derivedTerritoryAddresses,
    metadata
  };
};

const triggerDownload = (content: string): void => {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const timestamp = formatTimestamp(new Date());

  anchor.href = url;
  anchor.download = `assigna-export-${timestamp}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

/**
 * Exports all application data to a JSON file that the user can download.
 */
export const exportData = async (publisherId: string): Promise<void> => {
  if (!publisherId) {
    throw new Error('Publisher ID is required to export data');
  }

  const payload = await buildExportPayload(publisherId);
  const content = JSON.stringify(payload, null, 2);
  triggerDownload(content);
};
