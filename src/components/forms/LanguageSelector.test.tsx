import React from 'react';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';

type MockI18n = {
  language: string;
  changeLanguage: (lng: string) => void;
};

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const changeLanguageSpy = vi.fn<(lng: string) => void>();
const mockI18n: MockI18n = {
  language: 'en-US',
  changeLanguage: (lng: string) => {
    mockI18n.language = lng;
    changeLanguageSpy(lng);
  },
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: mockI18n,
  }),
}));

import { LanguageSelector } from './LanguageSelector';

const renderSelector = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(<LanguageSelector />);
  });

  const cleanup = () => {
    act(() => {
      root.unmount();
    });
    container.remove();
  };

  return { container, root, cleanup };
};

describe('LanguageSelector', () => {
  beforeEach(() => {
    mockI18n.language = 'en-US';
    changeLanguageSpy.mockClear();
    localStorage.clear();
  });

  it('changes the language and stores the selection', async () => {
    const { container, root, cleanup } = renderSelector();

    try {
      const select = container.querySelector('select');
      if (!select) throw new Error('Language selector not found');

      await act(async () => {
        select.value = 'pt-BR';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      });

      expect(changeLanguageSpy).toHaveBeenCalledWith('pt-BR');
      expect(localStorage.getItem('locale')).toBe('pt-BR');

      await act(async () => {
        root.render(<LanguageSelector />);
      });

      const updatedSelect = container.querySelector('select');
      expect(updatedSelect?.value).toBe('pt-BR');
    } finally {
      cleanup();
    }
  });
});
