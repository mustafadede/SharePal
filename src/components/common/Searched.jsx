import React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import SearchedDeleteButton from "./Searched/SearchedDeleteButton";
import SearchedItem from "./Searched/SearchedItem";

function Searched({ handleSuggestion, setSearched }) {
  const localStorageData = JSON.parse(localStorage.getItem("spsi"));
  return (
    <div className="flex items-center gap-2 my-2">
      <p className="flex items-center text-lg text-slate-400 w-fit">
        <MagnifyingGlassIcon className="w-6 h-6" />
      </p>
      <div className="flex flex-col flex-wrap justify-center w-full h-10 gap-2 overflow-hidden overflow-x-auto no-scrollbar">
        {localStorageData &&
          localStorageData.map(
            (search, index) =>
              search !== "" && <SearchedItem key={index} search={search} index={index} handleSuggestion={handleSuggestion} />
          )}
      </div>
      <SearchedDeleteButton setSearched={setSearched} />
    </div>
  );
}

export default Searched;
