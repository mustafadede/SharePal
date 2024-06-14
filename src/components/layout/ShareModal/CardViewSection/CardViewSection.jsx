import React, { useState } from "react";
import { useSelector } from "react-redux";
import FeedCard from "../../../common/FeedCard";

function CardViewSection({ referance }) {
  const { modalHasData: data } = useSelector((state) => state.modal);
  const bgColors = {
    first: { index: 1, color: "bg-indigo-600" },
    second: { index: 2, color: "bg-gradient-to-r from-rose-500 to-pink-500" },
    third: { index: 3, color: "bg-gradient-to-r from-cyan-400 to-yellow-500" },
    fourth: { index: 4, color: "bg-gradient-to-r from-purple-500 to-purple-900" },
    fifth: { index: 5, color: "bg-gradient-to-r from-emerald-400 to-green-500" },
    sixth: { index: 6, color: "" },
    seventh: { index: 7, color: "" },
  };
  const [bgColor, setBgColor] = useState(bgColors.first);
  return (
    <>
      <div className={`relative w-full min-h-fit overflow-hidden ${bgColor.color}`} ref={referance}>
        {bgColor.index === 6 && (
          <div
            className="absolute inset-0 w-full h-full bg-no-repeat bg-cover filter blur-sm"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.attachedFilm?.poster})`,
              backgroundPosition: "center",
              borderRadius: ".7rem",
            }}
          />
        )}
        {bgColor.index === 7 && (
          <div
            className="absolute inset-0 w-full h-full bg-no-repeat bg-cover filter blur-sm"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.attachedFilm?.backdrop})`,
              backgroundPosition: "center",
              borderRadius: ".7rem",
            }}
          />
        )}
        <div className="flex items-center justify-center w-full pt-4">
          <div className="w-full scale-90 select-none md:scale-100 md:w-2/3">
            {data.attachedFilm && <FeedCard isAttached={true} data={data} notification share />}
            {data.spoiler && !data.attachedFilm && <FeedCard isSpoiler={true} data={data} notification share />}
            {!data.actionName && !data.attachedFilm && !data.spoiler && <FeedCard isComment={true} data={data} notification share />}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-4 pt-4">
        <button onClick={() => setBgColor(bgColors.first)} className="bg-indigo-600 rounded-full w-7 h-7"></button>
        <button
          onClick={() => setBgColor(bgColors.second)}
          className="rounded-full w-7 h-7 bg-gradient-to-r from-rose-500 to-pink-500"
        ></button>
        <button
          onClick={() => setBgColor(bgColors.third)}
          className="rounded-full w-7 h-7 bg-gradient-to-r from-cyan-400 to-yellow-500"
        ></button>
        <button
          onClick={() => setBgColor(bgColors.fourth)}
          className="rounded-full w-7 h-7 bg-gradient-to-r from-purple-500 to-purple-900"
        ></button>
        <button
          onClick={() => setBgColor(bgColors.fifth)}
          className="rounded-full w-7 h-7 bg-gradient-to-r from-emerald-400 to-green-500"
        ></button>
        {data.attachedFilm?.poster && (
          <button
            onClick={() => setBgColor(bgColors.sixth)}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.attachedFilm?.poster})`,
              objectFit: "cover",
            }}
            className={`rounded-full w-7 h-7`}
          ></button>
        )}
        {data.attachedFilm?.backdrop && (
          <button
            onClick={() => setBgColor(bgColors.seventh)}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.attachedFilm?.backdrop})`,
              objectFit: "cover",
            }}
            className={`rounded-full w-7 h-7`}
          ></button>
        )}
      </div>
    </>
  );
}

export default CardViewSection;
