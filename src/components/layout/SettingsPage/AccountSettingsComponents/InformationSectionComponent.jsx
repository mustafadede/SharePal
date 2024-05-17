import React from "react";
import SettingsSubTitle from "../../../common/SettingsPage/SettingsSubTitle";
import { useTranslation } from "react-i18next";

function InformationSectionComponent({ user, setNick, setEmail, setQuote, setTopOne }) {
  const { t } = useTranslation();

  return (
    <>
      <SettingsSubTitle title={t("account.information")} />
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={`${t("account.nickname")} (${user?.nick})`}
        onChange={(e) => {
          setNick(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={`${t("account.email")} (${user?.email})`}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={`${t("account.quote")} (${user?.quote})`}
        onChange={(e) => {
          setQuote(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={`${t("account.favorite")} (${user?.topOne})`}
        onChange={(e) => {
          setTopOne(e.target.value);
        }}
      />
    </>
  );
}

export default InformationSectionComponent;
