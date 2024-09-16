import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SearchCard from "../../layout/SearchPage/SearchCard";
import { ViewGridIcon, ViewHorizontalIcon } from "@radix-ui/react-icons";
import useSearchMovies from "../../../hooks/useSearchMovies";

function SearchModalAsset() {
  const transitionDelay = window.innerWidth >= 768 ? 0.8 : 3.5;
  const movieArray = [
    "Avengers",
    "Lord of the rings",
    "Now you see me",
    "Fast and Forious",
    "Harry Potter",
    "The Hobbit",
    "The Matrix",
    "The Dark Knight",
    "The Godfather",
  ];
  const { t } = useTranslation();
  const [movies, setMovies] = useState("");
  const [toggleFilter, setToggleFilter] = useState(false);

  useEffect(() => {
    useSearchMovies(movieArray[2], setMovies);
  }, []);

  const ToggleFilter = () => {
    setToggleFilter(!toggleFilter);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: transitionDelay }}
      className="p-1 w-full h-[35rem] md:h-[30rem] bg-slate-900 rounded-2xl overflow-hidden"
    >
      <div className="w-full h-full p-3 outline-none rounded-xl">
        <div className="relative w-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeIn", delay: 0.4, duration: 0.2 }}
            className="w-full px-4 py-3 pr-10 text-2xl transition-all outline-none cursor-default select-none text-slate-400 bg-slate-800 rounded-xl"
          >
            {t("search.placeholder")}
          </motion.p>
        </div>
        <motion.div className="relative flex w-full p-2 mt-2 h-fit bg-slate-950/40 rounded-xl">
          <div className="flex gap-2">
            <p className={"flex cursor-default select-none px-2 py-1 bg-transparent rounded-md text-slate-200"}>Movie</p>
            <p className={"flex cursor-default select-none px-2 py-1 bg-transparent rounded-md text-slate-400"}>TV</p>
            <p className={"flex cursor-default select-none px-2 py-1 bg-transparent rounded-md text-slate-400"}>User</p>
          </div>
          <div className="absolute right-2">
            <button className="flex items-center justify-center w-8 h-8 rounded-md" onClick={ToggleFilter}>
              {toggleFilter ? (
                <ViewHorizontalIcon className="w-6 h-6 text-slate-200" />
              ) : (
                <ViewGridIcon className="w-6 h-6 text-slate-200" />
              )}
            </button>
          </div>
        </motion.div>
        <div className="w-full h-full pt-2 pb-2 overflow-hidden rounded-xl no-scrollbar">
          <div className="flex flex-row flex-wrap justify-around w-full lg:justify-start lg:gap-2">
            {movies.length > 0 &&
              movies.map((movie) =>
                movie.poster_path ? (
                  <SearchCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title || movie.name}
                    poster={movie.poster_path || movie.profile_path || null}
                    releaseDate={movie.release_date || movie.first_air_date || null}
                    overview={movie.overview}
                    vote={movie.vote_average || 0}
                    backdrop={movie.backdrop_path || movie.poster_path || movie.profile_path || null}
                    genres={movie.genre_ids}
                    mediaType={movie.media_type || movie.first_air_date ? "tv" : "movie"}
                    page={toggleFilter ? "explore" : "search"}
                  />
                ) : null
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SearchModalAsset;
