import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PopularPill() {
  const { t } = useTranslation();
  const { popularName } = useSelector((state) => state.popular);

  return (
    <div className="flex items-center gap-2">
      <Link to="/settings">
        <p className="px-2 py-1 text-sm transition-colors duration-150 hover:bg-fuchsia-600/40 rounded-xl bg-fuchsia-600 text-slate-300">
          {popularName === "movies" ? t("preferences.popularFirst") : t("preferences.popularSecond")}
        </p>
      </Link>
    </div>
  );
}

export default PopularPill;
