import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, Cross1Icon, DotsVerticalIcon, HeartIcon } from "@radix-ui/react-icons";
import { deleteSelectedNotification, getSelectedUserPost } from "../../../firebase/firebaseActions";
import FeedCard from "../FeedCard";
import { DateFormatter } from "../../../utils/formatter";
import ActionDetailsCard from "../ActionDetailsCard";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../../store/notificationSlice";
import NotificationPhoto from "./components/NotificationPhoto";
import { useTranslation } from "react-i18next";

function NotificationLikeCard({ uid, nick, photoURL, date, postId, deleteId }) {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [settings, setSettings] = useState(false);
  const newDate = DateFormatter(date);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getSelectedUserPost(postId).then((res) => setPost(res));
  }, []);
  const handleClick = () => {
    navigate(`/feed/${user.nick}/${postId}`, { state: { uId: user.uid || uid, pId: postId } });
  };

  const deleteHandler = () => {
    deleteSelectedNotification(deleteId).then(() => {
      setSettings(false);
      i18n.language === "en" ? toast.success("Notification deleted successfully") : toast.success("Bildirim silindi");
      dispatch(notificationActions.deleteSelectedNotification(deleteId));
    });
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="flex flex-row items-center justify-between w-full p-4 mb-4 transition-all duration-150 border border-transparent bg-slate-900 rounded-xl hover:border-slate-400">
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
                  liked your
                  <button onClick={handleClick} className="hover:underline text-fuchsia-300">
                    post
                  </button>
                </motion.p>
              ) : (
                <motion.p className="flex gap-1 text-base text-cWhite text-slate-20">
                  <Link
                    to={`/user/${nick}`}
                    className="text-base transition-all duration-300 text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600"
                  >
                    <motion.span className="font-bold text-fuchsia-600 ">{nick}</motion.span>
                  </Link>
                  <button onClick={handleClick} className="hover:underline text-fuchsia-300">
                    gönderinizi
                  </button>
                  beğendi.
                </motion.p>
              )}
              <motion.p className="text-sm text-slate-400">{newDate}</motion.p>
            </motion.div>
          </div>
          <div className="flex items-center gap-2">
            <HeartIcon className="hidden w-6 h-6 mr-2 md:block text-slate-200" />
            <button
              className="items-center justify-center hidden transition-all rounded-full md:flex w-7 h-7 bg-slate-800 hover:bg-fuchsia-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              <ChevronDownIcon className="w-6 h-6 text-slate-200" />
            </button>
            <button onClick={() => setSettings(!settings)}>
              <DotsVerticalIcon className="w-6 h-6 transition-colors text-slate-400 hover:text-slate-200" />
            </button>
          </div>
        </div>
        {isOpen &&
          post &&
          post.map((data, index) => {
            if (data.attachedFilm) {
              return <FeedCard key={index} isAttached={true} data={data} notification={true} index={index} />;
            } else if (data.spoiler) {
              return <FeedCard key={index} isSpoiler={true} data={data} notification={true} index={index} />;
            } else {
              return <FeedCard key={index} isComment={true} data={data} notification={true} index={index} />;
            }
          })}
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
              {t("notification.delete")}
            </button>
          }
        />
      )}
    </>
  );
}

export default NotificationLikeCard;
