import type { SuggestionRuleConfig } from '../types/suggestion-rule-config';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_RULES: SuggestionRuleConfig = {
  avoidLastAssignments: 5,
  defaultDurationDays: 30,
  avoidMonthsPerExit: 6,
  recentWeight: 1,
  balanceWeight: 1,
};

/**
 * Persists and retrieves the suggestion rule configuration from local storage.
 * @returns A tuple containing the current rules and an updater function.
 */
export const useSuggestionRules = () =>
  useLocalStorage<SuggestionRuleConfig>('tm.rules', DEFAULT_RULES);
