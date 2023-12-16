import React from "react";

function SearchCardModalCenterCommentSection() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 px-6 pt-6 mt-4 text-center md:flex-row md:text-left">
      <input
        type="text"
        className="w-full h-full px-4 py-2 duration-150 outline-none text-cWhite bg-slate-800 rounded-2xl"
        placeholder="Write a comment..."
      />
      <button className="px-4 py-1 text-lg duration-150 bg-fuchsia-900 rounded-2xl text-slate-400 hover:text-slate-200">Comment</button>
    </div>
  );
}

export default SearchCardModalCenterCommentSection;
