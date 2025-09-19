// utils/calendar.ts

/** Cria Date local a partir de 'YYYY-MM-DD' sem ambiguidades de timezone */
const toDate = (iso: string): Date => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
};

/** Converte Date -> ISO local (ajustando offset) */
const toLocalISOString = (date: Date): string => {
  const ms = date.getTime() - date.getTimezoneOffset() * 60_000;
  return new Date(ms).toISOString();
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

export const formatIsoDate = (iso: string): string =>
  toDate(iso).toLocaleDateString(); // ou 'pt-BR' se preferir

/** Para <input type="date"> -> 'YYYY-MM-DD' no horário local */
export const formatLocalDateForInput = (date: Date): string =>
  toLocalISOString(date).slice(0, 10);

/** Para <input type="datetime-local"> -> 'YYYY-MM-DDTHH:MM' no horário local */
export const formatLocalDateTimeForInput = (date: Date): string =>
  toLocalISOString(date).slice(0, 16);

export const addDaysToIso = (iso: string, days: number): string => {
  const date = toDate(iso);
  date.setDate(date.getDate() + days);
  return formatLocalDateForInput(date);
};

/**
 * Próxima data (inclusive) para o dia da semana desejado.
 * weekday: 0=Dom, 1=Seg, ... 6=Sáb
 */
export const nextDateForWeekday = (
  baseIso: string,
  weekday: number,
): string => {
  const date = toDate(baseIso);
  const delta = (weekday - date.getDay() + 7) % 7; // 0 mantém o mesmo dia
  if (delta) date.setDate(date.getDate() + delta);
  return formatLocalDateForInput(date);
};

export const todayLocalIso = (): string => formatLocalDateForInput(new Date());
