import React from "react";

function SearchButton({ mediaType, text, indicatorName, setSelectedFilter, showIndicators, setMovies, setUsers, selectedFilter }) {
  const handleFilter = (title) => {
    setSelectedFilter(title);
    setMovies("");
    setUsers([]);
  };
  return (
    <button
      className={
        selectedFilter === mediaType
          ? "flex px-2 py-1 bg-transparent gap-2 items-center rounded-md text-slate-200"
          : "flex px-2 py-1 bg-transparent gap-2 items-center rounded-md text-slate-400"
      }
      onClick={() => handleFilter(mediaType)}
    >
      {text}
      {showIndicators && <span className="px-2 text-sm rounded-2xl bg-slate-800 text-slate-400">{indicatorName}</span>}
    </button>
  );
}

export default SearchButton;
