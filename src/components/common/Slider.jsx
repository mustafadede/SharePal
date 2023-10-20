import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SearchCard from "../layout/SearchPage/SearchCard";
import "swiper/css";

function Slider({ data, header, dataClassName, sliderType }) {
  return (
    <div className="w-full">
      <h1 className="mb-4 text-3xl text-fuchsia-200">{header}</h1>
      <div className={`${dataClassName} w-full cursor-grab`}>
        <Swiper
          className={`${dataClassName} w-full`}
          style={{
            height: "100%",
            "--swiper-navigation-color": "#A021B1",
          }}
          slidesPerView={3}
          spaceBetween={30}
          breakpoints={{
            320: {
              width: 320,
              spaceBetween: 80,
              slidesPerView: 2,
            },
            500: {
              width: 500,
              slidesPerView: 3,
              spaceBetween: 60,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              width: 1024,
              slidesPerView: 5,
              spaceBetween: 30,
            },
            1280: {
              width: 1180,
              slidesPerView: 6,
            },
            1536: {
              width: 1536,
              slidesPerView: 6,
              spaceBetween: 30,
            },
            1792: {
              width: 1792,
              slidesPerView: 7,
              spaceBetween: 60,
            },
          }}
        >
          {data?.map((movie) =>
            movie.first_air_date || movie.poster_path ? (
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
                  mediaType={sliderType || movie.media_type}
                  id={movie.id}
                />
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
