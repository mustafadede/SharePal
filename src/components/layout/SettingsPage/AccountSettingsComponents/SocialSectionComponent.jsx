import React from "react";
import SettingsSubTitle from "../../../common/SettingsPage/SettingsSubTitle";
import { useTranslation } from "react-i18next";

function SocialSectionComponent({ instagram, setInstagram, github, setGithub, linkedin, setLinkedin }) {
  const { t } = useTranslation();
  return (
    <>
      <SettingsSubTitle title={t("account.socialTitle")} />
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={instagram ? instagram : t("account.socialInstagram")}
        onChange={(e) => {
          setInstagram(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={github ? github : t("account.socialGithub")}
        onChange={(e) => {
          setGithub(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={linkedin ? linkedin : t("account.socialLinkedin")}
        onChange={(e) => {
          setLinkedin(e.target.value);
        }}
      />
    </>
  );
}

export default SocialSectionComponent;
