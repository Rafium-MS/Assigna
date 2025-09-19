const toDate = (iso: string): Date => new Date(`${iso}T00:00:00`);

const toLocalISOString = (date: Date): string => {
  const timezoneOffsetInMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffsetInMs).toISOString();
};

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

export const formatLocalDateForInput = (date: Date): string => toLocalISOString(date).slice(0, 10);

export const addDaysToIso = (iso: string, days: number): string => {
  const date = toDate(iso);
  date.setDate(date.getDate() + days);
  return formatLocalDateForInput(date);
};

export const nextDateForWeekday = (baseIso: string, weekday: number): string => {
  const date = toDate(baseIso);
  while (date.getDay() !== weekday) {
    date.setDate(date.getDate() + 1);
  }
  return formatLocalDateForInput(date);
};

const adjustForTimezoneOffset = (date: Date): Date => {
  const timezoneOffsetInMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffsetInMs);
};

export const formatLocalDateTimeForInput = (date: Date): string =>
  adjustForTimezoneOffset(date).toISOString().slice(0, 16);

export const formatLocalDateForInput = (date: Date): string =>
  adjustForTimezoneOffset(date).toISOString().slice(0, 10);
export const formatLocalDateTimeForInput = (date: Date): string => toLocalISOString(date).slice(0, 16);

export const todayLocalIso = (): string => formatLocalDateForInput(new Date());
