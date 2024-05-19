import React, { useState } from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import useSearch from "../../../hooks/useSearch";
import Suggestion from "../../common/Suggestion";
import AttachedCard from "./AttachedCard";
import { useTranslation } from "react-i18next";

function AttachedFilmModal() {
  const { t } = useTranslation();
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
    <div className="p-4 w-80 md:w-[35rem] h-[35rem] md:h-[27rem] bg-slate-900 rounded-2xl overflow-hidden">
      <ModalHeader title={t("attach.title")} />
      <input
        className="w-full h-10 mt-4 text-lg bg-transparent border-b-2 outline-none text-cWhite border-b-slate-400"
        type="text"
        placeholder={t("search.searchPlaceholder")}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
      ></input>
      <Suggestion
        title={t("search.suggestionText")}
        suggestion1="Heartstopper"
        suggestion2="The Boys"
        suggestion3="The Long Pond Studio"
        handleSuggestion={handleSuggestion}
      />
      <div className="flex flex-row flex-wrap w-full h-full overflow-y-scroll no-scrollbar">
        {movies.length > 0 &&
          movies.map((movie) =>
            movie.release_date || movie.first_air_date ? (
              <AttachedCard
                key={movie.id}
                title={movie.title || movie.name}
                id={movie.id}
                mediaType={movie.media_type || "movie"}
                poster={movie.poster_path || movie.profile_path || null}
                releaseDate={movie.release_date || movie.first_air_date || null}
                backdrop={movie.backdrop_path || movie.poster_path || movie.profile_path || null}
              />
            ) : null
          )}
        {movies.length === 0 && <p className="text-2xl text-slate-600">{t("attach.notFound")}</p>}
      </div>
    </div>
  );
}

export default AttachedFilmModal;
