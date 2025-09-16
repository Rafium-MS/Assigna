import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * A component for selecting the application language.
 * It allows the user to switch between available languages.
 * @returns A JSX element representing the language selector.
 */
export const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();

  const change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', lng);
    }
  };

  return (
    <select value={i18n.language} onChange={change} className="border rounded px-2 py-1">
      <option value="en-US">{t('language.english')}</option>
      <option value="pt-BR">{t('language.portuguese')}</option>
      <option value="es-ES">{t('language.spanish')}</option>
    </select>
  );
};
