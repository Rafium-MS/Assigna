/**
 * Formats a Date object to a string in the format 'YYYY-MM-DD'.
 * @param date The date to format.
 * @returns The formatted date string.
 */
export const formatDate = (date: Date): string =>
  date.toISOString().split('T')[0];

/**
 * Adds a specified number of days to a date string.
 * @param isoDate The date string in ISO format ('YYYY-MM-DD').
 * @param days The number of days to add.
 * @returns A new date string with the days added.
 */
export const addDays = (isoDate: string, days: number): string => {
  const result = new Date(isoDate);
  result.setDate(result.getDate() + days);
  return formatDate(result);
};
