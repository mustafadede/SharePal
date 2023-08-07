import React from "react";

function FeedCardActionsSkeleton({ action, number }) {
  return (
    <div className="flex gap-1 cursor-pointer group">
      <p className="transition-all text-slate-400 group-hover:text-fuchsia-600">{number}</p>
      <p className="transition-all text-slate-400 group-hover:text-fuchsia-600">{action}</p>
    </div>
  );
}

export default FeedCardActionsSkeleton;
