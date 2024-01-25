import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDownIcon, Cross1Icon, DotsVerticalIcon, HeartIcon, RocketIcon } from "@radix-ui/react-icons";
import { deleteSelectedNotification, getSelectedUserPost } from "../../../firebase/firebaseActions";
import FeedCard from "../FeedCard";
import { DateFormatter } from "../../../utils/formatter";
import FeedCardOnlineStatus from "../FeedCardOnlineStatus";
import ActionDetailsCard from "../ActionDetailsCard";
import { toast } from "react-toastify";
import useSearchWithYear from "../../../hooks/useSearchWithYear";
import { modalActions } from "../../../store/modalSlice";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../../store/notificationSlice";

function NotificationSuggestionCard({ uid, nick, photoURL, date, postId, deleteId, attached }) {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [settings, setSettings] = useState(false);
  const newDate = DateFormatter(date);
  const dispatch = useDispatch();
  useEffect(() => {
    getSelectedUserPost(localStorage.getItem("user"), postId).then((res) => setPost(res));
  }, []);

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

  const deleteHandler = () => {
    deleteSelectedNotification(deleteId).then(() => {
      setSettings(false);
      toast.success("Notification deleted successfully");
      dispatch(notificationActions.deleteSelectedNotification(deleteId));
    });
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="relative flex flex-row items-center justify-between w-full p-4 mb-4 transition-all duration-150 border border-transparent bg-slate-900 rounded-xl hover:border-slate-400">
          <div className="flex gap-4">
            {!photoURL && (
              <div className="relative w-12 h-12 lg:w-16 lg:h-16">
                <motion.div className="w-12 h-12 rounded-full lg:w-16 lg:h-16 bg-fuchsia-600"></motion.div>
                <FeedCardOnlineStatus username={true} data={uid} />
              </div>
            )}
            {photoURL && (
              <div className="relative w-12 h-12 lg:w-16 lg:h-16">
                <motion.img
                  className="object-cover w-12 h-12 rounded-full lg:w-16 lg:h-16 bg-fuchsia-600"
                  loading="lazy"
                  src={photoURL}
                ></motion.img>
                <FeedCardOnlineStatus username={true} data={uid} />
              </div>
            )}
            <motion.div className="flex flex-col items-start justify-center">
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
              onClick={deleteHandler}
            >
              <Cross1Icon className="w-5 h-5 mr-2" />
              Delete
            </button>
          }
        />
      )}
    </>
  );
}

export default NotificationSuggestionCard;
