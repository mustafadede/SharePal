import React from "react";

function SearchedItem({ search, index, handleSuggestion }) {
  return (
    <button
      key={index}
      className="p-1 text-left transition-all border rounded-lg w-fit border-1 border-slate-400 hover:border-fuchsia-600 text-slate-300 hover:text-fuchsia-600"
      onClick={() => handleSuggestion(search)}
    >
      {search.length > 15 ? search.slice(0, 15) + "..." : search}
    </button>
  );
}

export default SearchedItem;
