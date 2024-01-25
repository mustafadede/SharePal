import React from "react";

function AttachedItem({ data, attachedData, onClickHandler }) {
  return (
    <button
      className="flex items-center justify-between w-full gap-4 p-2 transition-all duration-700 border rounded-2xl border-slate-700 group hover:bg-cGradient2 hover:border-slate-600"
      onClick={onClickHandler}
    >
      <div className="flex items-center gap-4">
        <img
          src={`https://image.tmdb.org/t/p/w500/${attachedData?.poster || data.attachedFilm.poster}`}
          className="object-cover transition-all duration-700 rounded-full w-14 h-14 grayscale group-hover:grayscale-0"
          loading="lazy"
        ></img>
        <div className="flex items-center justify-center gap-1">
          <p className="transition-all duration-700 text-slate-400 group-hover:text-slate-200">
            {attachedData?.title || data.attachedFilm.title}
          </p>
          <p className="transition-all duration-700 text-slate-400 group-hover:text-slate-200">
            ({attachedData?.releaseDate.slice(0, 4) || data.attachedFilm.releaseDate.slice(0, 4)})
          </p>
        </div>
      </div>
      {/* <button onClick={onClickHandler}>
          {!bookmarked ? (
            <BookmarkIcon className="w-6 h-6 transition-all duration-700 text-slate-400 group-hover:text-slate-200" />
          ) : (
            <BookmarkFilledIcon className="w-6 h-6 transition-all duration-700 text-fuchsia-600" />
          )}
        </button> */}
    </button>
  );
}

export default AttachedItem;
