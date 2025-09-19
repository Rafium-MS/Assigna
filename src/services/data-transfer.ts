import { z } from 'zod';
import type { Territorio } from '../types/territorio';
import type { Saida } from '../types/saida';
import type { Designacao } from '../types/designacao';
import type { Sugestao } from '../types/sugestao';
import {
  LETTER_STATUS_VALUES,
  type BuildingVillage,
} from '../types/building_village';
import type { Street } from '../types/street';
import type { PropertyType } from '../types/property-type';
import type { Address } from '../types/address';
import type { DerivedTerritory } from '../types/derived-territory';
import type { Metadata } from './db';
import type { NaoEmCasaRegistro } from '../types/nao-em-casa';
import type { User } from '../types/user';
import { AVAILABLE_ROLES } from '../constants/roles';

const territorioSchema = z.object({
  id: z.string(),
  nome: z.string(),
  publisherId: z.string().optional().default(''),
  imagem: z.string().optional(),
  imageUrl: z.string().optional(),
});

const saidaSchema = z.object({
  id: z.string(),
  nome: z.string(),
  diaDaSemana: z.number(),
  hora: z.string(),
  publisherId: z.string().optional().default(''),
});

const designacaoSchema = z.object({
  id: z.string(),
  territorioId: z.string(),
  saidaId: z.string(),
  dataInicial: z.string(),
  dataFinal: z.string(),
  publisherId: z.string().optional().default(''),
  devolvido: z.boolean().optional(),
});

const sugestaoSchema = z.object({
  territorioId: z.string(),
  saidaId: z.string(),
  dataInicial: z.string(),
  dataFinal: z.string(),
  publisherId: z.string().optional().default(''),
});

const letterStatusSchema = z.enum(LETTER_STATUS_VALUES);

const buildingVillageLetterHistorySchema = z.object({
  id: z.string(),
  status: letterStatusSchema,
  sent_at: z.string().nullable().optional().default(null),
  notes: z.string().nullable().optional().default(null),
});

const buildingVillageSchema = z.object({
  id: z.string(),
  territory_id: z.string(),
  publisherId: z.string().optional().default(''),
  name: z.string().nullable(),
  address_line: z.string().nullable(),
  type: z.string().nullable(),
  number: z.string().nullable(),
  residences_count: z.number().nullable(),
  modality: z.string().nullable(),
  reception_type: z.string().nullable(),
  responsible: z.string().nullable(),
  contact_method: z.string().nullable().optional().default(null),
  letter_status: letterStatusSchema.nullable().optional().default(null),
  letter_history: z
    .array(buildingVillageLetterHistorySchema)
    .optional()
    .default([]),
  assigned_at: z.string().nullable(),
  returned_at: z.string().nullable(),
  block: z.string().nullable(),
  notes: z.string().nullable(),
  created_at: z.string().nullable(),
});

const streetSchema = z.object({
  id: z.number(),
  territoryId: z.string(),
  name: z.string(),
});

const propertyTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const addressSchema = z.object({
  id: z.number(),
  streetId: z.number(),
  numberStart: z.number(),
  numberEnd: z.number(),
  propertyTypeId: z.number(),
});

const naoEmCasaSchema = z.object({
  id: z.string(),
  territorioId: z.string(),
  publisherId: z.string().optional().default(''),
  addressId: z.number().nullable().optional(),
  streetId: z.number().nullable().optional(),
  streetName: z.string().nullable().optional(),
  numberStart: z.number().nullable().optional(),
  numberEnd: z.number().nullable().optional(),
  propertyTypeId: z.number().nullable().optional(),
  propertyTypeName: z.string().nullable().optional(),
  recordedAt: z.string(),
  followUpAt: z.string(),
  completedAt: z.string().nullable().optional(),
  conversationConfirmed: z.boolean().optional().default(false),
});

const derivedTerritorySchema = z.object({
  id: z.number(),
  baseTerritoryId: z.string(),
  name: z.string(),
});

const derivedTerritoryAddressSchema = z.object({
  derivedTerritoryId: z.number(),
  addressId: z.number(),
});

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(AVAILABLE_ROLES),
  passwordHash: z.string().optional().default(''),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const metadataSchema = z.object({
  key: z.string(),
  value: z.number(),
});

export const exportedDataSchema = z
  .object({
    version: z.number().optional(),
    exportedAt: z.string().optional(),
    territorios: z.array(territorioSchema).optional().default([]),
    saidas: z.array(saidaSchema).optional().default([]),
    designacoes: z.array(designacaoSchema).optional().default([]),
    sugestoes: z.array(sugestaoSchema).optional().default([]),
    buildingsVillages: z.array(buildingVillageSchema).optional().default([]),
    streets: z.array(streetSchema).optional().default([]),
    propertyTypes: z.array(propertyTypeSchema).optional().default([]),
    addresses: z.array(addressSchema).optional().default([]),
    naoEmCasa: z.array(naoEmCasaSchema).optional().default([]),
    derivedTerritories: z.array(derivedTerritorySchema).optional().default([]),
    derivedTerritoryAddresses: z
      .array(derivedTerritoryAddressSchema)
      .optional()
      .default([]),
    metadata: z.array(metadataSchema).optional().default([]),
    users: z.array(userSchema).optional().default([]),
  })
  .transform((data) => ({
    ...data,
    // Ensure arrays are always present even when defaults are used
    territorios: data.territorios ?? [],
    saidas: data.saidas ?? [],
    designacoes: data.designacoes ?? [],
    sugestoes: data.sugestoes ?? [],
    buildingsVillages: data.buildingsVillages ?? [],
    streets: data.streets ?? [],
    propertyTypes: data.propertyTypes ?? [],
    addresses: data.addresses ?? [],
    naoEmCasa: data.naoEmCasa ?? [],
    derivedTerritories: data.derivedTerritories ?? [],
    derivedTerritoryAddresses: data.derivedTerritoryAddresses ?? [],
    metadata: data.metadata ?? [],
    users: data.users ?? [],
  }));

export type ExportedData = {
  version?: number;
  exportedAt?: string;
  territorios: Territorio[];
  saidas: Saida[];
  designacoes: Designacao[];
  sugestoes: Sugestao[];
  buildingsVillages: BuildingVillage[];
  streets: Street[];
  propertyTypes: PropertyType[];
  addresses: Address[];
  naoEmCasa: NaoEmCasaRegistro[];
  derivedTerritories: DerivedTerritory[];
  derivedTerritoryAddresses: Array<{
    derivedTerritoryId: number;
    addressId: number;
  }>;
  metadata: Metadata[];
  users: User[];
};
