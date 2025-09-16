import type { Sugestao } from '../../types/sugestao';
import { db } from '../db';

/**
 * Repository for managing Sugestao data.
 */
export const SugestaoRepository = {
  /**
   * Retrieves all sugestoes from the database.
   * @returns A promise that resolves to an array of Sugestao objects.
   */
  async all(): Promise<Sugestao[]> {
    return db.sugestoes.toArray();
  },

  /**
   * Adds a new sugestao to the database.
   * @param sugestao The Sugestao object to add.
   * @returns A promise that resolves when the operation is complete.
   */
  async add(sugestao: Sugestao): Promise<void> {
    await db.sugestoes.put(sugestao);
  },

  /**
   * Adds multiple sugestoes to the database in a bulk operation.
   * @param sugestoes An array of Sugestao objects to add.
   * @returns A promise that resolves when the operation is complete.
   */
  async bulkAdd(sugestoes: Sugestao[]): Promise<void> {
    await db.sugestoes.bulkPut(sugestoes);
  },

  /**
   * Removes a sugestao from the database.
   * @param territorioId The ID of the territorio associated with the sugestao.
   * @param saidaId The ID of the saida associated with the sugestao.
   * @returns A promise that resolves when the operation is complete.
   */
  async remove(territorioId: string, saidaId: string): Promise<void> {
    await db.sugestoes.delete([territorioId, saidaId]);
  }
};
