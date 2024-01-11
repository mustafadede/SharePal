import React, { useState } from "react";
import { useSelector } from "react-redux";

function FeedCardPageCommentSection() {
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
    }
  };
  return (
    <div className="flex w-full gap-2 p-4 mb-4 rounded-2xl bg-slate-900">
      {user?.photoURL && <img src={user.photoURL} alt="profile" className="object-cover h-10 rounded-full w-14" />}
      {!user?.photoURL && <div className="h-10 rounded-full w-14 bg-fuchsia-600"></div>}
      <input
        type="text"
        placeholder="Add a comment"
        autoFocus
        className="w-full h-10 p-2 duration-300 bg-transparent rounded-lg hover:bg-slate-800 text-md text-slate-200 focus:outline-none"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
      />
      <button className="w-32 h-10 px-4 py-2 duration-150 rounded-lg hover:bg-slate-600 text-md text-cWhite bg-fuchsia-800 focus:outline-none">
        Post
      </button>
    </div>
  );
}

export default FeedCardPageCommentSection;
