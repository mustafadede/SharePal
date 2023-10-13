import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import FilmStats from "../../../common/FilmStats";

function CurrentlyWatching({ username, user, navigate }) {
  const clickHandler = () => {
    navigate("/search");
  };

  return (
    <div className="flex flex-col w-full gap-4 p-4 h-fit rounded-xl bg-slate-900">
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
        <FilmStats
          poster={user.currentlyWatching?.poster}
          title={user.currentlyWatching?.title}
          releaseDate={user.currentlyWatching?.releaseDate}
        />
      ) : (
        <p className="transition-all text-md md:text-xl text-slate-400">Not watching anything</p>
      )}
    </div>
  );
}

export default CurrentlyWatching;
