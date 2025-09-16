import { useLocalStorage } from './useLocalStorage';

/**
 * Stores the number of warning days before highlighting overdue designations.
 */
export const useWarningDays = () => useLocalStorage<number>('tm.warningDays', 2);
