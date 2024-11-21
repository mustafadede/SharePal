import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getUserBySearch } from "../../../firebase/firebaseActions";
import SearchUserCard from "../../layout/SearchPage/SearchUserCard";
import SearchCard from "../../layout/SearchPage/SearchCard";
import { toast } from "react-toastify";
import { Cross2Icon, ViewGridIcon, ViewHorizontalIcon } from "@radix-ui/react-icons";
import useSearchTV from "../../../hooks/useSearchTV";
import useSearchMovies from "../../../hooks/useSearchMovies";
import useSearchCast from "../../../hooks/useSearchCast";
import SearchButton from "./SearchButton";

function SearchModal() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState("");
  const [toggleFilter, setToggleFilter] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("movie");
  const [showIndicators, setShowIndicators] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.length === 0) {
      toast(t("search.toast"));
      return;
    }
    if (e.key === "Enter" && selectedFilter === "movie") {
      useSearchMovies(search, setMovies);
      setUsers([]);
    }

    if (e.key === "Enter" && selectedFilter === "tv") {
      useSearchTV(search, setMovies);
      setUsers([]);
    }

    if (e.key === "Enter" && selectedFilter === "people") {
      useSearchCast(search, setMovies);
      setUsers([]);
    }

    if (e.key === "Enter" && selectedFilter === "user") {
      setMovies("");
      getUserBySearch(search).then((res) => {
        setUsers(res);
      });
    }
  };

  const ToggleFilter = () => {
    setToggleFilter(!toggleFilter);
  };
  // TODO: Implement search for people

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Alt") {
        setShowIndicators(true);
      }
    };

    const handleKeyDownSelected = (e) => {
      console.log(typeof e.key);

      if (e.altKey && e.key === "1") {
        setSelectedFilter("movie");
      } else if (e.altKey && e.key === "2") {
        setSelectedFilter("tv");
      } else if (e.altKey && e.key === "3") {
        setSelectedFilter("user");
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "Alt") {
        setShowIndicators(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDownSelected);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", handleKeyDownSelected);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedFilter]);

  const clearSearch = () => setSearch("");
  return (
    <div className="p-[2px] w-80 md:w-[37rem] lg:w-[50rem] h-[35rem] md:h-[30rem] border border-slate-400/20 bg-slate-900 rounded-2xl overflow-hidden">
      <div className="w-full h-full p-3 outline-none rounded-xl">
        <div className="relative w-full">
          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeIn", delay: 0.4, duration: 0.2 }}
            className="w-full px-4 py-3 pr-10 text-2xl text-white transition-all outline-none bg-slate-800 rounded-xl"
            type="text"
            autoFocus
            placeholder={t("search.placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => handleSearch(e)}
          />
          {search && (
            <button onClick={clearSearch} className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Cross2Icon className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
        <motion.div className="relative flex w-full p-2 mt-2 h-fit bg-slate-950/40 rounded-xl">
          <div className="flex gap-2">
            <SearchButton
              mediaType="movie"
              text={t("search.movies")}
              indicatorName="Alt + 1"
              selectedFilter={selectedFilter}
              setUsers={setUsers}
              setMovies={setMovies}
              showIndicators={showIndicators}
            />
            <SearchButton
              mediaType="tv"
              text={t("search.series")}
              indicatorName="Alt + 2"
              selectedFilter={selectedFilter}
              setUsers={setUsers}
              setMovies={setMovies}
              showIndicators={showIndicators}
            />
            {/* <button
              className={
                selectedFilter === "people"
                  ? "flex px-2 py-1 bg-transparent rounded-md text-slate-200"
                  : "flex px-2 py-1 bg-transparent rounded-md text-slate-400"
              }
              onClick={() => handleFilter("people")}
            >
              People
            </button> */}
            <SearchButton
              mediaType="user"
              text={t("search.users")}
              indicatorName="Alt + 3"
              selectedFilter={selectedFilter}
              setUsers={setUsers}
              setMovies={setMovies}
              showIndicators={showIndicators}
            />
          </div>
          {selectedFilter !== "user" ? (
            <div className="absolute right-2">
              <button className="flex items-center justify-center w-8 h-8 rounded-md" onClick={ToggleFilter}>
                {toggleFilter ? (
                  <ViewHorizontalIcon className="w-6 h-6 text-slate-200" />
                ) : (
                  <ViewGridIcon className="w-6 h-6 text-slate-200" />
                )}
              </button>
            </div>
          ) : (
            !movies &&
            users.length > 0 && (
              <h1 className="flex items-center justify-end w-full mr-1 text-md text-slate-400">
                {t("search.totalUsers")} {users.length}
              </h1>
            )
          )}
        </motion.div>
        <div className="flex w-full h-full gap-2 pb-24 mt-1 rounded-xl">
          <div className="w-full h-full p-2 pb-2 overflow-y-auto rounded-xl no-scrollbar">
            <div className="flex flex-row flex-wrap justify-start w-full gap-2 lg:gap-4">
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
              {movies.length === 0 && users.length === 0 && (
                <p className="w-full text-base text-center md:text-lg xl:text-2xl text-slate-600">{t("search.searchSomething")}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2 mb-7">
              {!movies && users.map((user) => <SearchUserCard key={user.displayName} user={user} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
