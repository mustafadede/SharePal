import React, { useState } from "react";
import { Cross1Icon, ShuffleIcon } from "@radix-ui/react-icons";
import ActionDetailsCard from "../../../common/ActionDetailsCard";

function ListModalCard({ title, poster, releaseDate, backdrop }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className="relative flex items-center w-full h-24 gap-4 my-2 cursor-pointer group rounded-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {backdrop ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${backdrop}`}
            alt={title}
            className={
              isOpen
                ? "absolute inset-0 object-cover w-full h-full transition-opacity duration-700 rounded-2xl opacity-40"
                : "absolute inset-0 object-cover w-full h-full transition-opacity duration-700 opacity-0 rounded-2xl group-hover:opacity-40"
            }
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster}`}
            alt={title}
            className="absolute inset-0 object-cover w-full h-full transition-opacity duration-700 opacity-0 rounded-2xl group-hover:opacity-40"
          />
        )}
        <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title} className="z-10 w-16 h-full rounded-xl" />
        <div className="flex justify-between w-full gap-1 pr-4">
          <p className="z-10 text-lg text-left text-slate-200">{title}</p>
          <p className="z-10 text-lg text-slate-400">({releaseDate?.slice(0, 4)})</p>
        </div>
      </button>
      {isOpen && (
        <ActionDetailsCard
          icon1={
            <button className="flex items-center w-full px-4 py-2 text-sm text-left transition-all text-slate-200 rounded-xl hover:bg-slate-800">
              <ShuffleIcon className="w-5 h-5 mr-2" />
              Swap
            </button>
          }
          icon2={
            <button className="flex items-center w-full px-4 py-2 text-sm text-left transition-all bg-fuchsia-800/20 text-slate-200 rounded-xl hover:bg-slate-800">
              <Cross1Icon className="w-5 h-5 mr-2" />
              Delete
            </button>
          }
        />
      )}
    </div>
  );
}

export default ListModalCard;
