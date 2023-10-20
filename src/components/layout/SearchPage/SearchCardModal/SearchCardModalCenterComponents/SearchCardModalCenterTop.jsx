import React from "react";
import WantToWatchComponent from "../../../../common/WantToWatchComponent";
import WatchedComponent from "../../../../common/WatchedComponent";
import UnfinishedComponent from "../../../../common/UnfinishedComponent";
import SearchCardButton from "../../SearchCardButton";
import { BookmarkFilledIcon, BookmarkIcon, EyeOpenIcon, Link2Icon, PauseIcon, PlusIcon, StarFilledIcon } from "@radix-ui/react-icons";
import CommentSlider from "../../../../common/CommentSlider";

function SearchCardModalCenterTop({
  mediaType,
  releaseDate,
  watchlistHandler,
  currentlyWatchingHandler,
  bestMovieHandler,
  bestSeriesHandler,
  wantToWatchHandler,
  unfinishedHandler,
  watchedHandler,
  wantToWatch,
  watched,
  unfinished,
  clickAction1,
  clickAction2,
  clickAction3,
  yearIndicator,
}) {
  return (
    <div className="relative flex justify-center gap-2 px-6 py-4 text-center md:justify-start md:text-left top-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:min-w-[28rem] md:max-w-[30rem]">
          <h2 className="mb-2 text-3xl text-slate-200">Actions</h2>
          <div className="flex flex-col justify-center md:mb-0 md:justify-start">
            {localStorage.getItem("user") ? (
              <div className="flex flex-wrap gap-2">
                <SearchCardButton
                  title={"Add to Watchlist"}
                  icon={<PlusIcon className="w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600" />}
                  clickHandler={watchlistHandler}
                />
                <SearchCardButton
                  title={"Attachment"}
                  icon={<Link2Icon className="w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600" />}
                />
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
                <SearchCardButton
                  title={"Currently Watching"}
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
              </div>
            ) : (
              <p className="text-lg text-slate-600">You need to be logged in to add this to your lists.</p>
            )}
          </div>
          <div className="w-full">
            <CommentSlider />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-start">
          <WantToWatchComponent />
          <WatchedComponent />
          <UnfinishedComponent />
        </div>
      </div>
    </div>
  );
}

export default SearchCardModalCenterTop;
