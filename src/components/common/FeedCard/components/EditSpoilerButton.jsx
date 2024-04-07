import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import React from "react";
import HoverInfo from "../../HoverInfo";

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
      <HoverInfo title={"Spoiler ?"} />
    </div>
  );
}

export default EditSpoilerButton;
