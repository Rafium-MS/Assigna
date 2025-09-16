import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../forms/LanguageSelector';

/**
 * Props for the NavBar component.
 */
interface Props {
  /**
   * A function to navigate to a different page.
   * @param page The page to navigate to.
   */
  navigate: (page: 'home' | 'about') => void;
}

/**
 * A component for the main navigation bar.
 * @param props The props for the component.
 * @returns A JSX element representing the navigation bar.
 */
export const NavBar = ({ navigate }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <nav className="flex gap-4 p-4 bg-gray-100 items-center">
      <button onClick={() => navigate('home')}>{t('navbar.home')}</button>
      <button onClick={() => navigate('about')}>{t('navbar.about')}</button>
      <LanguageSelector />
    </nav>
  );
};
