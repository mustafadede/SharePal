import React from "react";
import FilmStats from "../../../common/FilmStats";

function FavMovieLastYear({ user }) {
  const yearIndicator = user?.bestSeriesYear?.releaseDate?.slice(0, 4);
  return (
    <div className="flex flex-col w-full gap-4 p-4 h-fit rounded-xl bg-slate-900">
      <div className="flex items-center justify-between w-full gap-4">
        <p className="w-full text-xl font-bold md:text-3xl text-slate-200">IMHO, {yearIndicator} Best Film!</p>
      </div>
      {user?.bestMovieYear ? (
        <FilmStats poster={user.bestMovieYear?.poster} title={user.bestMovieYear?.title} releaseDate={user.bestMovieYear?.releaseDate} />
      ) : (
        <p className="pb-1 transition-all text-md md:text-xl text-slate-400">There is no best movie this year.</p>
      )}
    </div>
  );
}

export default FavMovieLastYear;
