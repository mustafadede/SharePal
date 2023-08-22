import { Cross1Icon } from "@radix-ui/react-icons";
import React from "react";
import { toast } from "react-toastify";

function LabelInfo({ info, data = "", handleClose }) {
  const handleClick = () => {
    navigator.clipboard.writeText(data) && toast("Copied to clipboard.");
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-gradient-to-r from-cDarkerPurple to-fuchsia-600 animate-text">
      <div className="block lg:flex">
        <p className="text-slate-200 2xl:text-xl">{info}</p>
        <p className="px-1 underline transition-all cursor-pointer 2xl:text-xl text-slate-200 hover:text-slate-300" onClick={handleClick}>
          {data}
        </p>
      </div>
      <div>
        <button className="flex transition-all border-slate-300 text-slate-300 hover:text-slate-900" onClick={handleClose}>
          <Cross1Icon className="w-4 h-4 2xl:w-6 2xl:h-6" />
        </button>
      </div>
    </div>
  );
}

export default LabelInfo;
