import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import { motion } from "framer-motion";
import SearchCard from "../../components/layout/SearchPage/SearchCard";
import useUpcoming from "../../hooks/useUpcoming";
import useTop10 from "../../hooks/useTop10";

function ExplorePage() {
  const [upcoming, setUpcoming] = useState([]);
  const [top10Movies, setTop10Movies] = useState([]);
  const [top10Series, setTop10Series] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    useUpcoming(setUpcoming);
    useTop10("series", setTop10Series);
    useTop10("movies", setTop10Movies);
  }, []);

  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex gap-6 mx-5 md:mx-10">
        <motion.div
          className="flex flex-col w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="mb-4 text-3xl text-fuchsia-200">Upcoming</h1>
          <motion.div
            className="flex w-full md:w-[43rem] lg:w-[37.5rem] xl:w-[56rem] 2xl:w-[69.5rem] h-72 gap-4 overflow-hidden overflow-x-auto no-scrollbar rounded-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col flex-wrap w-full h-full gap-10">
              {upcoming.results?.map((movie) =>
                movie.poster_path ? (
                  <SearchCard
                    key={movie.id}
                    title={movie.title || movie.name}
                    poster={movie.poster_path || movie.profile_path || null}
                    releaseDate={movie.release_date || movie.first_air_date || null}
                    overview={movie.overview}
                    vote={movie.vote_average || 0}
                    backdrop={movie.backdrop_path || movie.poster_path || movie.profile_path || null}
                    genres={movie.genre_ids}
                    mediaType="movie"
                    upcoming={true}
                  />
                ) : null
              )}
            </div>
          </motion.div>
          <h2 className="my-4 text-2xl text-slate-200">Top 10 Movies</h2>
          <motion.div
            className="flex w-full md:w-[43rem] lg:w-[37.5rem] xl:w-[56rem] 2xl:w-[69.5rem] h-72 gap-4 overflow-hidden overflow-x-auto no-scrollbar rounded-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col flex-wrap w-full h-full gap-10">
              {top10Movies?.map((movie) =>
                movie.release_date || (movie.first_air_date && movie.poster_path) ? (
                  <SearchCard
                    key={movie.id}
                    title={movie.title || movie.name}
                    poster={movie.poster_path || movie.profile_path || null}
                    releaseDate={movie.release_date || movie.first_air_date || null}
                    overview={movie.overview}
                    vote={movie.vote_average || 0}
                    backdrop={movie.backdrop_path || movie.poster_path || movie.profile_path || null}
                    genres={movie.genre_ids}
                    mediaType="movie"
                  />
                ) : null
              )}
            </div>
          </motion.div>
          <h2 className="my-4 text-2xl text-slate-200">Top 10 Series</h2>
          <motion.div
            className="flex w-full md:w-[43rem] lg:w-[37.5rem] xl:w-[56rem] 2xl:w-[69.5rem] h-72 gap-4 overflow-hidden overflow-x-auto no-scrollbar rounded-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col flex-wrap w-full h-full gap-10">
              {top10Series?.map((movie) =>
                movie.release_date || (movie.first_air_date && movie.poster_path) ? (
                  <SearchCard
                    key={movie.id}
                    title={movie.title || movie.name}
                    poster={movie.poster_path || movie.profile_path || null}
                    releaseDate={movie.release_date || movie.first_air_date || null}
                    overview={movie.overview}
                    vote={movie.vote_average || 0}
                    backdrop={movie.backdrop_path || movie.poster_path || movie.profile_path || null}
                    genres={movie.genre_ids}
                    mediaType="tv"
                  />
                ) : null
              )}
            </div>
          </motion.div>
          <h2 className="my-4 text-2xl text-slate-200">Users Lists</h2>
        </motion.div>
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

export default ExplorePage;
