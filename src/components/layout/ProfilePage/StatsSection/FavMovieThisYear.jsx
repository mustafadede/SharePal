import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

function FavMovieThisYear({ username, user, navigate }) {
  const yearIndicator = new Date().getFullYear();
  const clickHandler = () => {
    navigate("/search");
  };
  return (
    <div className="flex flex-col w-full gap-4 p-4 h-fit rounded-xl bg-slate-900">
      <div className="flex items-center justify-between w-full gap-4">
        <p className="w-full text-3xl font-bold text-slate-200">IMHO, {yearIndicator} Best Film!</p>
        {!username && (
          <button
            className="flex items-center justify-center w-8 h-full translate text-slate-400 hover:text-fuchsia-700"
            onClick={clickHandler}
          >
            <PlusIcon className="w-6 h-full" />
          </button>
        )}
      </div>
      {user?.bestMovieYear ? (
        <div className="flex items-center gap-4 w-fit">
          <img
            className="object-cover w-24 h-full md:w-16 rounded-2xl"
            src={`https://image.tmdb.org/t/p/w500/${user.bestMovieYear?.poster}`}
            alt={user.bestMovieYear?.title}
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <p className="text-sm font-semibold transition-all md:text-xl text-cWhite">{user.bestMovieYear?.title || "Loading"}</p>
            <p className="transition-all text-md text-slate-400">({user.bestMovieYear?.releaseDate?.slice(0, 4) || "Loading"})</p>
          </div>
        </div>
      ) : (
        <p className="transition-all text-md md:text-xl text-slate-400">There is no best movie this year.</p>
      )}
    </div>
  );
}

export default FavMovieThisYear;
