import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../store/modalSlice";

function WatchedSeriesStats({ username, user }) {
  const dispatch = useDispatch();
  const { watchedSeriesList } = useSelector((state) => state.watched);
  const clickHandler = () => {
    !username && dispatch(modalActions.openModal({ name: "likesModal", data: { title: "Total Series", ids: watchedSeriesList } }));
  };
  return (
    <div className="flex flex-col w-full gap-4 p-4 h-fit rounded-xl bg-slate-900">
      <div className="flex w-full gap-4">
        <p className="text-xl font-bold md:text-3xl text-slate-200">Total Series</p>
      </div>
      <button
        type="button"
        className="flex items-center gap-4 text-2xl cursor-pointer hover:underline md:text-4xl w-fit text-slate-400"
        onClick={clickHandler}
      >
        {user?.totalSeries || 0}
      </button>
    </div>
  );
}

export default WatchedSeriesStats;
