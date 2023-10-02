import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PersonIcon } from "@radix-ui/react-icons";
function NotificationFollowCard({ nick, photoURL, date }) {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const hour = new Date(date).getHours();
  const minute = new Date(date).getMinutes();
  const newDate = `${day}/${month}/${year} ${hour}:${minute < 10 ? "0" + minute : minute}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-row items-center justify-between w-full p-4 mb-4 transition-all duration-150 border border-transparent bg-slate-900 rounded-xl hover:border-slate-400"
    >
      <div className="flex gap-4">
        {photoURL && (
          <motion.img className="object-cover w-12 h-12 rounded-full lg:w-16 lg:h-16 bg-fuchsia-600" src={photoURL}></motion.img>
        )}
        <motion.div className="flex flex-col items-start justify-center">
          <motion.p className="flex gap-1 text-base text-cWhite text-slate-20">
            <Link
              to={`/profile/${nick}`}
              className="text-base transition-all duration-300 text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600"
            >
              <motion.span className="font-bold text-fuchsia-600 ">{nick}</motion.span>
            </Link>
            started following you
          </motion.p>
          <motion.p className="text-sm text-slate-400">{newDate}</motion.p>
        </motion.div>
      </div>
      <PersonIcon className="w-6 h-6 text-slate-200" />
    </motion.div>
  );
}

export default NotificationFollowCard;
