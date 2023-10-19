import React from "react";

function CommentCard({ text, photo }) {
  return (
    <div className="flex w-full gap-2">
      <div className="flex flex-row items-end justify-center w-full gap-3">
        <img src={photo} className="w-12 h-12 rounded-full" alt="user" />
        <div className="flex flex-col px-4 py-2 bg-fuchsia-950 rounded-2xl">
          <p className="text-md text-slate-300">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
