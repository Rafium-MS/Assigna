import type { Territorio } from '../../../types';
import { db } from '../index';

export const TerritorioRepository = {
  async all(): Promise<Territorio[]> {
    return db.territorios.toArray();
  },
  async add(territorio: Territorio): Promise<void> {
    await db.territorios.put(territorio);
  },
  async bulkAdd(territorios: Territorio[]): Promise<void> {
    await db.territorios.bulkPut(territorios);
  },
  async remove(id: string): Promise<void> {
    await db.territorios.delete(id);
  }
};
