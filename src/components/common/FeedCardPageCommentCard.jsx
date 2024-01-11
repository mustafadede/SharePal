import React from "react";
import { NavLink } from "react-router-dom";
import FeedCardActionsSkeleton from "./FeedCard/FeedCardActions/FeedCardActionsSkeleton";

function FeedCardPageCommentCard() {
  return (
    <div className="p-4 bg-slate-900 rounded-2xl">
      <div className="flex gap-4">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full bg-fuchsia-600"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <NavLink to="/profile" className="text-lg font-semibold text-slate-200 hover:underline">
              @Username
            </NavLink>
            <p className="text-sm text-slate-200">1h</p>
          </div>
          <p className="text-slate-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, voluptatum.</p>
          <div className="flex gap-4 mt-1">
            <FeedCardActionsSkeleton action={"likes"} number={0} data={0} />
            <FeedCardActionsSkeleton action={"comments"} number={0} data={0} />
            <FeedCardActionsSkeleton action={"reposts"} number={0} data={0} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedCardPageCommentCard;
