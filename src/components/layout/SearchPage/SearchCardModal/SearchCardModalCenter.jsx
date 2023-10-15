import React from "react";
import SearchCardButton from "../SearchCardButton";
import { BookmarkFilledIcon, BookmarkIcon, EyeOpenIcon, Link2Icon, PauseIcon, PlusIcon, StarFilledIcon } from "@radix-ui/react-icons";
import WantToWatchComponent from "../../../common/WantToWatchComponent";
import WatchedComponent from "../../../common/WatchedComponent";
import Trailer from "../../../common/Trailer";
import UnfinishedComponent from "../../../common/UnfinishedComponent";

function SearchCardModalCenter({
  mediaType,
  releaseDate,
  vote,
  overview,
  trailerID,
  providers,
  watchlistHandler,
  currentlyWatchingHandler,
  bestMovieHandler,
  bestSeriesHandler,
  wantToWatchHandler,
  watchedHandler,
  unfinishedHandler,
  wantToWatch,
  watched,
  unfinished,
  clickAction1,
  clickAction2,
  clickAction3,
}) {
  const yearIndicator = new Date().getFullYear();

  return (
    <div>
      <div className="relative flex justify-center gap-2 px-6 py-4 text-center md:justify-start md:text-left top-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className=" w-full md:min-w-[28rem] md:max-w-[30rem]">
            <h2 className="mb-2 text-3xl text-slate-200">Actions</h2>
            <div className="flex flex-wrap justify-center gap-2 md:mb-0 md:justify-start">
              <SearchCardButton
                title={"Add to Watchlist"}
                icon={<PlusIcon className="w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600" />}
                clickHandler={watchlistHandler}
              />
              <SearchCardButton
                title={"Make Attachment"}
                icon={<Link2Icon className="w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600" />}
              />
              <SearchCardButton
                title={"Set Currently Watching"}
                icon={<EyeOpenIcon className="w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600" />}
                clickHandler={currentlyWatchingHandler}
              />
              {mediaType === "movie" && releaseDate?.slice(0, 4) == yearIndicator ? (
                <SearchCardButton
                  title={"Best Movie in This Year"}
                  icon={<StarFilledIcon className="w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600" />}
                  clickHandler={bestMovieHandler}
                />
              ) : releaseDate?.slice(0, 4) == yearIndicator ? (
                <SearchCardButton
                  title={"Best Series in This Year"}
                  icon={<StarFilledIcon className="w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600" />}
                  clickHandler={bestSeriesHandler}
                />
              ) : null}
              <SearchCardButton
                title={"Want to watch"}
                icon={
                  <BookmarkIcon
                    className={
                      wantToWatch
                        ? "w-6 h-6 transition-all text-fuchsia-600"
                        : clickAction1
                        ? "w-6 h-6 transition-all text-fuchsia-600"
                        : "w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600"
                    }
                  />
                }
                clickHandler={wantToWatchHandler}
                haveAdded={wantToWatch ? wantToWatch : clickAction1}
              />
              <SearchCardButton
                title={"Watched"}
                icon={
                  <BookmarkFilledIcon
                    className={
                      watched
                        ? "w-6 h-6 transition-all text-fuchsia-600"
                        : clickAction2
                        ? "w-6 h-6 transition-all text-fuchsia-600"
                        : "w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600"
                    }
                  />
                }
                clickHandler={watchedHandler}
                haveAdded={watched ? watched : clickAction2}
              />
              <SearchCardButton
                title={"Unfinished"}
                icon={
                  <PauseIcon
                    className={
                      unfinished
                        ? "w-6 h-6 transition-all text-fuchsia-600"
                        : clickAction3
                        ? "w-6 h-6 transition-all text-fuchsia-600"
                        : "w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600"
                    }
                  />
                }
                clickHandler={unfinishedHandler}
                haveAdded={unfinished ? unfinished : clickAction3}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="max-w-xs h-fit">
              <h3 className="pb-2 text-3xl text-slate-200">Rating</h3>
              <div className="flex">
                <p className="text-3xl text-slate-400">{vote.toString().slice(0, 3) + "/"}</p>
                <p className="text-3xl text-slate-400"> 10</p>
              </div>
            </div>
            <WantToWatchComponent />
            <WatchedComponent />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full p-6 text-center md:flex-col md:text-left">
        <div className="flex flex-col-reverse md:gap-4 md:flex-row md:pr-4">
          <div className="flex flex-col w-full md:w-[39rem]">
            <h3 className="mb-2 text-2xl md:text-4xl text-slate-200">Overview</h3>
            <p className="text-md md:text-lg text-slate-300">{overview}</p>
          </div>
          <UnfinishedComponent />
        </div>
        <h3 className="pb-2 mt-4 mb-2 text-2xl md:text-4xl text-slate-200">Trailer</h3>
        <Trailer trailerID={trailerID} />
        <div className="w-full md:w-1/3">
          {providers?.flatrate?.length ? (
            <div className="mt-4 ">
              <h3 className="pb-2 mb-4 text-4xl text-slate-200 md:mb-0">Providers</h3>
              <div className="flex flex-wrap justify-center gap-4 md:justify-start md:gap-2">
                {providers?.flatrate?.map((provider) => (
                  <img
                    key={provider.provider_id}
                    src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                    className="w-12 h-12 transition-all duration-300 border cursor-pointer drop-shadow-xl rounded-xl border-slate-400 hover:border-fuchsia-600"
                    alt={provider.provider_name}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SearchCardModalCenter;
