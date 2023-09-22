import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SearchCard from "../layout/SearchPage/SearchCard";

import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Slider({ data, header, dataClassName }) {
  return (
    <motion.div
      className={`flex flex-col w-full md:w-[43rem] lg:w-[37.5rem] xl:w-[56rem] 2xl:w-[69.5rem] h-full mt-4 gap-2 overflow-hidden overflow-x-auto no-scrollbar ${dataClassName}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h1 className="mb-4 text-3xl text-fuchsia-200">{header}</h1>
      <div className={`${dataClassName}`}>
        <Swiper
          className={`${dataClassName}`}
          style={{
            height: "100%",
            "--swiper-navigation-color": "#A021B1",
          }}
          slidesPerView={1}
          rewind={true}
          keyboard={{
            enabled: true,
          }}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            320: {
              width: 320,
              spaceBetween: 120,
              slidesPerView: 2,
            },
            500: {
              width: 500,
              slidesPerView: 3,
            },
            640: {
              width: 640,
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              width: 768,
              spaceBetween: 100,
              slidesPerView: 4,
            },
            1024: {
              width: 1024,
              slidesPerView: 5,
            },
            1280: {
              width: 1280,
              slidesPerView: 6,
            },
            1536: {
              width: 1536,
              slidesPerView: 7,
            },
            1792: {
              width: 1792,
              slidesPerView: 8,
            },
          }}
        >
          {data?.map((movie) =>
            movie.release_date || (movie.first_air_date && movie.poster_path) ? (
              <SwiperSlide key={movie.id}>
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
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>
    </motion.div>
  );
}

export default Slider;
