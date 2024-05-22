import React from "react";
import { useTranslation } from "react-i18next";

function MyListModalHeader({ tabInfo, tab }) {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <button
        className={`flex items-center justify-center w-1/2 h-12 transition-all rounded-tl-xl rounded-bl-xl text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/20 ${
          tabInfo === 0 ? "bg-slate-600/20" : null
        }`}
        onClick={() => tab(0)}
      >
        <span className={`text-lg font-semibold ${tabInfo === 0 ? "text-fuchsia-400" : null}`}>{t("myLists.myListsTitle")}</span>
      </button>
      <button
        className={`flex items-center justify-center w-1/2 h-12 transition-all rounded-tr-xl rounded-br-xl text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/40 ${
          tabInfo === 1 ? "bg-slate-600/20" : null
        }`}
        onClick={() => tab(1)}
      >
        <span className={`text-lg font-semibold ${tabInfo === 1 ? "text-fuchsia-400" : null}`}>{t("myLists.friendsLists")}</span>
      </button>
    </div>
  );
}

export default MyListModalHeader;
