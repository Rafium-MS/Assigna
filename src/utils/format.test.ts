import { describe, expect, test, vi } from 'vitest';

vi.mock('../i18n', () => ({
  default: { language: 'en-US' }
}));

describe('format utils', () => {
  test('formatDate respects the configured language', async () => {
    const { formatDate } = await import('./format');
    const i18n = (await import('../i18n')).default as { language: string };
    const date = new Date('2024-05-10T12:00:00Z');

    i18n.language = 'en-US';
    const enUsResult = formatDate(date);
    expect(enUsResult).toBe(new Intl.DateTimeFormat('en-US').format(date));

    i18n.language = 'pt-BR';
    const ptBrResult = formatDate(date);
    expect(ptBrResult).toBe(new Intl.DateTimeFormat('pt-BR').format(date));
    expect(ptBrResult).not.toBe(enUsResult);
  });

  test('formatNumber formats numbers according to language', async () => {
    const { formatNumber } = await import('./format');
    const i18n = (await import('../i18n')).default as { language: string };
    const value = 1234.56;

    i18n.language = 'en-US';
    const enUsResult = formatNumber(value);
    expect(enUsResult).toBe(new Intl.NumberFormat('en-US').format(value));

    i18n.language = 'pt-BR';
    const ptBrResult = formatNumber(value);
    expect(ptBrResult).toBe(new Intl.NumberFormat('pt-BR').format(value));
    expect(ptBrResult).not.toBe(enUsResult);
  });
});
