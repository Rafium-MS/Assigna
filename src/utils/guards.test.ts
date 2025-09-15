import { describe, expect, test } from 'vitest';
import { isDefined } from './guards';

describe('guards utils', () => {
  test('isDefined filters out null and undefined values', () => {
    const values = [1, null, 2, undefined, 3, 0];
    const filtered = values.filter(isDefined);
    expect(filtered).toEqual([1, 2, 3, 0]);
  });
});
