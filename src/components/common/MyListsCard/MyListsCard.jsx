import React from "react";

function MyListsCard() {
  return (
    <div className="p-4 mt-4 w-72 h-fit bg-slate-900 rounded-2xl">
      <p className="text-xl text-slate-200">My Lists</p>
      <div className="flex flex-col justify-center pt-4 ">
        <p className="text-md text-slate-400">You have no lists yet.</p>
      </div>
    </div>
  );
}

export default MyListsCard;
