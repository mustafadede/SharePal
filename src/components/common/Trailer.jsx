import React from "react";
import YouTube from "react-youtube";

function Trailer({ trailerID }) {
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
        <p className="mt-4 text-lg text-slate-600">No Trailer Found.</p>
      )}
    </>
  );
}

export default Trailer;
