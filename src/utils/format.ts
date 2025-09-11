import i18n from '../i18n';

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat(i18n.language).format(date);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat(i18n.language).format(value);
};
