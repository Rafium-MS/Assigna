export interface Address {
  id?: number;
  streetId: number;
  numberStart: number;
  numberEnd: number;
  propertyTypeId: number;
  lastSuccessfulVisit?: string | null;
  nextVisitAllowed?: string | null;
}

