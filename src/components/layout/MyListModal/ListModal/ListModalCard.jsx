import React from "react";

function ListModalCard({ title, poster, releaseDate, backdrop }) {
  return (
    <div className="relative flex items-center w-full h-24 gap-4 my-2 cursor-pointer group rounded-2xl">
      {backdrop ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${backdrop}`}
          alt={title}
          className="absolute inset-0 object-cover w-full h-full transition-opacity duration-700 opacity-0 rounded-2xl group-hover:opacity-40"
        />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster}`}
          alt={title}
          className="absolute inset-0 object-cover w-full h-full transition-opacity duration-700 opacity-0 rounded-2xl group-hover:opacity-40"
        />
      )}
      <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title} className="z-10 w-16 h-full rounded-xl" />
      <div className="flex justify-between w-full gap-1 pr-4">
        <p className="z-10 text-lg text-slate-200">{title}</p>
        <p className="z-10 text-lg text-slate-400">({releaseDate?.slice(0, 4)})</p>
      </div>
    </div>
  );
}

export default ListModalCard;
