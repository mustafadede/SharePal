import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

function ShowMore() {
  const { t } = useTranslation();
  return (
    <p className="pt-4 text-lg transition-colors text-fuchsia-400 hover:text-slate-300">
      <NavLink to={"/explore"}>{t("popular.button")}</NavLink>
    </p>
  );
}

export default ShowMore;
