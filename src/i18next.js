import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './en.json';
import koTranslation from './ko.json';
import chiTranslation from './chi.json';
import frTranslation from './fr.json';

const Languages = ['en', 'ko', 'chi', 'fr'];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    whitelist: Languages,

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: { translation: enTranslation },
      ko: { translation: koTranslation },
      chi: { translation: chiTranslation },
      fr: { translation: frTranslation },
    },
  });

export default i18n;
