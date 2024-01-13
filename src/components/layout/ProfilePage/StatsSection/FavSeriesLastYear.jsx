import React from "react";
import FilmStats from "../../../common/FilmStats";

function FavSeriesLastYear({ user }) {
  return (
    <div className="flex flex-col w-full gap-4 p-4 h-fit rounded-xl bg-slate-900">
      <div className="flex items-center justify-between w-full gap-4">
        <p className="w-full text-xl font-bold md:text-3xl text-slate-200">IMHO, Best Series!</p>
      </div>
      {user?.bestSeriesYear ? (
        <FilmStats poster={user.bestSeriesYear?.poster} title={user.bestSeriesYear?.title} releaseDate={user.bestSeriesYear?.releaseDate} />
      ) : (
        <p className="pb-1 transition-all text-md md:text-xl text-slate-400">There is no best series this year.</p>
      )}
    </div>
  );
}

export default FavSeriesLastYear;
