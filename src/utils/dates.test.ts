import { describe, expect, test } from 'vitest';
import { addDays, formatDate } from './dates';

describe('dates utils', () => {
  test('formatDate returns ISO string representation', () => {
    const date = new Date('2024-02-29T12:00:00Z');
    expect(formatDate(date)).toBe('2024-02-29');
  });

  test('addDays handles transitions across months and years', () => {
    expect(addDays('2023-12-31', 1)).toBe('2024-01-01');
    expect(addDays('2024-01-31', 1)).toBe('2024-02-01');
  });
});
