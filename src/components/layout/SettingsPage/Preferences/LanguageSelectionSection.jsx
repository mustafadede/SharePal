import React, { useState } from "react";
import SettingsSubTitle from "../../../common/SettingsPage/SettingsSubTitle";
import { useTranslation } from "react-i18next";

function LanguageSelectionSection() {
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-2">
        <SettingsSubTitle title={t("preferences.language")} />
        <select
          className="px-4 py-2 mb-4 text-lg text-slate-300 bg-slate-600 rounded-2xl focus:outline-none"
          name="language"
          id="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </div>
    </div>
  );
}

export default LanguageSelectionSection;
