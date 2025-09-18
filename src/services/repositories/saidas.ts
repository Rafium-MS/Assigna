import type { Saida } from '../../types/saida';
import { db } from '../db';

/**
 * Repository for managing Saida data.
 */
export const SaidaRepository = {
  /**
   * Retrieves all saidas from the database.
   * @returns A promise that resolves to an array of Saida objects.
   */
  async all(): Promise<Saida[]> {
    return db.saidas.toArray();
  },

  /**
   * Retrieves all saidas assigned to a specific publisher.
   * @param publisherId The identifier of the publisher whose saidas should be returned.
   * @returns A promise that resolves to an array of Saida objects.
   */
  async forPublisher(publisherId: string): Promise<Saida[]> {
    return db.saidas.where('publisherId').equals(publisherId).toArray();
  },

  /**
   * Adds a new saida to the database.
   * @param saida The Saida object to add.
   * @returns A promise that resolves when the operation is complete.
   */
  async add(saida: Saida): Promise<void> {
    await db.saidas.put(saida);
  },

  /**
   * Adds multiple saidas to the database in a bulk operation.
   * @param saidas An array of Saida objects to add.
   * @returns A promise that resolves when the operation is complete.
   */
  async bulkAdd(saidas: Saida[]): Promise<void> {
    await db.saidas.bulkPut(saidas);
  },

  /**
   * Removes all saídas from the database.
   * @returns A promise that resolves when the operation is complete.
   */
  async clear(): Promise<void> {
    await db.saidas.clear();
  },

  /**
   * Removes a saida from the database.
   * @param id The ID of the saida to remove.
   * @returns A promise that resolves when the operation is complete.
   */
  async remove(id: string): Promise<void> {
    await db.saidas.delete(id);
  }
};
