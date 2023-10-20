import React from "react";
import { motion } from "framer-motion";
import { movieGenresJSON, tvGenresJSON } from "../../../../assets/genreData";
function SeachCardModalTop({ poster, backdrop, title, releaseDate, genres, mediaType, upcoming }) {
  return (
    <div className="relative flex flex-row-reverse w-full h-full md:h-[21rem]">
      {/* Image */}
      <motion.div
        className="absolute z-10 w-48 h-full left-1/4 md:left-auto top-20 md:top-12 md:w-52 md:right-20 drop-shadow-2xl"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: -5, opacity: 1 }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster}`}
          className="w-full transition-all duration-300 border cursor-pointer drop-shadow-xl rounded-xl border-slate-400 hover:border-fuchsia-600"
          alt={poster}
          loading="lazy"
        />
      </motion.div>
      {/*Backdrop Image */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden brightness-75 blur-md rounded-tr-2xl">
        <img
          src={`https://image.tmdb.org/t/p/w500/${backdrop}`}
          loading="lazy"
          className="object-cover w-full h-full scale-y-150"
          alt={poster}
        />
      </div>
      {/* Title & Release Date */}
      <div className="absolute flex flex-col items-center justify-center w-2/3 h-full p-6 text-center top-40 left-16 md:text-left md:top-0 md:left-0 md:items-start">
        <h1 className="mt-4 mb-3 text-2xl lg:text-4xl text-fuchsia-600">{title}</h1>
        <h2 className="mb-2 text-2xl text-fuchsia-700">{upcoming ? releaseDate : releaseDate?.slice(0, 4)}</h2>
        <h3 className="px-3 text-xl border rounded-md w-fit border-fuchsia-700 text-fuchsia-800">
          {mediaType === "movie" ? mediaType[0].toUpperCase() + mediaType.slice(1) : mediaType?.toUpperCase()}
        </h3>
        <div className="relative flex items-center gap-2 flex-nowrap md:flex-wrap top-4">
          {mediaType === "movie" &&
            genres
              .filter((genre) => movieGenresJSON.some((movieGenre) => movieGenre.id === genre))
              .map((filteredGenre) => (
                <p key={filteredGenre} className="px-3 py-2 text-sm border rounded-lg 2xl:text-md border-fuchsia-800 text-fuchsia-800">
                  {movieGenresJSON.find((movieGenre) => movieGenre.id === filteredGenre).name}
                </p>
              ))}
          {mediaType === "tv" &&
            genres
              .filter((genre) => tvGenresJSON.some((tvGenre) => tvGenre.id === genre))
              .map((filteredGenre) => (
                <p key={filteredGenre} className="px-3 py-2 text-sm border rounded-lg 2xl:text-md border-fuchsia-800 text-fuchsia-800">
                  {tvGenresJSON.find((tvGenre) => tvGenre.id === filteredGenre).name}
                </p>
              ))}
        </div>
      </div>
    </div>
  );
}

export default SeachCardModalTop;
