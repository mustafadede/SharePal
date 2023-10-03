import React from "react";
import SearchCardButton from "../SearchCardButton";
import { EyeOpenIcon, Link2Icon, PlusIcon } from "@radix-ui/react-icons";

function SearchCardModalCenter({ vote, overview, providers, watchlistHandler, currentlyWatchingHandler }) {
  return (
    <div>
      <div className="relative flex justify-center md:justify-start text-center md:text-left gap-2 px-6 py-4 top-6">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className=" w-full md:w-[30rem]">
            <h2 className="mb-3 text-3xl text-slate-200">Actions</h2>
            <div className="flex flex-wrap mb-2 md:mb-0 gap-2">
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
            </div>
          </div>
          <div className="flex items-center md:items-start flex-col">
            <h3 className="pb-2 text-3xl text-slate-200">Rating</h3>
            <div className="flex">
              <p className="text-3xl text-slate-400">{vote.toString().slice(0, 3) + "/"}</p>
              <p className="text-3xl text-slate-400"> 10</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full text-center md:text-left p-6">
        <div className="w-full md:w-2/3 md:pr-4">
          <h3 className="text-4xl mb-2 md:text-2xl text-slate-200">Overview</h3>
          <p className="text-md md:text-lg text-slate-300">{overview}</p>
        </div>
        <div className=" w-full md:w-1/3">
          {providers?.flatrate?.length ? (
            <div className="mt-4">
              <h3 className="pb-2 text-4xl text-slate-200 mb-4 md:mb-0">Providers</h3>
              <div className="flex justify-center md:justify-start flex-wrap gap-4 md:gap-2">
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
