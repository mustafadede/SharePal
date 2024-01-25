import React from "react";
import { useSelector } from "react-redux";

function FeedLoading() {
  const { status } = useSelector((state) => state.posts);

  return <div>{status === "loading" && <p className="w-full mt-1 text-xl text-center text-slate-400">Loading...</p>}</div>;
}

export default FeedLoading;
