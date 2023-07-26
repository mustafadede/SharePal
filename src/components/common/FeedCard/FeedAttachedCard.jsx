import { BookmarkIcon } from "@radix-ui/react-icons";
import React from "react";
import FeedCardButtons from "./Buttons/FeedCardButtons";

function FeedAttachedCard() {
  return (
    <div className="flex flex-col w-full p-4 my-4 bg-slate-900 rounded-xl">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-fuchsia-600"></div>
        <div className="flex flex-col">
          <p className="text-md text-slate-200">Mustafa DEDE</p>
          <p className="text-sm text-slate-400">@mddev</p>
        </div>
      </div>
      <p className="my-2 text-slate-200">Aşırı güzeldi!!!</p>
      <button className="flex items-center justify-between w-full gap-4 p-2 transition-colors duration-300 border rounded-2xl border-slate-700 group hover:bg-cGradient2 hover:border-slate-600">
        <div className="flex items-center gap-4">
          <img
            src="https://i.ebayimg.com/images/g/L10AAOSwtwtiKkdS/s-l1600.jpg"
            className="object-cover rounded-full w-14 h-14 grayscale group-hover:grayscale-0"
          ></img>
          <p className="text-slate-400 group-hover:text-slate-200">Batman (2022)</p>
        </div>
        <BookmarkIcon className="w-6 h-6 text-slate-400 group-hover:text-slate-200" />
      </button>
      <FeedCardButtons />
    </div>
  );
}

export default FeedAttachedCard;
