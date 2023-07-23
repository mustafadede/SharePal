import React from "react";

function FeedCommentCard() {
  return (
    <div className="flex flex-col w-full p-4 my-4 bg-slate-900 rounded-xl">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-fuchsia-600"></div>
        <div className="flex flex-col">
          <p className="text-md text-slate-200">Mustafa DEDE</p>
          <p className="text-sm text-slate-400">@mddev</p>
        </div>
      </div>
      <p className="py-4 text-slate-200">hello hello hello hello hello</p>
    </div>
  );
}

export default FeedCommentCard;
