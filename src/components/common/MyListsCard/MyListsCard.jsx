import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
function MyListsCard() {
  const clickHandler = () => {
    console.log("clicked");
  };
  return (
    <div className="p-4 mt-4 w-72 h-fit bg-slate-900 rounded-2xl">
      <div className="flex justify-between">
        <p className="text-xl text-slate-200">My Lists</p>
        <button onClick={clickHandler}>
          <PlusIcon className="w-6 h-6 transition-all cursor-pointer text-slate-200 hover:text-slate-400" />
        </button>
      </div>
      <div className="flex flex-col justify-center pt-4 ">
        <p className="text-md text-slate-400">You have no lists yet.</p>
      </div>
    </div>
  );
}

export default MyListsCard;
