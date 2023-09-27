import React from "react";
import { motion } from "framer-motion";
import { movieGenresJSON, tvGenresJSON } from "../../../../assets/genreData";
function SeachCardModalTop({ poster, backdrop, title, releaseDate, genres, mediaType, upcoming }) {
  return (
    <div className="relative flex flex-row-reverse w-full h-[21rem]">
      {/* Image */}
      <motion.div
        className="absolute z-10 h-full top-12 w-52 right-20 drop-shadow-2xl"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: -5, opacity: 1 }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster}`}
          className="w-full transition-all duration-300 border cursor-pointer drop-shadow-xl rounded-xl border-slate-400 hover:border-fuchsia-600"
          alt={poster}
        />
      </motion.div>
      {/*Backdrop Image */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden brightness-75 blur-md rounded-tr-2xl">
        <img src={`https://image.tmdb.org/t/p/w500/${backdrop}`} className="w-full h-full scale-y-150" alt={poster} />
      </div>
      {/* Title & Release Date */}
      <div className="absolute top-0 left-0 flex flex-col justify-center w-2/3 h-full p-6">
        <h1 className="mt-4 mb-3 text-4xl text-fuchsia-600">{title}</h1>
        <h2 className="mb-2 text-2xl text-fuchsia-700">{upcoming ? releaseDate : releaseDate.slice(0, 4)}</h2>
        <h3 className="px-3 text-xl border rounded-md w-fit border-fuchsia-700 text-fuchsia-800">
          {mediaType === "movie" ? mediaType[0].toUpperCase() + mediaType.slice(1) : mediaType?.toUpperCase()}
        </h3>
        <div className="relative flex flex-wrap gap-2 top-4">
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
