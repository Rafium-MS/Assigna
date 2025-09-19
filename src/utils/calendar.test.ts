import { afterEach, describe, expect, test, vi } from 'vitest';
import { formatLocalDateTimeForInput } from './calendar';

describe('calendar utils', () => {
  afterEach(() => {
    vi.restoreAllMocks();
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
});
