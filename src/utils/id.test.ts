import { describe, expect, test } from 'vitest';
import { generateId } from './id';

describe('generateId', () => {
  test('returns a string', () => {
    expect(typeof generateId()).toBe('string');
  });
});
