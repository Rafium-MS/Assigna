import type { Territorio } from '../../types/territorio';
import { db } from '../db';

/**
 * Repository for managing Territorio data.
 */
export const TerritorioRepository = {
  /**
   * Retrieves all territories from the database.
   * @returns A promise that resolves to an array of Territorio objects.
   */
  async all(): Promise<Territorio[]> {
    return db.territorios.toArray();
  },

  /**
   * Retrieves territories that belong to a specific publisher.
   * @param publisherId The identifier of the publisher whose territories should be returned.
   * @returns A promise that resolves to an array of Territorio objects.
   */
  async forPublisher(publisherId: string): Promise<Territorio[]> {
    return db.territorios.where('publisherId').equals(publisherId).toArray();
  },

  /**
   * Adds a new territorio to the database.
   * @param territorio The Territorio object to add.
   * @returns A promise that resolves when the operation is complete.
   */
  async add(territorio: Territorio): Promise<void> {
    await db.territorios.put(territorio);
  },

  /**
   * Adds multiple territories to the database in a bulk operation.
   * @param territorios An array of Territorio objects to add.
   * @returns A promise that resolves when the operation is complete.
   */
  async bulkAdd(territorios: Territorio[]): Promise<void> {
    await db.territorios.bulkPut(territorios);
  },

  /**
   * Removes all territórios from the database.
   * @returns A promise that resolves when the operation is complete.
   */
  async clear(): Promise<void> {
    await db.territorios.clear();
  },

  /**
   * Removes a territorio from the database.
   * @param id The ID of the territorio to remove.
   * @returns A promise that resolves when the operation is complete.
   */
  async remove(id: string): Promise<void> {
    await db.territorios.delete(id);
  }
};
