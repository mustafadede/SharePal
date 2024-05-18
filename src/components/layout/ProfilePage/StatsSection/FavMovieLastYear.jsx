import React from "react";
import FilmStats from "../../../common/FilmStats";
import { useTranslation } from "react-i18next";

function FavMovieLastYear({ user }) {
  const { i18n, t } = useTranslation();
  return (
    <div className="flex flex-col w-full gap-4 p-4 h-fit rounded-xl bg-slate-900">
      <div className="flex items-center justify-between w-full gap-4">
        {i18n.language === "en" ? (
          <p className="w-full text-xl font-bold md:text-3xl text-slate-200">IMHO, Best Film!</p>
        ) : (
          <p className="w-full text-xl font-bold text-slate-200">Bana göre en iyi film!</p>
        )}
      </div>
      {user?.bestMovieYear ? (
        <FilmStats poster={user.bestMovieYear?.poster} title={user.bestMovieYear?.title} releaseDate={user.bestMovieYear?.releaseDate} />
      ) : (
        <p className="pb-1 transition-all text-md md:text-xl text-slate-400">{t("stats.favMovieNaN")}</p>
      )}
    </div>
  );
}

export default FavMovieLastYear;
