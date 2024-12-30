import React from "react";
import FilmStats from "../../../common/FilmStats";
import { useTranslation } from "react-i18next";

function FavSeriesLastYear({ user }) {
  const { i18n, t } = useTranslation();
  const yearIndicator = new Date().getFullYear() - 1;
  return (
    <div className="flex flex-col w-full gap-4 p-4 h-fit rounded-xl bg-slate-900">
      <div className="flex items-center justify-between w-full gap-4">
        {i18n.language === "en" ? (
          <p className="w-full text-xl font-bold md:text-3xl text-slate-200">IMHO, Best Series!</p>
        ) : (
          <p className="w-full text-xl font-bold text-slate-200">Bana göre en iyi dizi!</p>
        )}
      </div>
      {user?.bestSeriesYear && Number(user?.bestSeriesYear?.releaseDate?.slice(0, 4)) === yearIndicator ? (
        <FilmStats poster={user.bestSeriesYear?.poster} title={user.bestSeriesYear?.title} releaseDate={user.bestSeriesYear?.releaseDate} />
      ) : (
        <p className="pb-1 transition-all text-md md:text-xl text-slate-400">{t("stats.favSeriesNaN")}</p>
      )}
    </div>
  );
}

export default FavSeriesLastYear;
