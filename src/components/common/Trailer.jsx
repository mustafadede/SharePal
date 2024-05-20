import React from "react";
import { useTranslation } from "react-i18next";
import YouTube from "react-youtube";

function Trailer({ trailerID }) {
  const { t } = useTranslation();
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {},
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <>
      {trailerID ? (
        <div className="w-full  md:w-[42rem] lg:w-[47rem]">
          <YouTube videoId={trailerID} opts={opts} onReady={onReady} />
        </div>
      ) : (
        <p className="mt-4 text-lg text-slate-600">{t("trailer.notFound")}</p>
      )}
    </>
  );
}

export default Trailer;
