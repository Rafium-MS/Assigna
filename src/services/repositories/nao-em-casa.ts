import type { NaoEmCasaRegistro } from '../../types/nao-em-casa';
import { db } from '../db';

/**
 * Repository for managing not-at-home records.
 */
export const NaoEmCasaRepository = {
  /** Returns all not-at-home records. */
  async all(): Promise<NaoEmCasaRegistro[]> {
    return db.naoEmCasa.toArray();
  },

  /**
   * Returns the not-at-home records for a specific publisher.
   * @param publisherId The identifier of the publisher whose records should be returned.
   * @returns A promise that resolves to an array of not-at-home records.
   */
  async forPublisher(publisherId: string): Promise<NaoEmCasaRegistro[]> {
    return db.naoEmCasa.where('publisherId').equals(publisherId).toArray();
  },

  /** Adds or updates a not-at-home record. */
  async add(registro: NaoEmCasaRegistro): Promise<void> {
    await db.naoEmCasa.put(registro);
  },

  /** Bulk inserts not-at-home records. */
  async bulkAdd(registros: NaoEmCasaRegistro[]): Promise<void> {
    await db.naoEmCasa.bulkPut(registros);
  },

  /** Removes a not-at-home record by id. */
  async remove(id: string): Promise<void> {
    await db.naoEmCasa.delete(id);
  },

  /** Clears all not-at-home records. */
  async clear(): Promise<void> {
    await db.naoEmCasa.clear();
  },
};
