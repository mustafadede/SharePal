import React from "react";

function WatchedSeriesStats({ username, user }) {
  return (
    <div className="flex flex-col w-full gap-4 p-4 h-fit rounded-xl bg-slate-900">
      <div className="flex w-full gap-4">
        <p className="text-xl font-bold md:text-3xl text-slate-200">Total Series</p>
      </div>
      <div className="flex text-2xl sgap-4 md:text-4xl text-slate-400">{user?.totalSeries || 0}</div>
    </div>
  );
}

export default WatchedSeriesStats;
