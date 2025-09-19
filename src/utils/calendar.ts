const toDate = (iso: string): Date => new Date(`${iso}T00:00:00`);

export const weekdays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

export const formatIsoDate = (iso: string): string => toDate(iso).toLocaleDateString();

export const addDaysToIso = (iso: string, days: number): string => {
  const date = toDate(iso);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const nextDateForWeekday = (baseIso: string, weekday: number): string => {
  const date = toDate(baseIso);
  while (date.getDay() !== weekday) {
    date.setDate(date.getDate() + 1);
  }
  return date.toISOString().slice(0, 10);
};

export const formatLocalDateTimeForInput = (date: Date): string => {
  const timezoneOffsetInMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffsetInMs).toISOString().slice(0, 16);
};
