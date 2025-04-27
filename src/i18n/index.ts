import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './locales/en/index';
import { ru } from './locales/ru/index';
import { ja } from './locales/ja/index';
import { zh } from './locales/zh/index';
import { hi } from './locales/hi/index';

const russianCountries = ['RU', 'BY', 'KZ', 'KG', 'TJ', 'UZ'];
const japaneseCountries = ['JP'];
const chineseCountries = ['CN', 'HK', 'TW', 'MO'];
const hindiCountries = ['IN'];

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: 'countryBasedDetector',
  lookup() {
    const countryCode = navigator.language.split('-')[1]?.toUpperCase();
    if (russianCountries.includes(countryCode)) return 'ru';
    if (japaneseCountries.includes(countryCode)) return 'ja';
    if (chineseCountries.includes(countryCode)) return 'zh';
    if (hindiCountries.includes(countryCode)) return 'hi';
    return 'en';
  },
  cacheUserLanguage(lng) {
    localStorage.setItem('i18nextLng', lng);
  }
});

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      ja: { translation: ja },
      zh: { translation: zh },
      hi: { translation: hi }
    },
    detection: {
      order: ['countryBasedDetector', 'localStorage', 'navigator'],
      caches: ['localStorage']
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;