import React from "react";
import SearchCardModalCenterTop from "./SearchCardModalCenterComponents/SearchCardModalCenterTop";
import SearchCardModalCenterMore from "./SearchCardModalCenterComponents/SearchCardModalCenterMore";

function SearchCardModalCenter({
  mediaType,
  releaseDate,
  vote,
  overview,
  trailerID,
  providers,
  watchlistHandler,
  attachHandler,
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
  images,
}) {
  const yearIndicator = new Date().getFullYear();
  const [seeMore, setSeeMore] = React.useState(false);
  return (
    <div>
      <SearchCardModalCenterTop
        mediaType={mediaType}
        releaseDate={releaseDate}
        watchlistHandler={watchlistHandler}
        attachHandler={attachHandler}
        currentlyWatchingHandler={currentlyWatchingHandler}
        bestMovieHandler={bestMovieHandler}
        bestSeriesHandler={bestSeriesHandler}
        wantToWatchHandler={wantToWatchHandler}
        unfinishedHandler={unfinishedHandler}
        watchedHandler={watchedHandler}
        wantToWatch={wantToWatch}
        watched={watched}
        unfinished={unfinished}
        clickAction1={clickAction1}
        clickAction2={clickAction2}
        clickAction3={clickAction3}
        yearIndicator={yearIndicator}
      />
      <div className="flex flex-col w-full px-6 pt-6 text-center md:flex-col md:text-left">
        {seeMore ? (
          <>
            <SearchCardModalCenterMore overview={overview} vote={vote} providers={providers} images={images} trailerID={trailerID} />
            <button
              className="px-4 py-2 mt-4 text-lg transition-all duration-150 hover:bg-cGradient2/40 rounded-2xl text-slate-400 hover:text-slate-200"
              onClick={() => setSeeMore(false)}
            >
              See Less
            </button>
          </>
        ) : (
          <button
            className="flex justify-center px-4 py-2 text-lg duration-150 text-slate-200 rounded-2xl bg-cGradient2/40 hover:bg-cGradient2/80"
            onClick={() => setSeeMore(true)}
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchCardModalCenter;
