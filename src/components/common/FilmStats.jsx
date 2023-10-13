import React from "react";
import useSearchWithYear from "../../hooks/useSearchWithYear";
import { modalActions } from "../../store/modalSlice";
import { useDispatch } from "react-redux";

function FilmStats({ poster, title, releaseDate }) {
  const dispatch = useDispatch();
  const clickHandler = () => {
    useSearchWithYear(title, releaseDate).then((data) => {
      if (data) {
        dispatch(
          modalActions.openModal({
            name: "searchCardModal",
            data: {
              id: data.id,
              title: data.original_title || data.original_name,
              poster: data.poster_path,
              releaseDate: data.release_date || data.first_air_date,
              overview: data.overview,
              vote: data.vote_average,
              backdrop: data.backdrop_path,
              genres: data.genre_ids,
              mediaType: data.media_type,
              upcoming: data.upcoming,
            },
          })
        );
      }
    });
  };

  return (
    <div
      className="flex items-center w-full gap-4 transition-all duration-150 cursor-pointer rounded-xl hover:bg-slate-800/25"
      onClick={clickHandler}
    >
      <img className="object-cover w-24 h-full md:w-16 rounded-2xl" src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title} />
      <div className="flex flex-col items-start justify-center gap-1">
        <p className="text-sm font-semibold transition-all md:text-xl text-cWhite">{title || "Loading"}</p>
        <p className="transition-all text-md text-slate-400">({releaseDate?.slice(0, 4) || "Loading"})</p>
      </div>
    </div>
  );
}

export default FilmStats;
