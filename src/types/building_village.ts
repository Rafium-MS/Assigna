export const LETTER_STATUS_VALUES = ['not_sent', 'in_progress', 'sent', 'responded'] as const;

export type BuildingVillageLetterStatus = (typeof LETTER_STATUS_VALUES)[number];

export interface BuildingVillageLetterHistoryEntry {
  id: string;
  status: BuildingVillageLetterStatus;
  sent_at: string | null;
  notes: string | null;
}

export interface BuildingVillage {
  id: string;
  territory_id: string;
  publisherId: string;
  name: string | null;
  address_line: string | null;
  type: string | null;
  number: string | null;
  residences_count: number | null;
  modality: string | null;
  reception_type: string | null;
  responsible: string | null;
  contact_method: string | null;
  letter_status: BuildingVillageLetterStatus | null;
  letter_history: BuildingVillageLetterHistoryEntry[];
  assigned_at: string | null;
  returned_at: string | null;
  block: string | null;
  notes: string | null;
  created_at: string | null;
}
