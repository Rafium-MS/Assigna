import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  addDaysToIso,
  formatLocalDateForInput,
  formatLocalDateTimeForInput,
  todayLocalIso,
} from './calendar';

describe('calendar utils', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('formatLocalDateForInput adjusts positive timezone offsets', () => {
    const date = new Date('2024-05-01T01:23:45Z');
    vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(180);

    expect(formatLocalDateForInput(date)).toBe('2024-04-30');
  });

  test('formatLocalDateForInput adjusts negative timezone offsets', () => {
    const date = new Date('2024-05-01T22:23:45Z');
    vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(-180);

    expect(formatLocalDateForInput(date)).toBe('2024-05-02');
  });

  test('formatLocalDateTimeForInput adjusts positive timezone offsets', () => {
    const date = new Date('2024-05-01T12:34:56Z');
    vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(180);

    expect(formatLocalDateTimeForInput(date)).toBe('2024-05-01T09:34');
  });

  test('formatLocalDateTimeForInput adjusts negative timezone offsets', () => {
    const date = new Date('2024-05-01T00:15:00Z');
    vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(-120);

    expect(formatLocalDateTimeForInput(date)).toBe('2024-05-01T02:15');
  });

  test('addDaysToIso respects local timezone offsets', () => {
    vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(-180);

    expect(addDaysToIso('2024-05-21', 0)).toBe('2024-05-21');
    expect(addDaysToIso('2024-05-21', 5)).toBe('2024-05-26');
  });

  test('todayLocalIso returns local date string', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-05-01T01:00:00Z'));
    vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(180);

    expect(todayLocalIso()).toBe('2024-04-30');
  });
});
