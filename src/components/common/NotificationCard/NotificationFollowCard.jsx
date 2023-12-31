import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cross1Icon, DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import { DateFormatter } from "../../../utils/formatter";
import FeedCardOnlineStatus from "../FeedCardOnlineStatus";
import ActionDetailsCard from "../ActionDetailsCard";
import { deleteSelectedNotification } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";

function NotificationFollowCard({ uid, nick, photoURL, date, deleteId }) {
  const newDate = DateFormatter(date);
  const [settings, setSettings] = useState(false);

  const deleteHandler = () => {
    deleteSelectedNotification(deleteId).then(() => {
      setSettings(false);
      toast.success("Notification deleted successfully");
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-row items-center justify-between w-full p-4 mb-4 transition-all duration-150 border border-transparent bg-slate-900 rounded-xl hover:border-slate-400"
      >
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
              started following you
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
