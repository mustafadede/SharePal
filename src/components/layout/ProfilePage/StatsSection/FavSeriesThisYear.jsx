import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import FilmStats from "../../../common/FilmStats";

function FavSeriesThisYear({ username, user, navigate }) {
  const yearIndicator = new Date().getFullYear();
  const clickHandler = () => {
    navigate("/search");
  };

  return (
    <div className="flex flex-col w-full gap-4 p-4 h-fit rounded-xl bg-slate-900">
      <div className="flex items-center justify-between w-full gap-4">
        <p className="w-full text-xl font-bold md:text-3xl text-slate-200">IMHO, {yearIndicator} Best Series!</p>
        {!username && (
          <button
            className="flex items-center justify-center w-8 h-full translate text-slate-400 hover:text-fuchsia-700"
            onClick={clickHandler}
          >
            <PlusIcon className="w-6 h-full" />
          </button>
        )}
      </div>
      {user?.bestSeriesYear ? (
        <FilmStats poster={user.bestSeriesYear?.poster} title={user.bestSeriesYear?.title} releaseDate={user.bestSeriesYear?.releaseDate} />
      ) : (
        <p className="transition-all text-md md:text-xl text-slate-400">There is no best series this year.</p>
      )}
    </div>
  );
}

export default FavSeriesThisYear;
