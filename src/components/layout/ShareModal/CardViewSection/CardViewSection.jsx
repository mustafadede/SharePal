import React, { useState } from "react";
import { useSelector } from "react-redux";
import FeedCard from "../../../common/FeedCard";

const bgColors = {
  first: "bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl",
  second: "bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl",
  third: "bg-gradient-to-r from-cyan-400 to-yellow-500 rounded-xl",
  fourth: "bg-gradient-to-r from-purple-500 to-purple-900 rounded-xl",
  fifth: "bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl",
};

function CardViewSection({ referance }) {
  const [bgColor, setBgColor] = useState(bgColors.first);
  const { modalHasData: data } = useSelector((state) => state.modal);
  console.log(data.nick);
  return (
    <>
      <div className={bgColor} ref={referance}>
        <div className="flex items-center justify-center w-full pt-4">
          <div className="w-full scale-90 select-none md:scale-100 md:w-2/3">
            {data.attachedFilm && <FeedCard isAttached={true} data={data} notification share />}
            {data.spoiler && !data.attachedFilm && <FeedCard isSpoiler={true} data={data} notification share />}
            {!data.actionName && !data.attachedFilm && !data.spoiler && <FeedCard isComment={true} data={data} notification share />}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-4 pt-4">
        <button
          onClick={() => setBgColor(bgColors.first)}
          className="rounded-full w-7 h-7 bg-gradient-to-r from-violet-600 to-indigo-600"
        ></button>
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
      </div>
    </>
  );
}

export default CardViewSection;
