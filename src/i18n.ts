import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en-US/translation.json';
import es from './locales/es-ES/translation.json';
import pt from './locales/pt-BR/translation.json';

const stored =
  typeof window !== 'undefined' ? localStorage.getItem('locale') : null;

i18n.use(initReactI18next).init({
  resources: {
    'en-US': { translation: en },
    'es-ES': { translation: es },
    'pt-BR': { translation: pt },
  },
  lng: stored || 'en-US',
  fallbackLng: 'en-US',
  interpolation: { escapeValue: false },
});

export default i18n;
