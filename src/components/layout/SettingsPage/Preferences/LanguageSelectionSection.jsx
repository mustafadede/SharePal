import React, { useState } from "react";
import SettingsSubTitle from "../../../common/SettingsPage/SettingsSubTitle";
import { useTranslation } from "react-i18next";
import SelectionComponent from "./SelectionComponent";

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
      <div className="flex flex-row justify-between w-full gap-2">
        <SettingsSubTitle title={t("preferences.language")} />
        <SelectionComponent
          selectedLanguage={selectedLanguage}
          handleLanguageChange={handleLanguageChange}
          selectionType={"language"}
          firstTitle={"English"}
          secondTitle={"Türkçe"}
          FirstVal={"en"}
          SecVal={"tr"}
        />
      </div>
    </div>
  );
}

export default LanguageSelectionSection;
