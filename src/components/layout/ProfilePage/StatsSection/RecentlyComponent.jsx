import React from "react";

function RecentlyComponent({ user }) {
  return (
    <div className="flex items-center w-64 gap-4">
      <p className="text-3xl font-bold transition-all text-cWhite">01</p>
      <img
        className="object-cover w-16 h-full rounded-2xl"
        src={`https://image.tmdb.org/t/p/w500/${user?.currentlyWatching?.poster}`}
        alt={user?.currentlyWatching?.title}
        loading="lazy"
      />
      <div className="flex flex-col items-start justify-center gap-1">
        <p className="text-xl font-semibold transition-all text-cWhite">{user?.currentlyWatching?.title || "Loading"}</p>
        <p className="transition-all text-md text-slate-400">({user?.currentlyWatching?.releaseDate?.slice(0, 4) || "Loading"})</p>
      </div>
    </div>
  );
}

export default RecentlyComponent;
