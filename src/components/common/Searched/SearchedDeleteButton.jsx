import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";

function SearchedDeleteButton({ setSearched }) {
  return (
    <button
      className="p-2 transition-all duration-300 border rounded-lg border-1 border-slate-400 hover:border-transparent text-slate-400 hover:text-fuchsia-600"
      onClick={() => {
        localStorage.removeItem("spsi");
        setSearched(false);
      }}
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  );
}

export default SearchedDeleteButton;
