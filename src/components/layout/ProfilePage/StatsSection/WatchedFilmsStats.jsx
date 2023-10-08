import React, { useEffect, useState } from "react";
import { getSelectedUserWatched } from "../../../../firebase/firebaseActions";

function WatchedFilmsStats({ username, user }) {
  return (
    <div className="flex flex-col w-full gap-4 p-4 h-fit rounded-xl bg-slate-900">
      <div className="flex items-center justify-between w-full gap-4">
        <p className="text-xl font-bold md:text-3xl text-slate-200">Total Films</p>
      </div>
      <div className="flex items-center gap-4 text-2xl md:text-4xl w-fit text-slate-400">{user?.totalFilms || 0}</div>
    </div>
  );
}

export default WatchedFilmsStats;
