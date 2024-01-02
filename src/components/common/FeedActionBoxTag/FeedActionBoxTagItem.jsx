import React from "react";

function FeedActionBoxTagItem({ img, nick }) {
  return (
    <div className="flex flex-col items-center justify-center w-24 h-24 gap-2 p-2 overflow-hidden duration-300 rounded-lg cursor-pointer text-ellipsis hover:bg-slate-600 bg-slate-900">
      <img src={img} alt="profile photo" className="rounded-full w-14 h-14" />
      <p className="text-slate-300 text-md">@{nick.length > 7 ? nick.slice(0, 7) + "..." : nick}</p>
    </div>
  );
}

export default FeedActionBoxTagItem;
