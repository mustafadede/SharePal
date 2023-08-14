import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

function EmptyCard({ title, clickHandler }) {
  return (
    <div className="flex justify-between w-full">
      <p className="text-2xl text-slate-400">{title}</p>
      <button onClick={clickHandler}>
        <PlusIcon className="w-6 h-6 transition-all cursor-pointer text-slate-200 hover:text-slate-400" />
      </button>
    </div>
  );
}

export default EmptyCard;
