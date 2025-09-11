import Dexie, { Table } from 'dexie';
import type { Territorio } from '../types/territorio';
import type { Saida } from '../types/saida';
import type { Designacao } from '../types/designacao';
import type { Sugestao } from '../types/sugestao';

export interface Metadata {
  key: string;
  value: number;
}

class AppDB extends Dexie {
  territorios!: Table<Territorio, string>;
  saidas!: Table<Saida, string>;
  designacoes!: Table<Designacao, string>;
  sugestoes!: Table<Sugestao, string>;
  metadata!: Table<Metadata, string>;

  constructor() {
    super('assigna');
    this.version(1).stores({
      territorios: 'id, nome',
      saidas: 'id, nome, diaDaSemana',
      designacoes: 'id, territorioId, saidaId',
      sugestoes: '[territorioId+saidaId]',
      metadata: 'key'
    });
  }
}

export const db = new AppDB();
export const SCHEMA_VERSION = 1;

export async function getSchemaVersion(): Promise<number> {
  const meta = await db.metadata.get('schemaVersion');
  return meta?.value ?? 0;
}

export async function setSchemaVersion(version: number): Promise<void> {
  await db.metadata.put({ key: 'schemaVersion', value: version });
}

export async function migrate(): Promise<void> {
  const current = await getSchemaVersion();
  if (current < SCHEMA_VERSION) {
    await setSchemaVersion(SCHEMA_VERSION);
  }
}
