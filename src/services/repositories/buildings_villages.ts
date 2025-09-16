import type { BuildingVillage } from '../../types/building_village';
import { db } from '../db';

/**
 * Repository for managing BuildingVillage data.
 */
export const BuildingVillageRepository = {
  /**
   * Retrieves all building/village entries from the database.
   * @returns A promise that resolves to an array of BuildingVillage objects.
   */
  async all(): Promise<BuildingVillage[]> {
    return db.buildingsVillages.toArray();
  },

  /**
   * Adds a new building/village entry to the database.
   * @param buildingVillage The BuildingVillage object to add.
   * @returns A promise that resolves when the operation is complete.
   */
  async add(buildingVillage: BuildingVillage): Promise<void> {
    await db.buildingsVillages.put(buildingVillage);
  },

  /**
   * Adds multiple building/village entries to the database in a bulk operation.
   * @param buildingsVillages An array of BuildingVillage objects to add.
   * @returns A promise that resolves when the operation is complete.
   */
  async bulkAdd(buildingsVillages: BuildingVillage[]): Promise<void> {
    await db.buildingsVillages.bulkPut(buildingsVillages);
  },

  /**
   * Removes a building/village entry from the database.
   * @param id The ID of the building/village to remove.
   * @returns A promise that resolves when the operation is complete.
   */
  async remove(id: string): Promise<void> {
    await db.buildingsVillages.delete(id);
  }
};
