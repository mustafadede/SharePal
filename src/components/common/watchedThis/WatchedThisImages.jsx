import React from "react";
import { useSelector } from "react-redux";

function WatchedThisImages() {
  const { modalHasData } = useSelector((state) => state.modal);
  return (
    <div className="relative flex flex-col items-center w-full gap-4 mt-4 h-fit">
      <img
        src={`https://image.tmdb.org/t/p/w500/${modalHasData?.backdrop}`}
        alt={modalHasData?.title}
        className="absolute z-0 object-cover w-full rounded-lg h-36 md:h-48 opacity-30 h-inherit"
      />
      <img
        src={`https://image.tmdb.org/t/p/w500/${modalHasData?.poster}`}
        alt={modalHasData?.title}
        className="z-10 w-12 h-full mt-4 transition-colors duration-300 border rounded-lg border-slate-200 hover:border-fuchsia-600 md:w-20 md:h-28"
      />
      <h1 className="z-10 font-bold text-center text-md md:text-xl text-cWhite">{modalHasData?.title}</h1>
    </div>
  );
}

export default WatchedThisImages;
