import React from "react";
import { useTranslation } from "react-i18next";

function LanguageButton() {
  const { i18n } = useTranslation();
  return (
    <button
      className="hidden px-3 py-2 lg:flex bg-fuchsia-600/50 rounded-xl"
      onClick={() => i18n.changeLanguage(i18n.language === "tr" ? "en" : "tr")}
    >
      <p className="text-lg text-white">{i18n.language === "en" ? "TR" : "EN"}</p>
    </button>
  );
}

export default LanguageButton;
