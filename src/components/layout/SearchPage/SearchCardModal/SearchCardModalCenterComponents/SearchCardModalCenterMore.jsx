import React from "react";
import Trailer from "../../../../common/Trailer";
import ImagesSlider from "../../../../common/ImagesSlider";
import CastSlider from "../../../../common/CastSlider";
import { useTranslation } from "react-i18next";

function SearchCardModalCenterMore({ overview, vote, providers, images, trailerID, credits }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col md:gap-4 md:flex-row md:pr-4">
        <div className="flex flex-col w-full lg:gap-4 md:flex-row">
          <div className="flex flex-col w-full lg:w-2/3">
            <h3 className="mb-2 text-2xl text-center lg:text-start md:text-4xl text-slate-200">{t("overview.title")}</h3>
            <p className="text-center lg:text-start text-md md:text-lg text-slate-300">{overview}</p>
          </div>
          <div className="flex items-center justify-center w-full md lg:w-1/3">
            <div className="mt-4">
              <div className="max-w-xs mb-2 h-fit">
                <h3 className="pb-2 text-2xl md:text-3xl text-slate-200">{t("rating.title")}</h3>
                <div className="flex justify-center lg:justify-start">
                  <p className="text-3xl text-slate-400">{vote.toString().slice(0, 3) + "/"}</p>
                  <p className="text-3xl text-slate-400"> 10</p>
                </div>
              </div>
              <h3 className="pb-2 mb-4 text-2xl md:text-4xl text-slate-200 md:mb-0">{t("providers.title")}</h3>
              {providers?.buy?.length && (
                <div className="flex flex-wrap justify-center gap-4 md:justify-start md:gap-2">
                  <div className="flex flex-wrap justify-center gap-4 md:justify-start md:gap-2">
                    <p className="w-full text-2xl text-slate-400">{t("providers.buy")}</p>
                    {providers?.buy?.map((provider) => (
                      <img
                        key={provider.provider_id}
                        src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                        className="w-12 h-12 transition-all duration-300 border cursor-pointer drop-shadow-xl rounded-xl border-slate-400 hover:border-fuchsia-600"
                        alt={provider.provider_name}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              )}
              {providers?.rent?.length && (
                <div className="flex flex-wrap justify-center gap-4 md:justify-start md:gap-2">
                  <div className="flex flex-wrap justify-center gap-4 md:justify-start md:gap-2">
                    <p className="w-full text-2xl text-slate-400">{t("providers.rent")}</p>
                    {providers?.rent?.map((provider) => (
                      <img
                        key={provider.provider_id}
                        src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                        className="w-12 h-12 transition-all duration-300 border cursor-pointer drop-shadow-xl rounded-xl border-slate-400 hover:border-fuchsia-600"
                        alt={provider.provider_name}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              )}
              {providers?.flatrate?.length && (
                <div className="flex flex-wrap justify-center gap-4 md:justify-start md:gap-2">
                  <p className="w-full text-2xl text-slate-400">{t("providers.flatrate")}</p>
                  {providers?.flatrate?.map((provider) => (
                    <img
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                      className="w-12 h-12 transition-all duration-300 border cursor-pointer drop-shadow-xl rounded-xl border-slate-400 hover:border-fuchsia-600"
                      alt={provider.provider_name}
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
              {providers?.free?.length && (
                <div className="flex flex-wrap justify-center gap-4 md:justify-start md:gap-2">
                  <p className="w-full text-2xl text-slate-400">{t("providers.free")}</p>
                  {providers?.free?.map((provider) => (
                    <img
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                      className="w-12 h-12 transition-all duration-300 border cursor-pointer drop-shadow-xl rounded-xl border-slate-400 hover:border-fuchsia-600"
                      alt={provider.provider_name}
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
              {providers?.ads?.length && (
                <div className="flex flex-wrap justify-center gap-4 md:justify-start md:gap-2">
                  <p className="w-full text-2xl text-slate-400">{t("providers.ads")}</p>
                  {providers?.ads?.map((provider) => (
                    <img
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                      className="w-12 h-12 transition-all duration-300 border cursor-pointer drop-shadow-xl rounded-xl border-slate-400 hover:border-fuchsia-600"
                      alt={provider.provider_name}
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
              {providers?.other?.length && (
                <div className="flex flex-wrap justify-center gap-4 md:justify-start md:gap-2">
                  <p className="w-full text-2xl text-slate-400">{t("providers.other")}</p>
                  {providers?.other?.map((provider) => (
                    <img
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                      className="w-12 h-12 transition-all duration-300 border cursor-pointer drop-shadow-xl rounded-xl border-slate-400 hover:border-fuchsia-600"
                      alt={provider.provider_name}
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
              {!providers ? <p className="text-lg text-slate-600">{t("providers.notFound")}</p> : null}
            </div>
          </div>
        </div>
      </div>
      <h3 className="pb-2 mt-4 mb-2 text-2xl md:text-4xl text-slate-200">{t("trailer.title")}</h3>
      <Trailer trailerID={trailerID} />
      <div className="w-full h-full rounded-2xl">
        <CastSlider data={credits} header={t("cast.title")} key="cast" />
      </div>
      {images ? (
        <ImagesSlider data={images} header={t("images.title")} dataClassName="images" />
      ) : (
        <p className="mt-4 text-lg text-slate-600">{t("image.notFound")}</p>
      )}
    </>
  );
}

export default SearchCardModalCenterMore;
