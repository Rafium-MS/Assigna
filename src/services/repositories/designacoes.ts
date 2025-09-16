import type { Designacao } from '../../types/designacao';
import { db } from '../db';

/**
 * Repository for managing Designacao data.
 */
export const DesignacaoRepository = {
  /**
   * Retrieves all designacoes from the database.
   * @returns A promise that resolves to an array of Designacao objects.
   */
  async all(): Promise<Designacao[]> {
    return db.designacoes.toArray();
  },

  /**
   * Adds a new designacao to the database.
   * @param designacao The Designacao object to add.
   * @returns A promise that resolves when the operation is complete.
   */
  async add(designacao: Designacao): Promise<void> {
    await db.designacoes.put(designacao);
  },

  /**
   * Adds multiple designacoes to the database in a bulk operation.
   * @param designacoes An array of Designacao objects to add.
   * @returns A promise that resolves when the operation is complete.
   */
  async bulkAdd(designacoes: Designacao[]): Promise<void> {
    await db.designacoes.bulkPut(designacoes);
  },

  /**
   * Removes a designacao from the database.
   * @param id The ID of the designacao to remove.
   * @returns A promise that resolves when the operation is complete.
   */
  async remove(id: string): Promise<void> {
    await db.designacoes.delete(id);
  }
};
