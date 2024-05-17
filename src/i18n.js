import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { DateTime } from "luxon";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    supportedLngs: ["en", "tr"], // Desteklenen dilleri burada belirtin
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Dil dedektörü konfigürasyonu
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
    backend: {
      // Backend ayarları
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

// New usage for date formatting
i18n.services.formatter.add("DATE_HUGE", (value, lng, options) => {
  return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE);
});

export default i18n;
