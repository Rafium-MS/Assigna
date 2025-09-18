export interface NaoEmCasaRegistro {
  id: string;
  territorioId: string;
  addressId?: number | null;
  streetId?: number | null;
  streetName?: string | null;
  numberStart?: number | null;
  numberEnd?: number | null;
  propertyTypeId?: number | null;
  propertyTypeName?: string | null;
  recordedAt: string;
  followUpAt: string;
  completedAt?: string | null;
}
