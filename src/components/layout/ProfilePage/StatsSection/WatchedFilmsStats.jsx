import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../store/modalSlice";
import { useTranslation } from "react-i18next";

function WatchedFilmsStats({ username, user }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { watchedMovieList } = useSelector((state) => state.watched);
  const clickHandler = () => {
    if (!username) {
      dispatch(modalActions.openModal({ name: "likesModal", data: { title: t("stats.totalFilms"), ids: watchedMovieList } }));
    } else {
      dispatch(
        modalActions.openModal({
          name: "likesModal",
          data: { title: t("stats.totalFilms"), ids: user?.totalFilmsStats },
        })
      );
    }
  };
  return (
    <div className="flex flex-col w-full gap-4 p-4 h-fit rounded-xl bg-slate-900">
      <div className="flex items-center justify-between w-full gap-4">
        <p className="text-xl font-bold md:text-3xl text-slate-200">{t("stats.totalFilms")}</p>
      </div>
      <button
        type="button"
        className="flex items-center gap-4 text-2xl cursor-pointer hover:underline md:text-4xl w-fit text-slate-400"
        onClick={clickHandler}
      >
        {user?.totalFilms || 0}
      </button>
    </div>
  );
}

export default WatchedFilmsStats;
