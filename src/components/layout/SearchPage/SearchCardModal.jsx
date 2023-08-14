import React from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { useSelector } from "react-redux";
function SearchCardModal() {
  const { title, poster, releaseDate, overview, vote } = useSelector((state) => state.modal.modalHasData);
  return (
    <div className="bg-slate-900 w-[50rem] h-[36rem] rounded-2xl relative overflow-hidden overflow-y-scroll no-scrollbar">
      <div className="absolute top-0 z-20 w-full p-6">
        <ModalHeader title="Information" />
      </div>
      <div className="relative flex flex-row-reverse w-full h-80">
        <div className="absolute top-0 left-0 object-center w-full h-full overflow-hidden bg-center rounded-tr-2xl">
          <img src={`https://image.tmdb.org/t/p/w500/${poster}`} className="object-center w-full" alt={poster} />
        </div>
        <div className="absolute top-0 left-0 flex flex-col justify-center w-2/3 h-full gap-4 p-6 bg-gradient-to-r to-transparent from-black">
          <h1 className="mt-4 text-4xl text-slate-200">{title}</h1>
          <h2 className="text-2xl text-slate-400">{releaseDate && releaseDate.slice(0, 4)}</h2>
        </div>
      </div>
      <div className="flex gap-4 px-6 py-4">
        <div className="flex flex-col w-2/3 gap-2">
          <h3 className="text-4xl text-slate-200">Overview</h3>
          <p className="text-slate-300">{overview}</p>
        </div>
        <div className="flex flex-col w-1/3">
          <h3 className="pb-2 text-4xl text-slate-200">Rating</h3>
          <div className="flex">
            <p className="text-3xl text-slate-400">{vote.toString().slice(0, 3) + "/"}</p>
            <p className="text-3xl text-slate-400"> 10</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCardModal;
