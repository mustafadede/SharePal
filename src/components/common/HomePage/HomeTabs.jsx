import React from "react";
import { useTranslation } from "react-i18next";

function HomeTabs({ tabInfo, tab }) {
  const { t } = useTranslation();
  return (
    <div className="flex h-14">
      <button
        className={`flex items-center justify-center w-1/2 h-full transition-all text-slate-300 rounded-tl-xl hover:text-fuchsia-600 ${
          tabInfo === 0 ? "bg-slate-600/20 border-b-2 border-slate-300/70" : null
        }`}
        onClick={() => tab(0)}
      >
        <span className={`text-lg font-semibold ${tabInfo === 0 ? "text-fuchsia-400" : null}`}>{t("home.firstTab")}</span>
      </button>
      <button
        className={`flex items-center justify-center w-1/2 h-full transition-all text-slate-300 hover:text-fuchsia-600 ${
          tabInfo === 1 ? "bg-slate-600/20 border-b-2 border-slate-300/70" : null
        }`}
        onClick={() => tab(1)}
      >
        <span className={`text-lg font-semibold ${tabInfo === 1 ? "text-fuchsia-400" : null}`}>{t("home.secondTab")}</span>
      </button>
      <button
        className={`flex items-center justify-center w-1/2 h-full transition-all rounded-tr-xl text-slate-300 hover:text-fuchsia-600 ${
          tabInfo === 2 ? "bg-slate-600/20 border-b-2 border-slate-300/70" : null
        }`}
        onClick={() => tab(2)}
      >
        <span className={`text-lg font-semibold ${tabInfo === 2 ? "text-fuchsia-400" : null}`}>{t("home.thirdTab")}</span>
      </button>
    </div>
  );
}

export default HomeTabs;
