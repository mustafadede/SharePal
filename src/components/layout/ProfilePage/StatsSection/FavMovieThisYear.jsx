import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import FilmStats from "../../../common/FilmStats";
import { useTranslation } from "react-i18next";

function FavMovieThisYear({ username, user, navigate }) {
  const { i18n, t } = useTranslation();
  const yearIndicator = new Date().getFullYear();
  const clickHandler = () => {
    navigate("/search");
  };
  return (
    <div className="flex flex-col w-full gap-4 p-4 h-fit rounded-xl bg-slate-900">
      <div className="flex items-center justify-between w-full gap-4">
        {i18n.language === "en" ? (
          <p className="w-full text-xl font-bold md:text-3xl text-slate-200">IMHO, {yearIndicator} Best Film!</p>
        ) : (
          <p className="w-full text-xl font-bold text-slate-200">Bana göre {yearIndicator} yılının en iyi filmi!</p>
        )}
        {!username && (
          <button
            className="flex items-center justify-center w-8 h-full translate text-slate-400 hover:text-fuchsia-700"
            onClick={clickHandler}
          >
            <PlusIcon className="w-6 h-full" />
          </button>
        )}
      </div>
      {user?.bestMovieYear && user?.bestMovieYear.releaseDate.slice(0, 4) === yearIndicator ? (
        <FilmStats poster={user.bestMovieYear?.poster} title={user.bestMovieYear?.title} releaseDate={user.bestMovieYear?.releaseDate} />
      ) : (
        <p className="pb-1 transition-all text-md md:text-xl text-slate-400">{t("stats.favMovieNaN")}</p>
      )}
    </div>
  );
}

export default FavMovieThisYear;
