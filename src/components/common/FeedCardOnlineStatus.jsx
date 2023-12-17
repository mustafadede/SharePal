import React from "react";
import useOnline from "../../hooks/useOnline";

function FeedCardOnlineStatus({ username, data }) {
  const online = useOnline(username, data);
  return online ? (
    <div className="absolute w-3 h-3 bottom-1 right-1">
      <div className="box-content w-3 h-3 bg-green-600 border-4 rounded-full border-slate-900"></div>
    </div>
  ) : (
    <div className="absolute w-3 h-3 bottom-1 right-1">
      <div className="box-content w-3 h-3 border-4 rounded-full border-slate-900 bg-slate-600"></div>
    </div>
  );
}

export default FeedCardOnlineStatus;
