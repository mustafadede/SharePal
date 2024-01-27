import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cross1Icon, DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import { DateFormatter } from "../../../utils/formatter";
import ActionDetailsCard from "../ActionDetailsCard";
import { deleteSelectedNotification } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { notificationActions } from "../../../store/notificationSlice";
import NotificationPhoto from "./components/NotificationPhoto";

function NotificationFollowCard({ uid, nick, photoURL, date, deleteId }) {
  const newDate = DateFormatter(date);
  const [settings, setSettings] = useState(false);

  const deleteHandler = () => {
    deleteSelectedNotification(deleteId).then(() => {
      setSettings(false);
      toast.success("Notification deleted successfully");
      dispatch(notificationActions.deleteSelectedNotification(deleteId));
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-row items-center justify-between w-full p-4 mt-4 transition-all duration-150 border border-transparent bg-slate-900 rounded-xl hover:border-slate-400"
      >
        <div className="flex gap-4">
          <NotificationPhoto uid={uid} photoURL={photoURL} />
          <motion.div className="flex flex-col items-start justify-center">
            <motion.p className="flex gap-1 text-base text-cWhite text-slate-20">
              <Link
                to={`/user/${nick}`}
                className="text-base transition-all duration-300 text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600"
              >
                <motion.span className="font-bold text-fuchsia-600 ">{nick}</motion.span>
              </Link>
              started following you.
            </motion.p>
            <motion.p className="text-sm text-slate-400">{newDate}</motion.p>
          </motion.div>
        </div>
        <div className="flex gap-2">
          <PersonIcon className="w-6 h-6 text-slate-200" />
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
              Delete
            </button>
          }
        />
      )}
    </>
  );
}

export default NotificationFollowCard;
