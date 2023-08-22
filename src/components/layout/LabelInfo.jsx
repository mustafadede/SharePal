import { Cross1Icon } from "@radix-ui/react-icons";
import React from "react";
import { toast } from "react-toastify";

function LabelInfo({ info, data = "", handleClose }) {
  const handleClick = () => {
    navigator.clipboard.writeText(data) && toast("Copied to clipboard.");
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-slate-900">
      <div className="flex">
        <p className="text-fuchsia-600">{info}</p>
        <p className="px-1 underline cursor-pointer text-fuchsia-600" onClick={handleClick}>
          {data}
        </p>
      </div>
      <div>
        <button className="flex transition-all border-slate-300 text-slate-300 hover:text-fuchsia-600" onClick={handleClose}>
          <Cross1Icon className="w-4 h-4 2xl:w-6 2xl:h-6" />
        </button>
      </div>
    </div>
  );
}

export default LabelInfo;
