import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import React from "react";

function EditSpoilerButton({ isSpoiler, onClickAction }) {
  const handleClick = () => {
    onClickAction(!isSpoiler);
  };
  return (
    <div className="relative justify-center group">
      <button
        className={
          isSpoiler
            ? "flex items-center justify-center transition-all duration-150 rounded-lg w-10 h-10 bg-slate-800"
            : "flex items-center justify-center transition-all duration-150 rounded-lg w-10 h-10 group-hover:bg-slate-800"
        }
        onClick={handleClick}
      >
        {isSpoiler ? <LockClosedIcon className="w-4 h-4 text-slate-200" /> : <LockOpen1Icon className="w-4 h-4 text-slate-200" />}
      </button>
      <span className="absolute top-[-20px] right-0 p-1 w-16 flex justify-center -mt-2 -mr-2 text-xs scale-0 rounded-lg text-slate-200 opacity-0 bg-slate-600/70 transition-all duration-150 lg:group-hover:scale-100 group-hover:opacity-100">
        Spoiler ?
      </span>
    </div>
  );
}

export default EditSpoilerButton;
