import React from "react";

function ListsSectionCard({ title }) {
  return (
    <button className="flex flex-col w-48 h-48 gap-2 p-2 transition-all hover:bg-slate-800 group rounded-2xl">
      <img
        className="object-cover w-full h-full rounded-xl group-hover:opacity-75"
        src="https://static01.nyt.com/images/2017/04/24/arts/24bates/24bates-videoSixteenByNineJumbo1600.jpg"
      ></img>
      <p className="text-xl transition-all text-slate-200 2xl:text-2xl group-hover:text-fuchsia-600">{title}</p>
    </button>
  );
}

export default ListsSectionCard;
