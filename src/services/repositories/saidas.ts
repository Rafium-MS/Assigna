import type { Saida } from '../../types/saida';
import { db } from '../db';

export const SaidaRepository = {
  async all(): Promise<Saida[]> {
    return db.saidas.toArray();
  },
  async add(saida: Saida): Promise<void> {
    await db.saidas.put(saida);
  },
  async bulkAdd(saidas: Saida[]): Promise<void> {
    await db.saidas.bulkPut(saidas);
  },
  async remove(id: string): Promise<void> {
    await db.saidas.delete(id);
  }
};
