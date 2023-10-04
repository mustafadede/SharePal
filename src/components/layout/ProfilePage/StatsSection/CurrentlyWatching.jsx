import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";

function CurrentlyWatching({ username, user, navigate }) {
  const clickHandler = () => {
    navigate("/search");
  };
  return (
    <div className="flex flex-col w-full gap-4 p-4 lg:w-1/2 h-fit rounded-xl bg-slate-900">
      <div className="flex items-center justify-between w-full gap-4">
        <p className="w-full text-3xl font-bold md:w-72 text-slate-200">Currently Watching</p>
        {!username && (
          <button
            className="flex items-center justify-center w-8 h-full translate text-slate-400 hover:text-fuchsia-700"
            onClick={clickHandler}
          >
            <PlusIcon className="w-6 h-full" />
          </button>
        )}
      </div>
      {user?.currentlyWatching ? (
        <div className="flex items-center gap-4 w-fit">
          <img
            className="object-cover w-24 h-full md:w-16 rounded-2xl"
            src={`https://image.tmdb.org/t/p/w500/${user.currentlyWatching?.poster}`}
            alt={user.currentlyWatching?.title}
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <p className="text-sm font-semibold transition-all md:text-xl text-cWhite">{user.currentlyWatching?.title || "Loading"}</p>
            <p className="transition-all text-md text-slate-400">({user.currentlyWatching?.releaseDate?.slice(0, 4) || "Loading"})</p>
          </div>
        </div>
      ) : (
        <p className="transition-all text-md md:text-xl text-slate-400">Not watching anything</p>
      )}
    </div>
  );
}

export default CurrentlyWatching;
