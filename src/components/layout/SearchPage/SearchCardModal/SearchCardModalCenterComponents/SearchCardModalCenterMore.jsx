import React from "react";
import Trailer from "../../../../common/Trailer";
import ImagesSlider from "../../../../common/ImagesSlider";

function SearchCardModalCenterMore({ overview, vote, providers, images, trailerID }) {
  return (
    <>
      <div className="flex flex-col md:gap-4 md:flex-row md:pr-4">
        <div className="flex flex-col w-full lg:gap-4 md:flex-row">
          <div className="flex flex-col w-full lg:w-2/3">
            <h3 className="mb-2 text-2xl text-center lg:text-start md:text-4xl text-slate-200">Overview</h3>
            <p className="text-center lg:text-start text-md md:text-lg text-slate-300">{overview}</p>
          </div>
          <div className="flex items-center justify-center w-full md lg:w-1/3">
            {providers?.flatrate?.length ? (
              <div className="mt-4">
                <div className="max-w-xs mb-2 h-fit">
                  <h3 className="pb-2 text-2xl md:text-3xl text-slate-200">Rating</h3>
                  <div className="flex justify-center lg:justify-start">
                    <p className="text-3xl text-slate-400">{vote.toString().slice(0, 3) + "/"}</p>
                    <p className="text-3xl text-slate-400"> 10</p>
                  </div>
                </div>
                <h3 className="pb-2 mb-4 text-2xl md:text-4xl text-slate-200 md:mb-0">Providers</h3>
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
      <h3 className="pb-2 mt-4 mb-2 text-2xl md:text-4xl text-slate-200">Trailer</h3>
      <Trailer trailerID={trailerID} />
      <h1 className="mt-4 text-4xl text-slate-200">Images</h1>
      {images ? (
        <ImagesSlider data={images} dataClassName="images" />
      ) : (
        <p className="mt-4 text-lg text-slate-600">No image content found.</p>
      )}
    </>
  );
}

export default SearchCardModalCenterMore;
