import { Link2Icon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { toast } from "react-toastify";

function AttachedCard({ title, poster, releaseDate }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(modalActions.closeModal({ data: { title, poster, releaseDate } })) && toast.success("Attached successfully!");
  };
  return (
    <div className="flex justify-between w-full h-32 p-2 group rounded-2xl">
      <div className="flex">
        {poster && <img className="object-cover w-20 h-full rounded-2xl" src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title} />}
        <div className="flex flex-col justify-center ml-2">
          <p className="text-lg font-semibold transition-all text-cWhite group-hover:text-fuchsia-600">{title}</p>
          <p className="text-sm transition-all text-slate-400 group-hover:">{releaseDate.slice(0, 4)}</p>
        </div>
      </div>
      <button
        className="px-2 py-1 text-white transition-all bg-transparent rounded-xl hover:text-fuchsia-800"
        onClick={(movie) => handleClick(movie)}
      >
        <Link2Icon className="w-6 h-6" />
      </button>
    </div>
  );
}

export default AttachedCard;
