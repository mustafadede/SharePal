import React from "react";

function SearchCardButton({ title, icon, clickHandler }) {
  return (
    <button
      className="flex items-center gap-2 p-2 transition-all border border-slate-400 rounded-2xl group hover:border-fuchsia-600 w-fit"
      onClick={clickHandler}
    >
      {icon}
      <p className="transition-all hidden md:block text-slate-400 group-hover:text-fuchsia-600">{title}</p>
    </button>
  );
}

export default SearchCardButton;
