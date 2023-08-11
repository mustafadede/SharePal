import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { motion } from "framer-motion";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import SearchCard from "../../components/layout/SearchPage/SearchCard";
import useSearch from "../../hooks/useSearch";
import Suggestion from "../../components/common/Suggestion";
function SearchPage() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState("");
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      useSearch(search, setMovies);
    }
  };
  const handleSuggestion = (suggestion) => {
    setSearch(suggestion);
    useSearch(suggestion, setMovies);
  };
  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex mx-10">
        <div className="flex flex-col w-full pr-6">
          {/* Search title and input start */}
          <motion.div className="sticky flex w-full pb-4 " initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-full">
              <h1 className="mb-4 text-3xl text-slate-200">Search</h1>
              <input
                className="w-full py-2 text-2xl text-white transition-all bg-transparent border-b-2 outline-none focus-within:border-slate-900"
                type="text"
                placeholder="Search for a user or movie/series"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => handleSearch(e)}
              />
              <Suggestion
                title="Search"
                suggestion1="Bates Motel"
                suggestion2="The Boys"
                suggestion3="The Imitation Game"
                handleSuggestion={handleSuggestion}
              />
            </div>
            {/* Search title and input end */}
          </motion.div>
          {/* Search results start */}
          <div className="flex flex-row flex-wrap w-full gap-7">
            {movies.length > 0 &&
              movies.map((movie) =>
                movie.release_date || movie.first_air_date ? (
                  <SearchCard
                    key={movie.id}
                    title={movie.title || movie.name}
                    poster={movie.poster_path || movie.profile_path || null}
                    releaseDate={movie.release_date || movie.first_air_date || null}
                    overview={movie.overview}
                  />
                ) : null
              )}
            {movies.length === 0 && <p className="text-2xl text-slate-600">No results found</p>}
          </div>
          {/* Search results end */}
        </div>
        {/* Most popular movies and series start */}
        <motion.div
          className="hidden w-fit h-fit lg:flex sticky top-[4.7rem]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PopularCard />
        </motion.div>
        {/* Most popular movies and series end */}
      </div>
    </>
  );
}

export default SearchPage;
