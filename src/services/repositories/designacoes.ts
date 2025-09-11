import type { Designacao } from '../../types/designacao';
import { db } from '../db';

export const DesignacaoRepository = {
  async all(): Promise<Designacao[]> {
    return db.designacoes.toArray();
  },
  async add(designacao: Designacao): Promise<void> {
    await db.designacoes.put(designacao);
  },
  async bulkAdd(designacoes: Designacao[]): Promise<void> {
    await db.designacoes.bulkPut(designacoes);
  },
  async remove(id: string): Promise<void> {
    await db.designacoes.delete(id);
  }
};
