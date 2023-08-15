import React from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { useSelector } from "react-redux";
import { BellIcon, Link2Icon, PlusIcon } from "@radix-ui/react-icons";
import SearchCardButton from "./SearchCardButton";
function SearchCardModal() {
  const { title, poster, releaseDate, overview, vote, backdrop } = useSelector((state) => state.modal.modalHasData);

  return (
    <div className="bg-slate-900 w-[50rem] h-[37rem] rounded-2xl relative overflow-hidden overflow-y-scroll no-scrollbar">
      <div className="absolute top-0 z-20 w-full p-6">
        <ModalHeader title="Information" />
      </div>
      {/* Image & Backdrop Image & title & release date */}
      <div className="relative flex flex-row-reverse w-full h-[21rem]">
        {/* Image */}
        <div className="absolute z-10 h-full top-12 w-52 right-20 drop-shadow-2xl">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster}`}
            className="w-full transition-all duration-300 border cursor-pointer drop-shadow-xl rounded-xl border-slate-400 hover:border-fuchsia-600"
            alt={poster}
          />
        </div>
        {/*Backdrop Image */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden blur-md rounded-tr-2xl">
          <img src={`https://image.tmdb.org/t/p/w500/${backdrop}`} className="w-full scale-y-150" alt={poster} />
        </div>
        {/* Title & Release Date */}
        <div className="absolute top-0 left-0 flex flex-col justify-center w-2/3 h-full gap-4 p-6">
          <h1 className="mt-4 text-4xl text-slate-200">{title}</h1>
          <h2 className="text-2xl text-fuchsia-600">{releaseDate && releaseDate.slice(0, 4)}</h2>
        </div>
      </div>
      {/* Actions & Overview & Rating */}
      <div className="relative flex gap-2 px-6 py-4 top-6">
        <div className="flex gap-4">
          <div className="w-[30rem]">
            <h2 className="mb-3 text-3xl text-slate-200">Actions</h2>
            <div className="flex flex-wrap gap-2">
              <SearchCardButton
                title={"Add to Watchlist"}
                icon={<PlusIcon className="w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600" />}
              />
              <SearchCardButton
                title={"Make Attachment"}
                icon={<Link2Icon className="w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600" />}
              />
              <SearchCardButton
                title={"Set Reminder"}
                icon={<BellIcon className="w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600" />}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="pb-2 text-4xl text-slate-200">Rating</h3>
            <div className="flex">
              <p className="text-3xl text-slate-400">{vote.toString().slice(0, 3) + "/"}</p>
              <p className="text-3xl text-slate-400"> 10</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 p-6">
        <h3 className="text-4xl text-slate-200">Overview</h3>
        <p className="text-slate-300">{overview}</p>
      </div>
    </div>
  );
}

export default SearchCardModal;
