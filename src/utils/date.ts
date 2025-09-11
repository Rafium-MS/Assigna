export const formatDate = (date: Date): string =>
  date.toISOString().split('T')[0];

export const addDays = (isoDate: string, days: number): string => {
  const result = new Date(isoDate);
  result.setDate(result.getDate() + days);
  return formatDate(result);
};
