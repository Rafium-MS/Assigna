export interface BuildingVillage {
  id: string;
  territory_id: string;
  name: string | null;
  address_line: string | null;
  type: string | null;
  number: string | null;
  residences_count: number | null;
  modality: string | null;
  reception_type: string | null;
  responsible: string | null;
  assigned_at: string | null;
  returned_at: string | null;
  block: string | null;
  notes: string | null;
  created_at: string | null;
}
