import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckIcon, DotsVerticalIcon, RocketIcon } from "@radix-ui/react-icons";
import { updateWatched, deleteSelectedNotification } from "../../../firebase/firebaseActions";
import { DateFormatter } from "../../../utils/formatter";
import ActionDetailsCard from "../ActionDetailsCard";
import useSearchWithYear from "../../../hooks/useSearchWithYear";
import { modalActions } from "../../../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../../store/notificationSlice";
import NotificationPhoto from "./components/NotificationPhoto";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function NotificationSuggestionCard({ uid, nick, photoURL, date, deleteId, attached }) {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState(false);
  const newDate = DateFormatter(date);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleClick = () => {
    const movieInfoHandler = () => {
      useSearchWithYear(attached.title, attached.releaseDate).then((data) => {
        if (data) {
          dispatch(
            modalActions.openModal({
              name: "searchCardModal",
              data: {
                id: data.id,
                title: data.original_title || data.original_name,
                poster: data.poster_path,
                releaseDate: data.release_date || data.first_air_date,
                overview: data.overview,
                vote: data.vote_average,
                backdrop: data.backdrop_path,
                genres: data.genre_ids,
                mediaType: data.media_type,
                upcoming: data.upcoming,
              },
            })
          );
        }
      });
    };
    movieInfoHandler();
  };
  console.log(attached);
  const watchedHandler = () => {
    updateWatched({ id: attached.id, mediaType: attached.mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
      toast("Added to your stats!");
      deleteSelectedNotification(deleteId).then(() => {
        setSettings(false);
        dispatch(notificationActions.deleteSelectedNotification(deleteId));
      });
    });
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="relative flex flex-row items-center justify-between w-full p-4 mb-4 transition-all duration-150 border border-transparent bg-slate-900 rounded-xl hover:border-slate-400">
          <div className="flex gap-4">
            <NotificationPhoto uid={uid} photoURL={photoURL} />
            <motion.div className="flex flex-col items-start justify-center">
              {i18n.language === "en" ? (
                <motion.p className="flex gap-1 text-base text-cWhite text-slate-20">
                  <Link
                    to={`/user/${nick}`}
                    className="text-base transition-all duration-300 text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600"
                  >
                    <motion.span className="font-bold text-fuchsia-600 ">{nick}</motion.span>
                  </Link>
                  suggested
                  <button
                    className="text-base transition-all duration-300 text-fuchsia-400 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600"
                    onClick={handleClick}
                  >
                    {attached.title.length > 24 ? attached.title.slice(0, 24) + "..." : attached.title}
                  </button>
                  to you.
                </motion.p>
              ) : (
                <motion.p className="flex gap-1 text-base text-cWhite text-slate-20">
                  <Link
                    to={`/user/${nick}`}
                    className="text-base transition-all duration-300 text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600"
                  >
                    <motion.span className="font-bold text-fuchsia-600 ">{nick}</motion.span>
                  </Link>
                  sana
                  <button
                    className="text-base transition-all duration-300 text-fuchsia-400 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600"
                    onClick={handleClick}
                  >
                    {attached.title.length > 24 ? attached.title.slice(0, 24) + "..." : attached.title}
                  </button>
                  önerdi.
                </motion.p>
              )}

              <motion.p className="text-sm text-slate-400">{newDate}</motion.p>
            </motion.div>
          </div>
          <div className="flex items-center gap-2">
            <RocketIcon className="w-6 h-6 mr-2 text-slate-200" />
            <button onClick={() => setSettings(!settings)}>
              <DotsVerticalIcon className="w-6 h-6 transition-colors text-slate-400 hover:text-slate-200" />
            </button>
          </div>
        </div>
      </motion.div>
      {settings && (
        <ActionDetailsCard
          haveBorder={false}
          icon1={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all bg-fuchsia-800/20 text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={watchedHandler}
            >
              <CheckIcon className="w-5 h-5 mr-2" />
              {t("notification.watched")}
            </button>
          }
        />
      )}
    </>
  );
}

export default NotificationSuggestionCard;
