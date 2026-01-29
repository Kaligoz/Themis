"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '../../public/locales/en/common.json';
import uaCommon from '../../public/locales/ua/common.json';

i18n
  .use(Backend)                 
  .use(LanguageDetector)       
  .use(initReactI18next)        
  .init({
    resources: {
      en: {
        common: enCommon,
      },
      ua: {
        common: uaCommon,
      },
    },
    lng: "en",
    fallbackLng: 'en',
    debug: true,
    ns: ['common', 'home'],     
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
  });

export default i18n;
