import { Cross1Icon, DotsVerticalIcon, ListBulletIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { deleteSelectedNotification } from "../../../firebase/firebaseActions";
import { notificationActions } from "../../../store/notificationSlice";
import { toast } from "react-toastify";
import ActionDetailsCard from "../ActionDetailsCard";
import { useDispatch } from "react-redux";

function NotificationListCard({ uid, nick, postId, photoURL, date, deleteId }) {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState(false);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    deleteSelectedNotification(deleteId).then(() => {
      setSettings(false);
      i18n.language === "en" ? toast.success("Notification deleted successfully") : toast.success("Bildirim silindi");
      dispatch(notificationActions.deleteSelectedNotification(deleteId));
    });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-row items-center justify-between w-full p-4 mb-4 transition-all duration-150 border border-transparent h-fit bg-slate-900 rounded-xl hover:border-slate-400"
      >
        <div className="flex gap-4">
          <motion.img
            className="object-cover w-12 h-12 rounded-full lg:w-16 lg:h-16 bg-fuchsia-600"
            src={photoURL}
            loading="lazy"
          ></motion.img>
          <motion.div className="flex flex-col items-start justify-center text-cWhite">
            <motion.p className="inline text-base text-slate-20">
              <Link
                to={`/user/${nick}`}
                className="text-base transition-all duration-300 text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600"
              >
                <motion.span className="font-bold text-fuchsia-600 ">{nick + " "}</motion.span>
              </Link>
              <span>{t("notification.listCreated")}</span>
            </motion.p>
            <motion.p className="text-sm text-slate-400">{date}</motion.p>
          </motion.div>
        </div>
        <div className="flex gap-2">
          <ListBulletIcon className="w-6 h-6 text-slate-200" />
          <button onClick={() => setSettings(!settings)}>
            <DotsVerticalIcon className="w-6 h-6 transition-colors text-slate-400 hover:text-slate-200" />
          </button>
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
              {t("notification.delete")}
            </button>
          }
        />
      )}
    </>
  );
}

export default NotificationListCard;
