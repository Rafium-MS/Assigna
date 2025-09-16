import i18n from '../i18n';

/**
 * Formats a date object into a localized string representation.
 * @param date The date to be formatted.
 * @returns A string with the localized date.
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat(i18n.language).format(date);
};

/**
 * Formats a number into a localized string representation.
 * @param value The number to be formatted.
 * @returns A string with the localized number.
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat(i18n.language).format(value);
};
