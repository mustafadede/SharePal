import React from "react";

function FeedLoading({ tab, status }) {
  return <div>{tab === 0 && status === "loading" && <p className="w-full mt-1 text-xl text-center text-slate-400">Loading...</p>}</div>;
}

export default FeedLoading;
