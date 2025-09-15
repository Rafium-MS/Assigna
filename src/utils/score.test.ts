import { describe, expect, test } from 'vitest';
import { computeScore } from './score';

describe('score utils', () => {
  test('computeScore sums the provided values', () => {
    expect(computeScore([1, 2, 3, 4])).toBe(10);
    expect(computeScore([5, -2, 7])).toBe(10);
  });

  test('computeScore returns zero for an empty array', () => {
    expect(computeScore([])).toBe(0);
  });
});
