import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

interface Props {
  navigate: (page: 'home' | 'about') => void;
}

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
