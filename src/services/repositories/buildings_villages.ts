import type { BuildingVillage } from '../../types/building_village';
import { db } from '../db';

export const BuildingVillageRepository = {
  async all(): Promise<BuildingVillage[]> {
    return db.buildingsVillages.toArray();
  },
  async add(buildingVillage: BuildingVillage): Promise<void> {
    await db.buildingsVillages.put(buildingVillage);
  },
  async bulkAdd(buildingsVillages: BuildingVillage[]): Promise<void> {
    await db.buildingsVillages.bulkPut(buildingsVillages);
  },
  async remove(id: string): Promise<void> {
    await db.buildingsVillages.delete(id);
  }
};
